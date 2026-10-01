# Junzle — Technical Architecture & Phase 1 Execution Plan

**Prepared By:** Pratik (Lead Developer)  
**Document Type:** Architecture Proposal & Phase 1 Delivery Roadmap  
**Date:** September 2026  
**Target Infrastructure:** Cost-Optimized Launch Setup (Railway, Vercel, MongoDB Atlas, AWS S3)  
**Launch Operating Budget:** < $30 / month

---

## 1. Executive Summary & Infrastructure Strategy

This proposal outlines the technical architecture, data model specifications, and execution roadmap for the launch of **Junzle (Phase 1)**.

### Strategic Objectives
1. **Cost Efficiency:** Maintain platform operating costs under **$30/month** during launch while delivering full functionality across mobile, web, and internal administration.
2. **Strict Separation of Concerns:** Clear modular boundaries between user surfaces, backend APIs, persistent storage, and payment workflows.
3. **Future Scalability:** High-speed development today on managed cloud services with an effortless migration path to enterprise AWS infrastructure (ECS, DocumentDB/RDS, ElastiCache) once user volume and transaction volume justify expansion.

### System Topology

```
                            [ Client / User Layer ]
                                       │
     ┌─────────────────────────────────┼─────────────────────────────────┐
     ▼                                 ▼                                 ▼
[ Surface 1: Expo App ]          [ Surface 2: Web Portal ]        [ Surface 3: Super Admin ]
 (iOS & Android Builds)              (Vercel Hosting)                 (Vercel Hosting)
│                                 │                                 │
└─────────────────────────────────┼─────────────────────────────────┘
                                  │
                                  ▼
                       [ Node.js + Express API ]
                           (Railway Hosting)
                                  │
┌──────────────────────┬──────────┴────────────┬──────────────────────┐
▼                      ▼                       ▼                      ▼
[ MongoDB Atlas ]      [ AWS S3 + CloudFront ] [ Stripe Connect ]     [ Third-Party Services ]
(Managed Database)     (Media & Docs)          (Payments & Payouts)   • Firebase FCM (Push)
                                                                      • Twilio (SMS Blasts)
                                                                      • AWS SES (Email)
                                                                      • OpenAI (Story Gen)
```

---

## 2. Component Breakdown & Stack Rationale

### Surface 1: Mobile App (React Native / Expo)
* **Platforms:** Native iOS & Android builds from a unified codebase.
* **UI/UX Implementation:** Built strictly to match provided Figma designs.
* **Build Pipeline:** Expo EAS for streamlined staging and production App Store / Google Play submissions.

### Surface 2: Web Portal (React.js / Vercel)
* **Scope:** Desktop experience for coaches, club managers, and parents; hosts dynamic public team microsites (`junzle.com/[slug]`).
* **Hosting:** Vercel (Global Edge Network) for sub-second page loads and zero-downtime continuous deployment.

### Surface 3: Super Admin Panel (React.js / Vercel)
* **Scope:** Dedicated internal console for platform operations, financial auditing, fee overrides, and customer support.
* **Security Isolation:** Deployed independently from the main web portal with strict IP restrictions and decoupled authentication to guarantee administrative security.

### Backend API (Node.js & Express / Railway)
* **Architecture:** Stateless RESTful service powering all three client surfaces.
* **Hosting:** Railway managed container hosting. Provides predictable usage-based pricing ($5–$10/month at launch), automatic SSL, isolated environment variable management, and continuous deployment from Git.

### Database (MongoDB Atlas)
* **Data Layer:** Cloud-managed MongoDB Atlas. Flexible document structure natively supports variable team sizes, multi-sport roster attributes, nested RSVPs, and dynamic custom registration forms without complex relational migrations.
* **Tier:** M0 (Free Tier) during launch/testing, scaling seamlessly to M2/M5 production tiers as usage increases.

### Media Storage & CDN (AWS S3 + CloudFront)
* **Assets:** Team logos, player photos, signed liability waivers, and identity verification documents.
* **Performance & Cost:** Direct pre-signed uploads from clients to S3 minimize server bandwidth load; CloudFront CDN provides low-latency global asset delivery at minimal cost.

### Integrated Third-Party Services
* **Stripe Connect:** PCI-compliant payment orchestration. Automatically manages team merchant onboarding, splits registration fees, deducts the Junzle platform fee, and routes net payouts directly to team bank accounts.
* **Firebase Cloud Messaging (FCM):** High-reliability push notifications across iOS and Android for schedule changes, RSVP reminders, and chat alerts.
* **Twilio:** Dedicated channel for urgent coach-to-parent broadcast SMS alerts.
* **AWS SES (Simple Email Service):** Low-cost, high-deliverability transactional emails (account verification, receipts, payment notices).
* **OpenAI API (`gpt-4o-mini`):** High-speed, cost-effective AI integration powering the automated team fundraiser campaign generator.

---

## 3. Database Schema Specifications (MongoDB / Mongoose)

The schema is built to support strict Role-Based Access Control (RBAC) across all 7 user roles (`SUPER_ADMIN`, `LEAGUE_ADMIN`, `CLUB_OWNER`, `COACH`, `PARENT`, `PLAYER`, `SPECTATOR`) with multi-tenant hierarchy readiness ($\text{Teams} \rightarrow \text{Clubs} \rightarrow \text{Leagues}$).

All financial figures are stored as integers in **cents** ($1.00 = 100$) to eliminate floating-point calculation errors.

```javascript
const { Schema, model } = require('mongoose');

// ============================================================================
// 1. USER SCHEMA
// Global identity, role assignments, and team/organization memberships
// ============================================================================
const UserSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true, 
    lowercase: true, 
    trim: true 
  },
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true, trim: true },
  phoneNumber: { type: String, index: true },
  avatarUrl: { type: String },
  
  // Platform default role
  globalRole: { 
    type: String, 
    enum: ['SUPER_ADMIN', 'LEAGUE_ADMIN', 'CLUB_OWNER', 'COACH', 'PARENT', 'PLAYER', 'SPECTATOR'],
    default: 'PARENT'
  },
  
  // Context-specific memberships (e.g., Coach on Team A, Parent on Team B)
  memberships: [{
    entityType: { type: String, enum: ['Team', 'Organization', 'League'], required: true },
    entityId: { type: Schema.Types.ObjectId, refPath: 'memberships.entityType', required: true },
    role: { 
      type: String, 
      enum: ['ADMIN', 'COACH', 'ASSISTANT_COACH', 'PARENT', 'PLAYER'],
      required: true 
    }
  }],
  
  status: { type: String, enum: ['ACTIVE', 'SUSPENDED', 'DELETED'], default: 'ACTIVE' },
  stripeCustomerId: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });


// ============================================================================
// 2. TEAM SCHEMA
// Team profiles, brand assets, privacy rules, and Stripe merchant linkage
// ============================================================================
const TeamSchema = new Schema({
  name: { type: String, required: true, trim: true, index: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true,
    index: true 
  }, // Serves junzle.com/[slug]
  sport: { type: String, required: true },
  ageGroup: { type: String, required: true }, // e.g. "U12", "Varsity", "Grade 7-8"
  city: { type: String, required: true },
  state: { type: String, required: true },
  logoUrl: { type: String },
  
  brandColors: {
    primary: { type: String, default: '#000000' },
    secondary: { type: String, default: '#FFFFFF' }
  },
  websiteUrl: { type: String },
  privacy: { type: String, enum: ['PUBLIC', 'INVITE_ONLY'], default: 'PUBLIC' },
  inviteCode: { type: String, unique: true, sparse: true },
  qrCodeUrl: { type: String },
  
  // Hierarchical organization support (Phase 3 multi-tenancy)
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', default: null },
  leagueId: { type: Schema.Types.ObjectId, ref: 'League', default: null },
  
  // Stripe Connect merchant status
  stripeAccountId: { type: String },
  stripeOnboardingComplete: { type: Boolean, default: false },
  
  createdById: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });


// ============================================================================
// 3. PLAYER ROSTER SCHEMA
// Athlete profiles, guardian associations, medical & coach private notes
// ============================================================================
const PlayerSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  photoUrl: { type: String },
  position: { type: String },
  jerseyNumber: { type: Number },
  dateOfBirth: { type: Date, required: true },
  
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
  parentIds: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
  userAccountId: { type: Schema.Types.ObjectId, ref: 'User', default: null }, // Optional direct account for players 13+
  
  emergencyContact: {
    name: { type: String },
    phone: { type: String },
    relationship: { type: String }
  },
  
  // Restricted access: visible strictly to coaches and administrators
  privateCoachNotes: { type: String },
  sportsIdCode: { type: String, unique: true, sparse: true }
}, { timestamps: true });


// ============================================================================
// 4. EVENT & SCHEDULE SCHEMA
// Games, practices, and tournaments with RSVP logging & attendance tracking
// ============================================================================
const EventSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
  title: { type: String, required: true },
  eventType: { 
    type: String, 
    enum: ['PRACTICE', 'GAME', 'EVENT'], 
    required: true 
  },
  startTime: { type: Date, required: true }, // Stored in UTC
  endTime: { type: Date, required: true },
  
  location: {
    name: { type: String, required: true },
    address: { type: String },
    mapUrl: { type: String }
  },
  notes: { type: String },
  
  rsvps: [{
    playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { 
      type: String, 
      enum: ['ATTENDING', 'DECLINED', 'MAYBE', 'PENDING'], 
      default: 'PENDING' 
    },
    updatedAt: { type: Date, default: Date.now }
  }],
  
  attendanceRecords: [{
    playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
    attended: { type: Boolean, default: false },
    markedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });


// ============================================================================
// 5. REGISTRATION FORM SCHEMA
// Dynamic builder for season signups, fees, custom fields, and waivers
// ============================================================================
const RegistrationFormSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  feeAmount: { type: Number, required: true, default: 0 }, // In cents ($100 = 10000)
  isPublished: { type: Boolean, default: false },
  
  customFields: [{
    fieldLabel: { type: String, required: true },
    fieldType: { 
      type: String, 
      enum: ['TEXT', 'DROPDOWN', 'FILE', 'CHECKBOX'], 
      required: true 
    },
    options: [{ type: String }],
    isRequired: { type: Boolean, default: false }
  }],
  
  waiverText: { type: String },
  requireESignature: { type: Boolean, default: false }
}, { timestamps: true });


// ============================================================================
// 6. FUNDRAISING CAMPAIGN SCHEMA
// Public team fundraising pages with target goals and automated copy
// ============================================================================
const CampaignSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
  title: { type: String, required: true },
  story: { type: String, required: true },
  goalAmount: { type: Number, required: true }, // In cents
  currentAmount: { type: Number, default: 0 },   // In cents
  photoUrl: { type: String },
  donorCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


// ============================================================================
// 7. TRANSACTION & PAYMENT RECORD SCHEMA
// Financial ledger recording platform fees, payouts, and Stripe references
// ============================================================================
const PaymentSchema = new Schema({
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true, index: true },
  payerUserId: { type: Schema.Types.ObjectId, ref: 'User' },
  payerEmail: { type: String, required: true },
  paymentType: { 
    type: String, 
    enum: ['REGISTRATION', 'FUNDRAISER', 'STORE', 'RAFFLE'], 
    required: true 
  },
  relatedEntityId: { type: Schema.Types.ObjectId },
  
  totalAmount: { type: Number, required: true },       // In cents
  platformFeeAmount: { type: Number, required: true }, // Junzle platform revenue
  netPayoutAmount: { type: Number, required: true },   // Direct payout to team merchant
  
  stripePaymentIntentId: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['SUCCEEDED', 'PENDING', 'FAILED', 'REFUNDED'], 
    default: 'PENDING' 
  }
}, { timestamps: true });


// ============================================================================
// 8. SUPER ADMIN CONFIGURATION SCHEMA
// Global platform revenue settings and individual team fee overrides
// ============================================================================
const GlobalConfigSchema = new Schema({
  platformFeePercentage: { type: Number, default: 3.5 }, // Default global fee (3.5%)
  customOverrides: [{
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    feePercentage: { type: Number }
  }]
}, { timestamps: true });

module.exports = {
  User: model('User', UserSchema),
  Team: model('Team', TeamSchema),
  Player: model('Player', PlayerSchema),
  Event: model('Event', EventSchema),
  RegistrationForm: model('RegistrationForm', RegistrationFormSchema),
  Campaign: model('Campaign', CampaignSchema),
  Payment: model('Payment', PaymentSchema),
  GlobalConfig: model('GlobalConfig', GlobalConfigSchema)
};
```

---

## 4. Phase 1 Execution Plan (13-Step Delivery Roadmap)

The build is sequenced into 5 distinct milestones to ensure architectural integrity, robust security, and incremental testing before each layer goes live:

```
[ Milestone 1: Security & Architecture ] ──► [ Milestone 2: Team & Roster Engine ] ──► [ Milestone 3: Scheduling & Comms ]
                                                                                                  │
[ Milestone 5: Admin Console & Launch ]  ◄── [ Milestone 4: Monetization & Payments ] ◄──────────┘
```

### Milestone 1: Core Architecture & Access Control
* **Step 1 — Backend API & Database Provisioning:**  
  Set up Railway container hosting, MongoDB Atlas cluster, and project repository structure. Configure environment secrets, error-handling middleware, and core API routing patterns.
* **Step 2 — Authentication & RBAC Middleware:**  
  Implement JWT authentication with secure password hashing. Build reusable Express authorization middleware enforcing strict permission boundaries across all 7 user roles prior to UI integration.

### Milestone 2: Onboarding & Team Lifecycle
* **Step 3 — App Entry & Onboarding Flows:**  
  Implement Path A (Create Team) for coaches/managers and Path B (Find Team) for parents/players. Build invite link generation, join request approval queues, and team QR code generation.
* **Step 4 — Team Profile & Public Landing Pages:**  
  Team settings interface (brand colors, logos, bio) paired with automated, responsive public team pages served at `junzle.com/[slug]`.
* **Step 5 — Roster Management:**  
  Athlete profiles, jersey numbers, emergency contacts, parent-child account links, and coach-only private notes.

### Milestone 3: Scheduling, Calendar & Communications
* **Step 6 — Schedule & Attendance Engine:**  
  Game and practice scheduling with calendar views, automated RSVP tracking, and simple one-tap coach attendance recording.
* **Step 7 — Communication Hub:**  
  Cross-platform push notifications via Firebase Cloud Messaging (FCM), urgent broadcast SMS via Twilio, and team announcement bulletin boards.

### Milestone 4: Registration, Payments & Fundraising
* **Step 8 — Registration Form Builder:**  
  Custom field builder supporting dropdowns, file uploads, checkboxes, registration fee calculation, liability waiver display, and electronic signature capture.
* **Step 9 — Payments & Stripe Connect Integration:**  
  Merchant onboarding for teams via Stripe Connect Express. End-to-end checkout for parents, automated Junzle platform fee deduction, direct payouts, and automated PDF email receipts via AWS SES.
* **Step 10 — Team Fundraising Campaigns:**  
  Public donation campaign pages with dynamic progress meters. Direct integration with `gpt-4o-mini` to generate compelling fundraiser stories in seconds.
* **Step 11 — Custom App & Website Upsell Engine:**  
  In-app lead capture form for teams and clubs interested in custom white-label mobile apps or standalone websites, triggering automated notifications to platform sales.

### Milestone 5: Profile Management, Administration & Launch Readiness
* **Step 12 — User Profile & Settings:**  
  User profile management, multi-team switching, notification preferences, and account security controls.
* **Step 13 — Super Admin Panel:**  
  Isolated operational web console delivering platform analytics (total GMV, active teams, users), global and custom fee management, account moderation, and administrative user impersonation for support.

---

## 5. Launch Infrastructure Cost Analysis

Below is the verified monthly operational cost projection for the launch phase:

| Component | Service Provider | Expected Launch Cost | Notes |
| :--- | :--- | :--- | :--- |
| **Backend API** | Railway | ~$5 – $10 / month | Usage-based pricing; covers Node.js container with zero idle waste |
| **Web & Admin Portals** | Vercel | $0 / month | Free/Hobby tier easily handles static frontend builds and CDN edge caching |
| **Primary Database** | MongoDB Atlas | $0 / month | M0 Free Tier (512 MB) covers launch testing; $9/mo M2 tier when ready |
| **Media & File Storage** | AWS S3 + CloudFront | ~$1 – $3 / month | Pay-per-use object storage and bandwidth for logos, waivers, and photos |
| **Payment Processing** | Stripe Connect | $0 fixed cost | Standard transaction fees deducted directly per successful payment |
| **Mobile Push Alerts** | Firebase (FCM) | $0 / month | Unlimited mobile push notifications included in free tier |
| **Transactional Email** | AWS SES | < $1 / month | $0.10 per 1,000 sent emails |
| **Broadcast SMS** | Twilio | ~$5 credit | Pay-as-you-go ($0.0079/SMS), reserved specifically for urgent alerts |
| **AI Story Generation** | OpenAI (`gpt-4o-mini`)| < $1 / month | Ultra-low token pricing for occasional campaign generation |
| **Total Estimated Cost** | | **~$15 – $25 / month** | **Firmly under the $30/month operating budget** |

---

## 6. Project Sign-Off & Immediate Next Steps

Upon your approval of this technical architecture and execution roadmap, development proceeds in the following order:

1. **Repository Setup:** Scaffold the project structure (monorepo architecture containing `apps/mobile`, `apps/web`, `apps/admin`, and `services/api`).
2. **Cloud & Environment Provisioning:** Provision development environments across Railway, MongoDB Atlas, AWS S3, and Stripe Connect test mode.
3. **Milestone 1 Commencement:** Begin implementation of **Step 1 (Express API and Database Architecture)** and **Step 2 (JWT & RBAC Security Middleware)**.

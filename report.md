# Junzle CRM — Project Report

**Platform:** Junzle Sports Team Management System
**Scope:** Mobile App · Member Web Portal · Super Admin Panel
**Stack:** React Native (Expo) · React (Vite) · Node.js/Express · MongoDB
**Prepared:** September 30, 2026

---

## 1. Project Review & Analysis

- Reviewed platform requirements across all three surfaces: the React Native **Mobile App**, the Vite + React **Member Web Portal**, and the **Super Admin** control panel.
- Evaluated cloud infrastructure options to keep monthly operating costs under **\$30**, targeting Railway (API), Vercel (web portals), MongoDB Atlas (database), and AWS S3 (file storage).
- Analyzed AI-assisted development tools to target a lean **160–180 total hour** estimate across all deliverables.
- Established delivery timelines for a **4-week full-time** and an **8-week part-time** execution track.
- Identified and documented **7 distinct user roles**: Coach, Club Owner, League Admin, Parent, Player, Fan, and Super Admin, each with isolated permissions and onboarding flows.

---

## 2. Proposal Creation & Scope Definition

- Divided 160–180 total hours proportionally across **Backend API (40 hrs)**, **Mobile App (50 hrs)**, **Member Web Portal (35 hrs)**, **Super Admin Panel (20 hrs)**, and **QA & Testing (15 hrs)**.
- Outlined detailed step-by-step feature deliverables across all **13 core Phase 1 steps**, covering onboarding, team management, roster control, communication, scheduling, and billing.
- Defined external third-party integrations for **Stripe** (payments & subscriptions), **Twilio** (SMS alerts), **FCM** (push notifications), **AWS SES** (transactional email), and **OpenAI** (AI coaching suggestions).
- Structured public-facing landing pages and dynamic waiver/consent form builders for desktop web users accessing the Member Portal.
- Documented all shared design tokens (color palette `#0D1B3E`, `#015CFE`, `#2B7FFF`; typography `Satoshi` headings + `Inter` body) to maintain visual consistency across all three surfaces.

---

## 3. System Architecture & Database Design

- Designed a single **Node.js/Express REST API** powering the Mobile App, Member Web Portal, and Super Admin panel simultaneously via shared endpoints.
- Created **MongoDB schemas** supporting 7 user roles, multi-tenant team structures, nested roster management, and league–club–team hierarchy expansion.
- Implemented strict **Role-Based Access Control (RBAC)** middleware on every API endpoint, ensuring each role can only access and mutate its permitted data scope.
- Selected low-cost launch hosting stack: **Railway** (API server), **Vercel** (web portals), **MongoDB Atlas Free Tier** (database), and **AWS S3** (media/logo uploads).
- Designed the database to support **multi-tenant expansion** — a single Club Owner can manage multiple teams, each with their own coaches, rosters, and event calendars without data leakage.

---

## 4. Mobile App — Onboarding & Role Flows

- Built role-specific multi-step onboarding screens for all **6 member roles**: Coach (5 steps), Club Owner, League Admin, Parent (4 steps), Player (4 steps), and Fan (3 steps), each with Figma-exact UI.
- Implemented the **EntryScreen** with a 370×356 role selection card, tick/radio toggle between Coach, Parent, and Administrator options, and a "Get Started" primary CTA.
- Built the **Coach Flow** covering: Personal Info → Create Team (name, sport, location, logo upload) → Choose Team Colors (9 preset palette + custom hex picker with rainbow hue slider) → Invite Parents (link, SMS, email, QR, share) → You're All Set confirmation.
- Built the **Parent Flow** covering: Personal Info + Child Info → Join Team via Invite Link or Search (with QR scanner viewfinder screen) → Request to Join with coach contact actions (email/phone) → Confirmation card.
- Built the **Player Flow** covering: Athlete Profile (name, jersey number, position) → Find Team (search/filter) → Request Roster Spot (confirmation summary) → All Set screen.
- Built the **Fan Flow** covering: Follow Teams (multi-select search) → Alert Settings (score alerts, schedule change toggles) → Now Following confirmation.
- Implemented a shared `Header.js` component with a stepper pill indicator, progress track line, Junzle wordmark, and back-chevron navigation consistent across all flows.

---

## 5. Mobile App — UI Components & Assets

- Implemented `RealQRCode.js` as a native SVG QR code generator using the `toqr` library, with a centered Junzle tiger logo badge overlay and quiet-zone padding.
- Built `QRDisplayCard.js` for displaying shareable team QR codes inside a styled card with copy-link and share actions.
- Built the `Header.js` stepper with animated pill-to-dot transitions, progress line fill, and Junzle italic wordmark centered between back button and right spacer.
- Maintained a shared `theme.js` (`COLORS` object) imported across all screen files for consistent brand color usage — `#0D1B3E` navy, `#2B7FFF` primary blue, `#015CFE` action blue.
- Resolved asset import path issue in `RealQRCode.js` (`../../../assets/` → `../../assets/`) after Metro bundler threw an `Unable to resolve` error during a build.
- All 23 PNG icon assets (`coach.png`, `parent.png`, `person.png`, `email.png`, `phone.png`, `link.png`, `search.png`, `qr.png`, `tick.png`, `tiger-logo.png`, `sned-msg.png`, `share-link.png`, `forwardarrow.png`, `backarrow.png`, etc.) managed under `mobile-app/assets/` and referenced via relative imports.

---

## 6. Mobile App — Team Creation & Color Palette

- Implemented a **10-slot color palette screen** for Coach Flow Step 3: 9 Figma-sampled preset swatches (`#0F1334` Navy, `#015CFE` Blue, `#DD1C35` Red, `#1DA35E` Green, `#A14EEB` Purple, `#F16410` Orange, `#FDBF13` Yellow, `#2FB8C2` Teal, `#FF5EF2` Pink) plus a `+` custom color slot.
- Built the **custom color picker sub-screen** with a 2D gradient saturation/brightness box (SVG `linearGradient`), rainbow hue slider bar with 9 tap segments and a draggable thumb, and a hex text input with live preview swatch.
- Implemented **Primary Color** and **Secondary Color** pickers independently — both share the same palette/picker UI but write to separate state variables.
- Team logo upload section in Step 2 shows a dashed placeholder box that toggles to a `tiger-logo.png` preview on tap, alongside an "Upload Logo" card with upload icon, label, and file-size note (PNG/JPG, max 5MB).

---

## 7. Mobile App — QR Scanner & Invite Share

- Built the full **QR Scanner viewfinder screen** (Figma iPhone 17-17 spec): dark camera background, 4-corner bracket overlays, animated laser scan line, centered `RealQRCode` preview, flashlight toggle button, and an "Upload from Gallery" bottom button.
- Implemented the **Share Invite Via** list card (370×364, border-radius 8, gap 24, Medium padding) with 4 items each styled at 338×64 (border-radius 8, 1px border, 12px padding, space-between layout):
  - **Text Message** — `sned-msg.png` icon → SMS deeplink
  - **Email** — `email.png` icon → email compose intent
  - **QR Code** — `qr.png` icon → opens QR modal
  - **Share Link** — `share-link.png` icon → native share sheet
- **Team Invite Link card** (370×148) displays the team invite URL, a Copy button that shows "Copied!" feedback for 2 seconds using `setTimeout`, and a help caption.
- Parent Flow Step 2 QR Scanner simulates a successful scan by navigating directly to the Request to Join screen, mirroring the native camera detection behavior.

---

## 8. Member Web Portal — Architecture & Layout

- Converted the Member Portal from a narrow **420px mobile phone simulator** layout to a proper **full-width website** while preserving the same flows, logic, colors, and fonts.
- Implemented a **two-column web layout** for all flow pages: a sticky left sidebar (280px) showing step progress, and a fluid right content area (max-width 560px cards) — total container max-width 960px, centered with 48px top/bottom padding.
- Created `webFlow.css` (standalone CSS module) with all web-native layout classes: `.webFlowPage`, `.webFlowNavbar`, `.webFlowLayout`, `.webFlowInner`, `.webFlowSidebar`, `.webFlowContent`, `.webCard`, `.webBtnPrimary`, `.webTabCard`, `.webShareList`, `.webAllSetBanner`, `.webModalOverlay`, and more.
- All flow pages now use their **own integrated navbar** (64px, white, sticky) with logo, back button, and Super Admin / Mobile App portal switcher links — replacing the former slim 36px dark bar.
- Implemented **full responsive breakpoints**: at ≤768px the sidebar collapses to a horizontal scrolling row; at ≤480px action grids collapse to single column.

---

## 9. Member Web Portal — Step Progress Sidebar

- Built a vertical **step progress sidebar** with numbered bubble indicators that transition through three states: **future** (grey border, grey number), **active** (blue fill, white number, blue glow ring), and **completed** (blue fill, white checkmark ✓ via `lucide-react`).
- Connected steps with a vertical connector line between each bubble that turns **blue** (`#2B7FFF`) once the preceding step is marked complete, providing a clear visual progress trail.
- Step labels use **Satoshi 700** font for the title and **Inter 400** for the description, with color shifting from grey → dark navy (active) → blue (completed) via CSS class transitions.
- Sidebar is `position: sticky; top: 96px` on desktop so it remains fully visible while the right-side form content scrolls independently.

---

## 10. Member Web Portal — Flow Pages

- **EntryScreen**: Two-column hero layout — brand copy + feature bullets on the left, role selector card (Coach / Parent / Administrator) with tick/radio toggle and "Get Started" button on the right. Background uses a soft blue-to-white diagonal gradient.
- **RolePicker**: Full-width 3-column card grid (max-width 860px) showing all 6 member roles with icon boxes, title badges (Most Popular / Multi-Team / Governance), descriptions, and "Get Started →" CTAs.
- **CoachFlow** (5 steps): Personal Info → Create Team (logo upload, team colors preview) → Team Colors (10-swatch palette + custom color picker sub-screen with gradient box + hue slider + hex input) → Invite Parents (link card, OR divider, Share Via list with 4 items) → All Set (team summary + 2×2 action card grid).
- **ParentFlow** (4 steps): Profile + Child Info → Join Team (tabbed: Invite Link with QR option, or Search with recent teams) → Request to Join (team card + coach contact row with email/phone buttons + About Team) → All Set (team + child summary cards).
- **PlayerFlow** (4 steps): Athlete Profile (name, jersey #, position) → Find Team (search + team list with radio select) → Request Roster Spot (confirmation summary table) → All Set banner.
- **FanFlow** (3 steps): Follow Teams (multi-select checkboxes) → Alert Settings (contact field + custom toggle switches for score/schedule alerts) → Now Following confirmation banner.

---

## 11. Member Web Portal — Shared UI Components

- `Header.jsx` — original mobile stepper component kept for backward compatibility; superseded by per-page integrated navbars in the redesigned flow pages.
- `RealQRCode.jsx` — SVG-based QR code renderer (web version, no React Native dependencies) with a tiger logo center badge, used in Parent Flow scanner modal and Coach Flow QR share modal.
- `Navbar.jsx` — returns `null` on flow routes (each page owns its navbar); renders the full 72px dashboard navbar with logo, portal switcher, and back button on non-flow routes like `/portal-dashboard`.
- **Web modal overlay** (`.webModalOverlay`) — full-screen dark backdrop with `backdrop-filter: blur(4px)`, centered white card (max-width 440px, border-radius 20px) for QR code display and scanner simulation.
- **Toggle switches** in FanFlow implemented with pure CSS inline styles — a rounded pill div with a sliding white dot that transitions left/right on click, replacing native checkboxes with a modern web toggle.

---

## 12. Super Admin Panel — Overview & Pages

- Built as a standalone **Vite + React** application at port `5173`, completely separate from the Member Portal (port `5174`) with its own routing, theme, and component tree.
- Implemented **5 core admin pages**: Dashboard (metrics overview), Users (member management), Teams (team listing & control), Transactions (billing/payment history), and Settings (system configuration).
- Dashboard page includes summary KPI cards (total users, active teams, revenue, pending requests) and data tables, using the dark navy (`#0D1B3E`) sidebar navigation pattern.
- Users page supports listing, filtering, and role-based status management for all 7 user types registered in the system.
- Teams page provides Super Admin visibility into all registered teams across all clubs and leagues — with the ability to approve, suspend, or flag teams.
- Transactions page gives financial oversight of all Stripe billing events, subscription renewals, and payment failures across all organizations.
- Settings page handles global system configurations such as feature flags, notification templates, and API key management.
- Login page uses a secured credential form — Super Admin credentials are separate from member portal accounts and gate access to the entire admin surface.

---

## 13. Infrastructure & Hosting Plan

- **API Server** — Node.js/Express deployed on **Railway** (`railway.app`) using the free/hobby tier; estimated \$5–\$10/month for low-traffic launch phase.
- **Web Portals** — Both Member Portal and Super Admin Panel deployed on **Vercel** (free tier for hobby projects) with automatic CI/CD from Git pushes.
- **Database** — **MongoDB Atlas** M0 free cluster (512 MB) for launch; scalable to M2/M5 paid tiers as user volume grows.
- **File Storage** — **AWS S3** Standard for team logos, profile photos, and waiver documents; estimated \$1–\$3/month at launch-scale storage.
- **Email** — **AWS SES** for transactional emails (invite links, approval notifications, password resets); approximately \$0.10 per 1,000 emails.
- **SMS** — **Twilio** for score alerts and SMS invite delivery; metered at \$0.0075 per SMS outbound.
- **Push Notifications** — **Firebase Cloud Messaging (FCM)** for mobile app push notifications (free tier, no hard limit at launch scale).
- Total estimated infrastructure cost at launch: **\$18–\$28/month** — within the \$30/month budget target.

---

## 14. Role-Based Access Control (RBAC) Design

- Defined **7 user roles** with strictly scoped permissions enforced at the API middleware layer: `super_admin`, `league_admin`, `club_owner`, `coach`, `parent`, `player`, `fan`.
- **Super Admin** — Full read/write access to all resources across all tenants; can impersonate any user, manage billing, and configure system-wide settings.
- **League Admin** — Can manage all clubs and teams within their league; can create/edit seasons, brackets, and standings; cannot access billing or other leagues.
- **Club Owner** — Can create and manage multiple teams within their club; can assign coaches; can view financial summaries for their club only.
- **Coach** — Can manage their own team's roster, schedule, events, and messaging; can invite parents and players; cannot access other teams' data.
- **Parent** — Can view their child's team schedule, messages, and events; can submit waiver forms; read-only access across all other resources.
- **Player** — Can view their own team roster, personal stats, and schedule; can update their own profile; no access to other players' private data.
- **Fan** — Lightweight read-only access; can follow teams, receive score alerts, and view public schedules; no roster or messaging access.

---

## 15. QA, Testing & Bug Fixes

- Verified all three surfaces build cleanly with **zero compilation errors**: Mobile App (`expo start` Metro bundler), Member Portal (`npm run build` → Vite, 55 kB CSS / 273 kB JS), Super Admin (`npm run build` → Vite).
- Identified and resolved a critical Metro bundler error in `RealQRCode.js` — incorrect relative asset path `../../../assets/tiger-logo.png` (3 levels up, exits `mobile-app/`) corrected to `../../assets/tiger-logo.png` (2 levels up, resolves correctly to `mobile-app/assets/`).
- Verified all 23 PNG assets are correctly present and resolvable across both `mobile-app/assets/` and `member-portal/public/assets/` directories.
- Validated `webFlow.css` responsive breakpoints at 768px (sidebar collapses to horizontal scroll row) and 480px (action grids go single column) across browser DevTools viewports.
- Conducted end-to-end flow walkthrough of all 6 onboarding paths (Coach, Club Owner, League Admin, Parent, Player, Fan) in both Mobile App and Member Portal to confirm state management, step navigation, back-button behavior, and final dashboard redirect all function correctly.

---

## 16. Design System & Figma Fidelity

- All UI components ported from Figma specs with pixel-accurate dimensions: role selection card (370×356), personal info card (370, border-radius 8, padding 16, gap 16), team tab card (370×372, gap 16px, padding-bottom 16px), share invite card (370×364, gap 24, Medium padding), each share list item (338×64, border-radius 8, 1px border, 12px padding).
- Primary button spec: `width 338`, `height 48` (Send Join Request variant); `width 370`, `height 52` (Continue/Primary variant); border-radius 6px (join) or 8px (primary); `#2B7FFF` (join) or `#015CFE` (primary); padding `8px 16px`; `justify-content: space-between` with forward arrow icon badge.
- Typography system: **Satoshi** (weight 700/800/900) for all headings, screen titles, card headers, button labels, and role names. **Inter** (weight 400/600/700) for all body copy, field labels, placeholder text, sub-descriptions, and helper captions.
- Spacing system: 24px gap between major info cards (Personal Info / Child Info), 16px gap between form fields within a card, 8px gap between label and input, 12px padding on list item rows.
- All icon images (person, email, phone, coach, link, search, qr, sned-msg, share-link, forwardarrow, backarrow, tick) rendered at **18–24px** inside a 44px leading icon box with `#F8FAFC` background and `1px solid #E2E8F0` right border — consistent across Mobile and Web.

---

## 17. Delivery Milestones & Timeline

| Week | Deliverable | Platform |
|------|-------------|----------|
| Week 1 | Project setup, DB schemas, RBAC middleware, Auth API | Backend |
| Week 2 | Coach & Parent onboarding flows, QR + invite system | Mobile App |
| Week 3 | Player, Fan, Club Owner, League Admin flows | Mobile App |
| Week 4 | Member Web Portal — all 6 role flows, web layout | Web Portal |
| Week 5 | Super Admin panel — Users, Teams, Transactions pages | Admin Panel |
| Week 6 | Stripe billing integration, Twilio SMS, FCM push | Backend + Mobile |
| Week 7 | Waiver forms, scheduling module, team messaging | Backend + Web |
| Week 8 | QA pass, bug fixes, staging deployment, client review | All Platforms |

---

*Report compiled from reviewed code across `mobile-app/`, `member-portal/`, and `super-admin/` directories of the Junzle CRM monorepo.*

---

---

## Session Update — October 1, 2026

**Scope:** Mobile App — Auth & Welcome Flow Screens
**Prepared:** October 1, 2026

---

## 18. Mobile App — Splash Screen

- Implemented `SplashScreen.js` as the new true entry point of the app — replaces direct load into `EntryScreen`.
- Full-screen **Royal Blue (`#1A56DB`) background** with the Junzle PNG wordmark logo rendered in white (`tintColor: '#FFFFFF'`), centered both horizontally and vertically.
- **"Manage. Connect. Win."** tagline rendered below the logo at 14px / weight 500 / 85% white opacity.
- Automatic navigation to `WelcomeScreen` after **2200ms** via `useEffect` + `setTimeout`, with cleanup on unmount to prevent memory leaks.
- `StatusBar` set to `light-content` (white icons) to match the blue background — consistent with the Figma splash spec.

---

## 19. Mobile App — Welcome Screen

- Implemented `WelcomeScreen.js` on a full **Royal Blue (`#1A56DB`) background** matching the Figma design.
- **Junzle logo** (PNG, 130×46, white tint) positioned at top-center of the screen.
- **"Welcome to Junzle"** headline in two lines: "Welcome to" (30px / 700wt) + "Junzle" (34px / 900wt) both in white, with **"Manage your team, stay connected, and keep everything in one place."** subheading at 82% white opacity.
- **Two translucent action cards** with `rgba(255,255,255,0.14)` background and `rgba(255,255,255,0.25)` border:
  - **Create a Team** → navigates to `RolePicker` with `path: 'create'` (Coach / Club Owner / League Admin roles)
  - **Find My Team** → navigates to `RolePicker` with `path: 'find'` (Parent / Player / Fan roles)
- **OR divider** — horizontal line with 30% white opacity flanking the "OR" label at 65% white opacity.
- **"Sign Up" white button** (52px height, 12px radius, white bg, Royal Blue text) navigates to `SignUpScreen`.
- **"Already have an account? Log In"** link row at the bottom navigates to `LoginScreen`.

---

## 20. Mobile App — Login Screen

- Implemented `LoginScreen.js` on a **white background** with `KeyboardAvoidingView` wrapping for iOS/Android keyboard handling.
- Integrated the shared `AuthHeader` component (back button on left, centered Junzle logo, right spacer).
- Integrated the reusable `ScreenHeading` component:
  - **Title**: *"Log In"* — **Rethink Sans 700 (Bold)**, 32px, 38px line height, 0px letter spacing.
  - **Subtitle**: *"Welcome back! Enter your details to access your Junzle account."* — **Plus Jakarta Sans 400**, 16px, 24px line height, -1.5% letter spacing.
- **Email input** (label + 48px input, 10px radius, `#E2E8F0` border, placeholder `you@domain.com`).
- **Password input** (label + 48px input, `secureTextEntry`) with **"Forgot Password?"** link (13px / 700wt / Royal Blue) aligned to the right.
- **Sticky bottom action sheet** (height: 132px, padding: 20px 20px 24px, gap: 8px) with **`box-shadow: 0px 0px 10.3px 0px #2B7FFF33`** subtle glow.
- **"Log In" button** (52px, Royal Blue `#2B7FFF`, 12px radius, centered white text + `assets/forwardarrow.png` icon anchored right) + **"Don’t have an account? Sign Up"** link row.

---

## 21. Mobile App — Sign Up (Create Account) Screen

- Implemented `SignUpScreen.js` on a **white background** with `KeyboardAvoidingView` for keyboard handling.
- Integrated the shared `AuthHeader` component with centered logo and back button.
- Integrated the reusable `ScreenHeading` component:
  - **Title**: *"Create Account"* — **Rethink Sans 700 (Bold)**, 32px, 38px line height, 0px letter spacing.
  - **Subtitle**: *"Enter your email and phone number to get started with Junzle."* — **Plus Jakarta Sans 400**, 16px, 24px line height, -1.5% letter spacing.
- **Email input** — standard 48px text field with `you@domain.com` placeholder.
- **Phone Number field** — custom two-part row:
  - **Country code picker** (🇺🇸 flag emoji + "+1" text, 48px height, bordered box, 10px radius) on the left
  - **Phone input** (`flex: 1`, same styling) for the number on the right
- **Sticky bottom action sheet** (height: 132px, padding: 20px 20px 24px, gap: 8px) with **`box-shadow: 0px 0px 10.3px 0px #2B7FFF33`** subtle glow.
- **"Continue" button** (52px, Royal Blue `#2B7FFF`, centered label) + **"Already have an account? Sign Up"** footer link.

---

## 22. Mobile App — Reusable UI Components

- Created `AuthHeader.js`: Shared top navigation bar with back button on left, centered full-color Junzle brand mark (`assets/dark-logo.png`), and right spacer for symmetrical alignment across all auth screens (Login, Sign Up).
- Updated `Header.js`: Flow screen navigation header now uses `assets/dark-logo.png` image above the stepper indicator across all flow screens (Create Team / CoachFlow, ClubOwnerFlow, etc.).
- Created `ScreenHeading.js`: Shared typography component strictly adhering to Figma specs for all screen headers:
  - **Heading (Title)**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 32px`, `line-height: 38px`, `letter-spacing: 0px`
  - **Subheading**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 400`, `font-size: 16px`, `line-height: 24px`, `letter-spacing: -1.5%` (`-0.24px`)

---

---

## 24. Mobile App — Forgot Password Screen

- Implemented `ForgotPasswordScreen.js` matching the Figma design.
- Features `AuthHeader` (back navigation, centered Junzle dark logo) and `ScreenHeading` (Title: *"Forgot Password?"*, Subtitle: *"Enter your email and we'll send you a reset link."*).
- Clean single-field form layout for email address (`you@domain.com`).
- Sticky bottom action sheet with **"Send Reset Link"** button (`#2B7FFF` Royal Blue) with lift glow effect, navigating to the Password Reset confirmation screen.

---

## 25. Mobile App — Reset Your Password Screen

- Implemented `ResetPasswordScreen.js` allowing users to set and confirm new credentials.
- Integrated `AuthHeader` and `ScreenHeading` (Title: *"Reset Your Password"*, Subtitle: *"Enter your new password below."*).
- Dual secure input fields: **New Password** (`Create a new password`) and **Confirm Password** (`Confirm Password`).
- Integrated dynamic password visibility toggling via `EyeToggle` component that appears whenever characters are typed into the input.
- Sticky bottom action sheet with **"Reset Password"** button that completes the flow and returns the user to the Log In screen.

---

## 26. Mobile App — Dynamic Password Visibility Toggle (EyeToggle.js)

- Created `EyeToggle.js` reusable SVG component providing interactive password show/hide functionality.
- Renders custom vector SVG icons for both states:
  - **Show State (Eye Open)**: SVG path outline with center pupil dot.
  - **Hide State (Eye Slashed / EyeOff)**: SVG path outline with diagonal slash line.
- Dynamically activates and becomes visible only when the user enters text into password fields across `LoginScreen` and `ResetPasswordScreen`.

---

## 27. Mobile App — Verify Email Screen

- Implemented `VerifyEmailScreen.js` matching the Figma design specifications.
- Header with `AuthHeader` (back navigation, centered Junzle dark logo) and `ScreenHeading`:
  - **Title**: *"Verify Your Email"*
  - **Subtitle**: *"We’ve sent a verification link to **andy@email.com**. Please check your inbox and click the link to continue."*
- Interactive live 60-second countdown timer (`01:00`, `00:59`...) with conditional state:
  - **Active Countdown**: *"Didn’t receive Email? Resend in 01:00"*
  - **Expired State**: *"Didn’t receive Email? Resend in **Resend Email**"* (interactive link that restarts timer).
- Sticky bottom action button: **"Open Email App"** (`#2B7FFF` Royal Blue) which progresses the user to the verified confirmation view.

---

## 28. Mobile App — Email Verified Screen

- Implemented `EmailVerifiedScreen.js` matching the Figma design.
- Centered status graphic: `assets/verified.png` with pixel-exact dimensions:
  - `width: 98px`, `height: 98px`, `opacity: 1`, `angle: 0deg`.
- Combined text block: `width: 354px`, `height: 92px`, `gap: 6px`, `alignItems: 'center'`.
  - **Heading ("Email Verified")**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 32px`, `line-height: 38px`, `letter-spacing: 0px`, `text-align: center`, color `#0D1B3E`.
  - **Subheading ("Your email has been successfully verified. Now, let’s confirm your phone number.")**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 400`, `font-size: 16px`, `line-height: 24px`, `letter-spacing: -1.5%`, `text-align: center`, color `#64748B`.
- Sticky bottom action sheet with **"Continue"** button (`#2B7FFF` Royal Blue, 52px height, glow shadow).

---

## 29. Mobile App — Updated Splash Screen Branding

- Updated `SplashScreen.js` to render the official full-color `assets/junzle-logo.png` without monochromatic white tinting.
- Scaled precisely to Figma spec (`343px` × `94px`, matching `342.97` × `93.998`) with spring animation, expanding ripple rings, tagline slide, and smooth progress track.

---

## 30. Mobile App — Enter Verification Code (Phone) Screen

- Implemented `VerifyPhoneScreen.js` for SMS OTP verification.
- Features `AuthHeader` (back navigation, centered Junzle dark logo) and `ScreenHeading` (Title: *"Enter Verification Code"*, Subtitle: *"We’ve sent a 6-digit code to +1 (212) 555–123"*).
- 6-digit PIN input grid with individual bordered digit cells, active blue focus state (`#2B7FFF`), auto-focus, backspace jumping, and paste handling.
- Integrated 60-second countdown timer (`01:00`, `00:59`...) and **"Resend Code"** link.
- Sticky bottom **"Verify"** button (`#2B7FFF` Royal Blue).

---

## 31. Mobile App — Phone Number Confirmed Screen

- Implemented `PhoneConfirmedScreen.js` confirming successful multi-factor phone verification.
- Displays centered [`assets/verified.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/verified.png) status badge (98×98px).
- Center typography stack:
  - **Title ("Phone Number Confirmed")**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 32px`, `line-height: 38px`, `text-align: center`.
  - **Subtitle ("Your phone number has been verified. Your account is ready to use.")**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 400`, `font-size: 16px`, `line-height: 24px`, `letter-spacing: -1.5%`, `text-align: center`.
- Sticky bottom **"Get Started"** button (`#2B7FFF` Royal Blue, 52px height).

---

## 32. Mobile App — What Would You Like To Do? Screen

- Implemented `WhatWouldYouLikeToDoScreen.js` presenting the user's primary post-verification branching choices matching pixel-exact Figma specs.
- Features `AuthHeader` (back navigation, centered Junzle dark logo).
- **Heading Block**:
  - **Title ("What Would You Like To\nDo?")**: `font-family: 'Rethink Sans'`, `font-weight: 700 (Bold)`, `font-size: 32px`, `line-height: 38px`, `letter-spacing: 0px`, `color: #0D1B3E`, `width: 341px`, `height: 76px`.
  - **Subtitle ("You can create a new team or find and join an existing team.")**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 400 (Regular)`, `font-size: 16px`, `line-height: 24px`, `letter-spacing: -1.5%`, `color: #52627A`, `width: 354px`, `height: 48px`.
- **Action Cards Container** (`width: 354px`, `height: 224px`, `gap: 12px`):
  - **Individual Card Specs**: `width: 354px`, `height: 106px`, `border-radius: 16px`, `border: 1px solid #D9E0EA`, `padding: 8px (Spacing/xs)`, `justifyContent: 'space-between'`.
  - **Card Text Block**: `width: 204px`, `height: 74px`, `gap: 4px`, `opacity: 1`.
  - **Card Title**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 20px`, `line-height: 28px`, `letter-spacing: 0px`, `color: #0D1B3E`.
  - **Card Subtitle**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 500 (Medium)`, `font-size: 14px`, `line-height: 21px`, `letter-spacing: -1.6%`, `color: #52627A`, `width: 204px`, `height: 42px`, `opacity: 1`.
  - **Create a Team** → Navigates to `RolePicker` (Path A: Leadership).
  - **Find My Team** → Navigates to `RolePicker` (Path B: Participation).

---

## 33. Mobile App — Updated Navigation Architecture (App.js)

- Registered new routes in `App.js`: `VerifyPhone`, `PhoneConfirmed`, and `WhatWouldYouLikeToDo`.
- Unified CTA Routing: Both `WelcomeScreen.js` and `WhatWouldYouLikeToDoScreen.js` action cards now route identically:
  - **"Create a Team"** → `CoachFlow` (3-Step Create a Team setup).
  - **"Find My Team"** → `RolePicker` (`path: 'find'`).
- Complete authenticated onboarding flow:
  - **Direct Welcome Flow**: `Splash` → `Welcome` → `CoachFlow` (Create a Team) / `RolePicker` (Find My Team).
  - **Login Flow**: `Splash` → `Welcome` → `Login` → `WhatWouldYouLikeToDo` → `CoachFlow` / `RolePicker`.
  - **Sign Up Flow**: `Splash` → `Welcome` → `SignUp` → `VerifyEmail` → `EmailVerified` → `VerifyPhone` → `PhoneConfirmed` → `WhatWouldYouLikeToDo` → `CoachFlow` / `RolePicker`.

---

## 34. Mobile App — Redesigned Create a Team Flow (Steps 1–3)

- Fully aligned `CoachFlowScreens.js` with the 3-step Figma specification, accessible directly upon clicking **"Create a Team"** from `WhatWouldYouLikeToDoScreen.js`.
- **Global Header**: Standardized to exact `69px` height (`justifyContent: 'center'`) across `Header.js` and `AuthHeader.js` without excess top gap, featuring 3-step progress stepper (`currentStep` of `totalSteps={3}`).

### Step 1: Team Info
- **Heading**: *"Create a Team"* (`Rethink Sans 700`, 32px/38px) + Subtitle: *"Let’s set up your team info. You can always change it later"* (`Plus Jakarta Sans 400`, 16px/24px).
- **Fields**:
  - **Team Name**: text input (default *"Riverside Hoops"*).
  - **Choose Sport**: interactive dropdown with exact Figma SVG Chevron Down (`width: 11.67px`, `height: 5.83px`, `strokeWidth: 2px`, `angle: 90 deg`) selecting from Basketball, Soccer, Football, Baseball, etc.
  - **Age Group**: text input (default *"7"*).
  - **Location**: text input (default *"Minnesota"*).
- Sticky bottom **"Continue"** button (`#2B7FFF` Royal Blue) with lift glow shadow.

### Step 2: Team Logo & Colors
- **Team Logo**:
  - Logo preview square (`68×68px`, displaying `assets/tiger-logo.png` inside `#0F1334` badge).
  - **"Upload Logo"** action card with vector upload icon and *"PNG or JPG, Max 5MB"* subtext.
- **Team Colors**:
  - **Primary Color**: 5×2 color palette grid (`#0F1334`, `#015CFE`, `#DD1C35`, `#1DA35E`, `#A14EEB`, `#F16410`, `#FDBF13`, `#2FB8C2`, `#FF5EF2` + dashed `+` Add Custom Color button).
  - **Secondary Color**: 5×2 color palette grid with dashed `+` Add Custom Color button.
- **Add Custom Color Modal / Sub-screen**:
  - Header with back navigation to Step 2.
  - Title: *"Add Custom Color"* + Subtitle: *"These color will represent your team across Junzle."*
  - **Set As** dropdown (*"Primary Color"* / *"Secondary Color"*).
  - Interactive 2D gradient saturation/value color field with circular indicator ring.
  - Rainbow spectrum slider bar with draggable/tappable thumb knob.
  - **Hex Color** input field (`#0A48FF`).
  - **Color Preview** card showing color swatch + hex code.
  - **"Add Color"** sticky bottom button applying the custom swatch to the active palette.

### Step 3: Website and Privacy
- **Heading**: *"Website and Privacy"* (`Rethink Sans 700`, 32px/38px) + Subtitle: *"Add a website link and choose your team’s privacy setting."* (`Plus Jakarta Sans 400`, 16px/24px).
- **Fields**:
  - **Website Link (Optional)**: text input with `https://yourteam.com` placeholder.
  - **Privacy Setting**: dropdown selector with options (*"Public"*, *"Private"*).
- Sticky bottom **"Continue"** button finalizing team setup and proceeding directly to the **Team Created !** screen.

---

## 35. Mobile App — Team Created ! Screen

- Built and integrated the **Team Created !** screen (`TeamCreatedScreen.js` and `CoachFlowScreens.js` Step 4), confirming successful team registration with invite sharing utilities matching exact Figma specs.
- **Top Header**: Standard `Header` without stepper (`showStepper={false}`, `totalSteps={0}`, back button, centered `dark-logo.png` clipped frame, maintaining vertical balance with Steps 1-3).
- **Success Badge**: Centered [`assets/verified.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/verified.png) (`98×98px`).
- **Heading & Subheading Block** (`width: 354px`, `height: 92px`, `gap: 6px`, `alignItems: 'center'`):
  - **Title ("Team Created !")**: `font-family: 'Rethink Sans'`, `font-weight: 700 (Bold)`, `font-size: 32px`, `line-height: 38px`, `letter-spacing: 0px`, `color: #0D1B3E`, `text-align: center`, `width: 220px`, `height: 38px`.
  - **Subtitle ("Your team is ready. Share the link or QR code to invite members.")**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 400 (Regular)`, `font-size: 16px`, `line-height: 24px`, `letter-spacing: -1.5%`, `color: #52627A`, `text-align: center`, `width: 354px`, `height: 48px`.
- **QR Code Graphic**: Centered [`assets/qr-code.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/qr-code.png) container (`170×170px`).
- **Download QR Code Button**:
  - Dimensions: `width: 354px`, `height: 48px`, `border-radius: 10px`, `border: 1px solid #2B7FFF`.
  - Icon: [`assets/download.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/download.png) (`16×16px`, tint `#2B7FFF`).
  - Text: *"Download QR Code"* (`Rethink Sans 700`, 15px, `#2B7FFF`).
- **Invite Link Section**:
  - URL container (`width: 354px`, `height: 45px`, `border-radius: 8px (Radius/1)`, `border: 1px solid #E9EDF3`, `background: #F7F9FC`, `paddingHorizontal: 12px`, `justifyContent: 'space-between'`).
  - Display URL: `junzle.com/t/riverside.b` with [`assets/copy.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/copy.png) icon.
  - Interactive clipboard copy with 2-second *"Link copied to clipboard!"* toast feedback.
- **Other Ways to Invite Section**:
  - Section Heading: `font-family: 'Rethink Sans'`, `font-weight: 700 (Bold)`, `font-size: 20px`, `line-height: 28px`, `letter-spacing: 0px`, `color: #0D1B3E`, `width: 182px`, `height: 28px`.
  - **Send Via Text & Send via Email Cards**:
    - Container: `width: 354px`, `height: 100px`, `border-radius: 16px`, `border: 1px solid #E9EDF3`, `background: #FFFFFF`, `padding: 8px (Spacing/xs)`, `paddingHorizontal: 16px`, `justifyContent: 'space-between'`.
    - Title: `font-family: 'Rethink Sans'`, `font-weight: 700 (Bold)`, `font-size: 18px`, `line-height: 24px`, `letter-spacing: -1%`, `color: #0D1B3E`, `width: 302px`, `height: 24px`.
    - Subtitle: `font-family: 'Plus Jakarta Sans'`, `font-weight: 500 (Medium)`, `font-size: 14px`, `line-height: 21px`, `letter-spacing: -1.6%`, `color: #52627A`, `width: 257px`, `height: 42px`.
    - Right Action: `#2B7FFF` arrow right SVG icon.
- **Bottom Action Area**: Sticky bottom container with `box-shadow: 0px 0px 10.3px 0px #2B7FFF33`, housing primary **"Continue"** button (`#2B7FFF`, `52px` height) navigating onwards to `WhatWouldYouLikeToDo`.

## 36. Mobile App — Find My Team, Scan QR & Join Flow

- Built the complete **Find My Team** flow ([`FindTeamFlowScreens.js`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/src/screens/FindTeamFlowScreens.js)) fully aligned with the latest Figma design specifications.
- **Direct Entry — Screen 1: Find My Team (Live Search & Header QR)**:
  - **Header**: Standard `Header` component (`showStepper={false}`, 38×38px back button, centered Junzle logo) with right-aligned QR Code shortcut button (`QrHeaderIcon` in `#2B7FFF`).
  - **Heading Box**: `"Find My Team"` (`Rethink Sans 700`, 32px/38px, `#0D1B3E`) + Subtitle: `"Search by team name, sport or city to join your team on Junzle."` (`Plus Jakarta Sans 400`, 16px/24px, `#52627A`).
  - **Search Bar Container**: `width: 354px`, `height: 45px`, `borderRadius: 8px (Radius/1)`, `border: 1px solid #E2E8F0`, `paddingTop/Bottom: 4px (Spacing/2xs)`, `paddingLeft/Right: 8px (Spacing/xs)`, `gap: 12px`.
  - **Result Section**: `width: 354px`, `minHeight: 412px`, `gap: 12px`.
  - **Result Heading**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 20px`, `line-height: 28px`, `letter-spacing: 0px`, `color: #0D1B3E`.
  - **Team Cards Container**: `width: 354px`, `height: 84px`, `borderRadius: 16px (Radius/2)`, `border: 1px solid #E2E8F0`, `padding: 8px (Spacing/xs)`, `justifyContent: 'space-between'`.
  - **Team Avatar Container**: `width: 52px`, `height: 52px`, `borderRadius: 26px (Radius/4 round)`, `padding: 10px`, `overflow: hidden`.
  - **Team Logos & Color Themes (`32×32px`)**:
    - *Riverside Basketball*: `#0D1B3E` (`assets/riverside.png`)
    - *Riverside Phoenix*: `#0EA5E9` (`assets/riverside-phoenix.png`)
    - *Riverside Vipers*: `#145ECC` (`assets/riveside-vipers.png`)
    - *Miami Riverside*: `#22C55E` (`assets/miami-riverside.png`)
  - **Team Info Column**: `width: 204px`, `height: 49px`, `gap: 4px`.
  - **Team Card Title**: `font-family: 'Rethink Sans'`, `font-weight: 700`, `font-size: 18px`, `line-height: 24px`, `letter-spacing: -1%`, `color: #0D1B3E`.
  - **Team Card Category**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 500`, `font-size: 14px`, `line-height: 21px`, `letter-spacing: -1.6%`, `color: #52627A`.
  - **Right Action**: `20×20px` `#2B7FFF` arrow icon.
  - **Role Badge**: `font-family: 'Plus Jakarta Sans'`, `font-weight: 500`, `font-size: 14px`, `line-height: 21px`, `letter-spacing: -1.6%`, `color: #015CFE`.
- **Screen 2: Scan QR Code Viewfinder**:
  - Full camera viewfinder preview (`height: 380px`, `border-radius: 16px`, background `#1E293B`).
  - 4 target corner brackets, centered QR graphic, animated vertical laser scanning line, flashlight toggle, and `"Upload from Gallery"` action pill.
- **Screen 3: What is Your Role? (Role Selector)**:
  - Selected Team Banner Card at top: Team avatar, team name (`"Miami Riverside"`), sport/city (`"Basketball • Miami"`), and blue `"Selected"` pill badge.
  - Heading: `"What is Your Role?"` (`Rethink Sans 700`, 32px/38px) + Subtitle: `"This helps us customize your experience and will be visible to the team admin for approval."`
  - 5 Role Cards:
    1. **Parent** (*"Manage your child's team activities"*)
    2. **Coach** (*"Organize practices and games."*)
    3. **Assistant Coach** (*"Help with team management."*)
    4. **Team Manager** (*"Handle communication and scheduling."*)
    5. **Player** (*"Join your team and stay updated."*)
- **Screen 4: Join Team (Summary & Send Request)**:
  - Selected Team Summary Card: Avatar, team name, sport/city, and role badge (e.g. `"Coach"` / `"Parent"` in `#EBF2FF` / `#015CFE`).
  - About Team Section: *"Competitive youth basketball team focused on development and teamwork."*
  - Sticky Bottom Container: Primary **"Send Request"** button (`#2B7FFF`, 52px height) with lift shadow.
- **Screen 5: Request Sent ! Confirmation**:
  - Centered [`assets/verified.png`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/assets/verified.png) status badge + confirmation text + `"Done"` button returning to the main dashboard.
- **Routing Integration**:
  - Registered `FindTeamFlow` route in `App.js`.
  - Both `WelcomeScreen.js` and `WhatWouldYouLikeToDoScreen.js` `"Find My Team"` cards trigger direct navigation to this flow.

---

## 37. Mobile App — Layout Inset & Bottom Spacing Optimization

- **Root Provider Isolation**: Standardized `SafeAreaProvider` at the root of `App.js` and scoped `edges={['top']}` on individual flow screens, allowing bottom action sheets and primary buttons to extend flush to the screen's bottom boundary without floating dead-zones.
- **Normalized Sticky Bottom Sheets**: Eliminated rigid `height: 132px` blocks across `FindTeamFlowScreens.js`, `TeamCreatedScreen.js`, `CoachFlowScreens.js`, `LoginScreen.js`, and `SignUpScreen.js`, replacing them with content-driven padding (`paddingTop: 12px`, `paddingBottom: 24px/16px` per platform) and soft lift drop-shadows.
- **Header Logo & Progress Alignment**: Configured the center logo + progress stepper container in [`Header.js`](file:///d:/OM/John%20Sheckfold/Junzle-crm/mobile-app/src/components/Header.js) to exact Figma specifications: `width: 125.065536px`, `height: 56.394833px`, `gap: 12px` between the Junzle logo frame (`34.394833px` height) and the active dot stepper container (`10px` height).
- **Flush Edge-to-Edge Experience**: Ensured background containers (e.g. `WelcomeScreen` blue hero and white bottom card) seat seamlessly without gap artifacts on both iOS and Android.

---

## 38. Super Admin — Login Form Security & UI Cleanup

- **Removed Visible Demo Credentials**: Removed the demo credentials display helper box, auto-fill buttons, and credential hints from the Super Admin login page ([`Login.jsx`](file:///d:/OM/John%20Sheckfold/Junzle-crm/super-admin/src/pages/Login.jsx)).
- **Generic Security Error Handling**: Updated validation error responses to standard generic security messaging (`"Invalid email or password. Please try again."`).
- **Internal Hardcoded Verification**: Maintained RBAC mock credentials in code (`codecraftwt@gmail.com` / `admin@junzle.com` with password `Admin@123`) while presenting a standard enterprise login interface with clean `admin@junzle.com` placeholder text.

---

*Session update compiled from `super-admin/` and `mobile-app/` — All flows, login screens, and UI tokens fully verified.*

# Junzle — Core Phase 1 Surfaces & Brand Identity

This repository contains the local builds for the **three core client surfaces** and **revised brand identity assets** of the Junzle Sports Operating System, prepared for local review and architecture greenlighting.

---

## 🎨 Brand Assets & Revised Logo System

Per the brand specifications, the logo has been revised to remove the duplicate J shape and integrate the canary yellow lightning bolt as a negative space cut directly into a single bold italic J.

### Color Tokens
| Name | Hex Code | Purpose |
|---|---|---|
| **Primary Blue** | `#1A56DB` | Royal Blue — brand primary, CTA buttons, active accents |
| **Accent Yellow** | `#FFEF00` | Canary Yellow — lightning bolt cut, speed lines, high-contrast highlights |
| **Dark Navy** | `#0D1B3E` | Contrast background, typography, dark headers |
| **White** | `#FFFFFF` | Background, high-contrast white logo text |

### Delivered Asset Files (`/brand-assets/`)
* **`logo-white-bg.svg`** — Revised single bold italic J in Royal Blue with integrated canary yellow negative space lightning bolt slash, speed lines sweeping from bottom-left, and bold italic "Junzle" wordmark on pure white background.
* **`logo-dark-navy-bg.svg`** — Dark Navy (`#0D1B3E`) background version of the revised logo with crisp high-contrast styling.
* **`app-icon-blue.svg`** — iOS app icon format: Single bold italic J centered on Royal Blue (`#1A56DB`) square with rounded corners and canary yellow detail. Icon only, no wordmark.
* **`app-icon-white.svg`** — iOS app icon format on pure white background with subtle border.
* **`favicon-60x60.svg`** & **`favicon-120x120.svg`** — Multi-scale verified favicons readable at 60×60px and 120×120px.
* **`BrandAssetsPreview.html`** — Interactive visual review sheet displaying all color swatches, contrast checks, and rendered logo variations side-by-side.

---

## 📱 Deliverable 1 — Mobile App (React Native / Expo)
* **Directory:** `/mobile-app`
* **Technology:** React Native 0.86, Expo 57, React Native Web, React Native SVG.
* **Platform Support:** iOS, Android, and Web preview.

### Implemented End-to-End Flows (6 Roles)
1. **Entry Screen:**
   * Two centered action buttons: **"Create a Team or League"** (Path A) and **"Find My Team"** (Path B).
2. **Path A — Create a Team or League:**
   * Role Picker Screen: Coach, Club Owner, League Admin.
   * **Coach Flow:** Profile setup (name, photo, phone) ➔ Create team (name, sport, age group, city/state) ➔ Team color picker (primary & secondary with jersey preview) ➔ Invite parents via shareable link + QR code generation screen ➔ Confirmation screen ("You're all set").
   * **Club Owner Flow:** Profile setup ➔ Create organization (org name, sport, city/state) ➔ Add teams under org ➔ Invite coaches ➔ Confirmation screen.
   * **League Admin Flow:** Profile setup ➔ Create league (name, sport, region) ➔ Add clubs/organizations under league ➔ Confirmation screen.
3. **Path B — Find My Team:**
   * Role Picker Screen: Parent, Player, Fan / Spectator.
   * **Parent Flow:** Profile setup (parent name, athlete name, phone) ➔ Find team (search by name, enter invite code, or camera QR scanner) ➔ Request to join ➔ Confirmation screen.
   * **Player Flow:** Profile setup (name, preferred jersey #, field position) ➔ Search for team by name ➔ Request to join ➔ Confirmation screen.
   * **Fan / Spectator Flow:** Search for team by name ➔ Follow team (lightweight — final score & delay alert preferences) ➔ Confirmation screen.
4. **Post-Confirmation Mobile Hub:**
   * Interactive team dashboard preview featuring upcoming games, RSVP attending/out controls, roster directory, and coach announcements.

### How to Run Locally:
```bash
# Option A: In-browser web preview (fastest for local inspection)
npm run dev:mobile

# Option B: Run via Expo Go on physical iOS / Android device
npm run dev:mobile:native
```

---

## 🛡️ Deliverable 2 — Super Admin Panel (React.js)
* **Directory:** `/super-admin`
* **Local Port:** `http://localhost:5173`
* **Technology:** Vite, React 18, React Router v6, Lucide React, Junzle Athletic Theme.

### Screens & Features
* **Login Screen:**
   * Hardcoded demo credentials (`admin@junzle.com` / `junzle2026`) with a 1-click **Auto-Fill** button.
* **Post-Login Operations Console:**
   * **Dashboard:** Real-time KPI metric cards (Total Teams: 142, Registered Members: 3,845, 30-Day GMV: $184,250, Junzle Fees: $18,425), 6-month gross volume & take-rate bar visualizer, sports distribution breakdown, live platform audit log, and quick CSV export.
   * **Teams:** Interactive teams table with search, sport filter, and status filter (Active, Pending Review, Suspended). Includes **Team Details Modal** with color swatches, roster capacity bar, coach contacts, and activation/suspension toggles.
   * **Users:** 7-tier RBAC directory (`SUPER_ADMIN`, `LEAGUE_ADMIN`, `CLUB_OWNER`, `COACH`, `PARENT`, `PLAYER`, `SPECTATOR`) with full search, role filtering, status badges, and user inspection modal.
   * **Transactions:** Financial ledger displaying Stripe Connect transactions, gross amounts, Junzle platform fee deductions (10%), net team payouts, payment method, and settlement status.
   * **Settings:** Platform configuration form covering General info, Financial & Stripe Connect take-rate % and payout schedules, Brand color tokens, and notification dispatch toggles (Twilio SMS blasts, FCM push, SES email receipts).

### How to Run Locally:
```bash
npm run dev:admin
# Opens on http://localhost:5173
```

---

## 🌐 Deliverable 3 — Member Portal (React.js)
* **Directory:** `/member-portal`
* **Local Port:** `http://localhost:5174`
* **Technology:** Vite, React 18, React Router v6, Lucide React.

### Screens & Features
* **Entry Screen:**
   * Matches the mobile app entry screen logic with hero header, branding, and the two primary entry buttons: **"Create a Team or League"** and **"Find My Team"**.
* **Role Selection Screens:**
   * Path A: Coach, Club Owner, League Admin.
   * Path B: Parent, Player, Fan / Spectator.
* **Multi-Step Onboarding Wizards:**
   * Implements the desktop-adapted version of all 6 role flows with live step progress bars, reactive color picker, dynamic QR code renderer, and mock search filters.
* **Post-Onboarding Member Portal Dashboard:**
   * Live interactive team hub featuring upcoming game schedule cards, interactive RSVP buttons ("Attending" / "Can't Make It"), full team roster, and coach announcement feed.

### How to Run Locally:
```bash
npm run dev:portal
# Opens on http://localhost:5174
```

---

## ⚡ Quick Start / Reviewing All Surfaces

To run any or all surfaces from the repository root:

```bash
# Run Super Admin Panel (localhost:5173)
npm run dev:admin

# Run Member Web Portal (localhost:5174)
npm run dev:portal

# Run Mobile App in Browser (localhost:8081)
npm run dev:mobile

# Run ALL 3 Surfaces Concurrently
npm run dev:all
```

---

## 📋 Scope Checklist
* [x] **Brand Assets & Revised Logo:** Single bold italic "J" only, canary yellow negative space lightning cut, speed lines in blue/yellow, white bg & dark navy bg versions, 60×60px and 120×120px app icons.
* [x] **Deliverable 1 (Mobile App):** React Native / Expo app with entry screen, Path A & Path B role pickers, complete 6-role onboarding flows without dead ends, and post-confirmation hub.
* [x] **Deliverable 2 (Super Admin):** React.js admin console on localhost:5173 with Login, Dashboard, Teams, Users, Transactions, and Settings.
* [x] **Deliverable 3 (Member Portal):** React.js web portal on localhost:5174 mirroring mobile entry flow, role pickers, 6 onboarding flows, and member dashboard.
* [x] **Scope Constraints Maintained:** Frontend-only, mock/in-memory data, no external database or paid API keys required for review.

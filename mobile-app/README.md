# Junzle Mobile App (React Native / Expo)

Native mobile application for iOS & Android with web browser preview support. Built to exact Figma specifications for Coach, Parent/Guardian, and Team Dashboard flows.

---

## Brand & Design Specifications
- **Brand Colors:** Royal Blue (`#1A56DB`), Canary Yellow (`#FFEF00`), Dark Navy (`#0D1B3E`), Clean White (`#FFFFFF`)
- **Header:** `junzle :` wordmark with twin canary-yellow dots, back arrow `‹`, and integrated 5-dot horizontal progress tracker.
- **Inputs:** 50px height, 12px corner radius, subtle borders (`#E2E8F0`), leading icon glyphs (👤, ✉️, 📞, 📍, 📅), with First & Last Name paired in 2-column rows.

---

## Standalone Installation & How to Review

```bash
# 1. Navigate to the mobile app project
cd mobile-app

# 2. Dependencies are already installed in this directory's independent node_modules!
# (If needed: npm install --legacy-peer-deps)

# 3. Launch Web Preview in your browser (opens on http://localhost:8081)
npm run web

# 4. Or launch the pre-compiled production build directly:
npx serve dist -l 8081

# 5. Or test on a physical iOS / Android device via Expo Go:
npm start
# Scan the displayed QR terminal code using the Expo Go camera
```

---

## Exact Figma Screens Implemented

### 1. Entry Screen (`iPhone 17 - 1` & `17 - 13`)
- `junzle :` logo with vertical yellow dots.
- Heading: *"Welcome to Junzle — The all-in-one platform to manage your sports teams."*
- Role selection cards with blue radio selection indicators:
  - **I'm a Coach** (Manage teams, players, events, communicate with parents)
  - **I'm a Parent or Guardian** (Stay updated on your child's team, events, communications)
  - **I'm an Administrator** (Oversee organization, team, roster settings)
- Primary Button: **Get Started →**
- Direct access to browse all 6 user roles (Club Owner, League Admin, Player, Fan).

### 2. Coach Onboarding Flow (`iPhone 17 - 5` to `17 - 10`)
- **Step 1 — Let's file (`17 - 5`):** 2-column First & Last Name, Email, Phone, and Coach Role badge card.
- **Step 2 — Create your team (`17 - 18` & `17 - 3`):** Team Name (Baltimore Tigers), Sport (U12 Football), City/State, and Tigers emblem upload card.
- **Step 3 — Choose your team colors (`17 - 19`):** 10-color swatch palette for Primary & Secondary colors (#0D1B3E Navy, #1A56DB Royal Blue, #DC2626 Red, #10B981 Green, #8B5CF6 Purple, #F97316 Orange, #FFEF00 Canary Yellow, #06B6D4 Teal, #EC4899 Pink).
- **Step 3 Modal — Add Custom Color (`17 - 20`):** Interactive color spectrum gradient box, hex code input (`#0A57FF`), live color preview, and Add Color button.
- **Step 4 — Invite Parents to Join your team (`17 - 9`):** Team invite link with one-tap copy button, SMS, Email, QR Code modal viewfinder, and share options.
- **Step 5 — You're all set! (`17 - 8` & `17 - 10`):** Baltimore Tigers U12 Football verified team card with Coach badge, plus "What's next?" action list (View Team Schedule, Roster Your Team, Explore Your Team, Manage Notifications) leading to the Dashboard.

### 3. Parent / Guardian Onboarding Flow (`iPhone 17 - 11` to `17 - 12`)
- **Step 1 — Let's Set Up Your Profile (`17 - 11`):** Parent Personal Info (First & Last Name, Email, Phone) and Child Information (Child First & Last Name, Date of Birth with calendar icon, Gender).
- **Step 2 — Join your team (`17 - 15` & `17 - 16`):**
  - **Use Invite Link Tab:** Paste invite link input + Send Join Request + Scan QR Code button.
  - **Search for Team Tab:** Live team search with Recent Searches (Baltimore Tigers, Wildcats FC, Eagles Basketball).
- **Step 2 Modal — Scan QR Code Viewfinder (`17 - 17`):** Camera viewfinder frame with 4-corner targeting brackets, flashlight toggle, and "Upload From Gallery" option.
- **Step 3 — Request to Join (`17 - 2`):** Baltimore Tigers detail card with coach badge, "About Team" description, and Send Request button.
- **Step 4 — You're all set! (`17 - 12`):** Confirmation with Baltimore Tigers card, Alex Turner summary badge, and "Continue to Team Dashboard" button.

### 4. Team Hub & Dashboard (`iPhone 17 - 2` & `17 - 1`)
- **Variant 1 — Rich Team Hub (`iPhone 17 - 2`):**
  - Header with user greeting (*"Sarah Johnson 👋"* or *"Coach Marcus 👋"*), avatar, and notification badge.
  - Active Team Card: Baltimore Tigers U12 Football with role chip.
  - Linear Season Progress Bar: Game 8 of 12.
  - **Next Game Hero Banner:** Stadium styling, date/time, matchup vs Wildcats FC, field location, teammate avatar stack (+8 going), and interactive RSVP toggle (*Attending ✓* / *Out ✗*).
  - **Game Schedule Week Strip:** Horizontal Monday–Sunday calendar pills with event dots and active selection.
  - **Team Updates:** Pinned announcement from Coach Marcus Vance with royal blue kit alert.
  - **Merchandise Banner:** Support the Tigers official team store banner.
  - **5-Tab Bottom Navigation Bar:** Home, Schedule, Messages, Roster, Profile.
- **Variant 2 — Look Around Quick View (`iPhone 17 - 1`):**
  - Look Around header, team card with chevron, segmented tab switches, and upcoming events horizontal date cards.
  - Easily toggle between both views using the header button in the top right!

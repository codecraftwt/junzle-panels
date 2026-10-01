# Junzle Super Admin Console

Standalone administrative control panel for platform managers, operations, and fee auditing.

## Tech Stack
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Brand Colors:** Royal Blue (`#1A56DB`), Canary Yellow (`#FFEF00`), Dark Navy (`#0D1B3E`)

## Standalone Installation & Setup

```bash
# Navigate to project folder
cd super-admin

# Install dependencies in this project's own node_modules
npm install

# Start development server on port 5173
npm run dev

# Build production bundle to ./dist
npm run build
```

## Demo Credentials
- **Email:** `admin@junzle.com`
- **Password:** `junzle2026`
- *(Or click the "Auto-Fill" button on the login screen)*

## Included Screens
1. **Login:** Hardcoded credentials with 1-click Auto-Fill.
2. **Dashboard:** KPI summary cards, 6-month GMV/fee visualizer, sport breakdown, recent audit feed.
3. **Teams:** Search, sport and status filters, detail modal with color swatches and activation toggle.
4. **Users:** 7-tier RBAC directory with search, role filtering, and user inspection drawer.
5. **Transactions:** Stripe Connect financial ledger, gross amounts, Junzle fee deductions, and net payouts.
6. **Settings:** Platform take-rate %, payout frequency, brand colors, and Twilio/FCM/SES messaging toggles.

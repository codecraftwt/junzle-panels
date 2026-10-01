# Junzle Member Portal

Desktop/browser web portal for coaches, club managers, parents, players, and spectators.

## Tech Stack
- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Brand Colors:** Royal Blue (`#1A56DB`), Canary Yellow (`#FFEF00`), Dark Navy (`#0D1B3E`)

## Standalone Installation & Setup

```bash
# Navigate to project folder
cd member-portal

# Install dependencies in this project's own node_modules
npm install

# Start development server on port 5174
npm run dev

# Build production bundle to ./dist
npm run build
```

## Included Flows & Screens
1. **Entry Screen:** Matches mobile app with the two core action buttons ("Create a Team or League" / "Find My Team").
2. **Role Picker:** Path A (Coach, Club Owner, League Admin) and Path B (Parent, Player, Fan).
3. **Coach Flow (5 steps):** Profile ➔ Create Team ➔ Choose Colors ➔ QR Invite ➔ Confirmation.
4. **Club Owner Flow (5 steps):** Profile ➔ Create Org ➔ Add Teams ➔ Invite Coaches ➔ Confirmation.
5. **League Admin Flow (4 steps):** Profile ➔ Create League ➔ Add Clubs ➔ Confirmation.
6. **Parent Flow (4 steps):** Profile ➔ Find Team (search / code / QR) ➔ Request Join ➔ Confirmation.
7. **Player Flow (4 steps):** Profile ➔ Search Team ➔ Request Join ➔ Confirmation.
8. **Fan Flow (3 steps):** Search Team ➔ Lightweight Follow Preferences ➔ Confirmation.
9. **Portal Dashboard:** Interactive team hub with schedule cards, RSVP controls, and roster.

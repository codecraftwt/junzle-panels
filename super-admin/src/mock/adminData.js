// ── Clean & Simple Mock Data for Super Admin Demo ──────────────────

export const mockKpiStats = [
  {
    id: 'teams',
    label: 'Total Teams',
    value: '24',
    change: '+3 this month',
    isPositive: true,
    subtext: '4 active leagues',
  },
  {
    id: 'users',
    label: 'Registered Members',
    value: '380',
    change: '+24 this week',
    isPositive: true,
    subtext: 'Coaches, Parents, Players',
  },
  {
    id: 'volume',
    label: '30-Day GMV',
    value: '$18,500',
    change: '+12% vs last mo',
    isPositive: true,
    subtext: 'Stripe gross volume',
  },
  {
    id: 'revenue',
    label: 'Junzle Platform Fees',
    value: '$1,850',
    change: '+10%',
    isPositive: true,
    subtext: '10% net take rate',
  },
];

export const mockSportsBreakdown = [
  { sport: 'Soccer', count: 12, percentage: 50, color: '#1A56DB' },
  { sport: 'Basketball', count: 6, percentage: 25, color: '#F59E0B' },
  { sport: 'Baseball', count: 4, percentage: 17, color: '#10B981' },
  { sport: 'Football', count: 2, percentage: 8, color: '#8B5CF6' },
];

export const mockMonthlyRevenue = [
  { month: 'Jun', volume: 12000, fee: 1200 },
  { month: 'Jul', volume: 14000, fee: 1400 },
  { month: 'Aug', volume: 16000, fee: 1600 },
  { month: 'Sep', volume: 18500, fee: 1850 },
];

export const mockAuditFeed = [
  { id: 1, action: 'Team Created', target: 'Riverside Hoops', actor: 'Coach Marcus', time: '2 hours ago' },
  { id: 2, action: 'Member Joined', target: 'Andy Vance (Parent)', actor: 'Riverside Hoops', time: '4 hours ago' },
  { id: 3, action: 'Payment Processed', target: '$150.00 Registration Fee', actor: 'Stripe Connect', time: 'Yesterday' },
  { id: 4, action: 'Platform Setting', target: 'Default 10% take-rate active', actor: 'Code Craft (Super Admin)', time: '2 days ago' },
];

export const mockTeams = [
  {
    id: 'team-001',
    name: 'Riverside Hoops',
    sport: 'Basketball',
    organization: 'Austin Youth Hoops',
    ageGroup: 'U12',
    coach: 'Marcus Vance',
    playersCount: 12,
    status: 'Active',
    createdDate: '2026-09-01',
    cityState: 'Austin, TX',
  },
  {
    id: 'team-002',
    name: 'Riverside Phoenix',
    sport: 'Soccer',
    organization: 'Phoenix Youth Academy',
    ageGroup: 'U14',
    coach: 'Sarah Jenkins',
    playersCount: 16,
    status: 'Active',
    createdDate: '2026-09-10',
    cityState: 'Phoenix, AZ',
  },
];

export const mockUsers = [
  {
    id: 'usr-101',
    name: 'Code Craft',
    email: 'Codecraftwt@gmail.com',
    role: 'SUPER_ADMIN',
    status: 'Active',
    joinedDate: '2026-06-01',
  },
  {
    id: 'usr-102',
    name: 'Marcus Vance',
    email: 'marcus@email.com',
    role: 'COACH',
    status: 'Active',
    joinedDate: '2026-08-12',
  },
];

export const mockTransactions = [
  {
    id: 'txn_001',
    date: '2026-09-29',
    payer: 'Andy Vance',
    team: 'Riverside Hoops',
    gross: 150.00,
    junzleFee: 15.00,
    status: 'Completed',
  },
];

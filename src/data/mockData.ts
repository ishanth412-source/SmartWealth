// ────────────────────────────────────────────────────────────────────────────
// mockData.ts – Realistic sample data for SmartWealth demo
// All amounts in Indian Rupees (₹)
// ────────────────────────────────────────────────────────────────────────────

export const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

/** Monthly income vs expense data for bar chart */
export const incomeExpenseData = [
  { month: 'Apr', income: 85000, expenses: 58000, savings: 27000 },
  { month: 'May', income: 85000, expenses: 62000, savings: 23000 },
  { month: 'Jun', income: 85000, expenses: 55000, savings: 30000 },
  { month: 'Jul', income: 95000, expenses: 68000, savings: 27000 },
  { month: 'Aug', income: 95000, expenses: 71000, savings: 24000 },
  { month: 'Sep', income: 95000, expenses: 64000, savings: 31000 },
];

/** Savings trend (12 months) */
export const savingsTrend = [
  { month: 'Apr', savings: 27000 },
  { month: 'May', savings: 50000 },
  { month: 'Jun', savings: 80000 },
  { month: 'Jul', savings: 107000 },
  { month: 'Aug', savings: 131000 },
  { month: 'Sep', savings: 162000 },
];

/** Expense breakdown by category */
export const expenseCategories = [
  { name: 'Housing / Rent', value: 22000, color: '#14b8a6' },
  { name: 'Food & Dining', value: 12000, color: '#f59e0b' },
  { name: 'Transport', value: 6000, color: '#6366f1' },
  { name: 'Entertainment', value: 4500, color: '#ec4899' },
  { name: 'Utilities', value: 3500, color: '#84cc16' },
  { name: 'Medical', value: 3000, color: '#f97316' },
  { name: 'Shopping', value: 7500, color: '#8b5cf6' },
  { name: 'EMI', value: 5000, color: '#0ea5e9' },
];

/** Summary stats */
export const summaryStats = {
  netWorth: 4_82_500,
  monthlyIncome: 95_000,
  monthlyExpenses: 64_000,
  savingsRate: 32.6,
  safeToSpend: 1_240,
  totalSavings: 1_62_000,
  totalInvestments: 3_20_500,
};

/** Sample CSV transaction data (simulated auto-categorization) */
export const sampleTransactions = [
  { date: '2024-09-01', description: 'HDFC Salary Credit', amount: 95000, type: 'income', category: 'Income' },
  { date: '2024-09-02', description: 'House Rent', amount: -22000, type: 'expense', category: 'Housing / Rent' },
  { date: '2024-09-03', description: 'Swiggy Order', amount: -450, type: 'expense', category: 'Food & Dining' },
  { date: '2024-09-04', description: 'Uber Auto', amount: -120, type: 'expense', category: 'Transport' },
  { date: '2024-09-05', description: 'Netflix Subscription', amount: -499, type: 'expense', category: 'Entertainment' },
  { date: '2024-09-06', description: 'Zomato Gold', amount: -299, type: 'expense', category: 'Food & Dining' },
  { date: '2024-09-07', description: 'BESCOM Electricity', amount: -1800, type: 'expense', category: 'Utilities' },
  { date: '2024-09-08', description: 'Apollo Pharmacy', amount: -650, type: 'expense', category: 'Medical' },
  { date: '2024-09-09', description: 'Amazon Shopping', amount: -2400, type: 'expense', category: 'Shopping' },
  { date: '2024-09-10', description: 'HDFC Home Loan EMI', amount: -5000, type: 'expense', category: 'EMI' },
  { date: '2024-09-11', description: 'BigBasket Grocery', amount: -3200, type: 'expense', category: 'Food & Dining' },
  { date: '2024-09-12', description: 'Ola Cab', amount: -280, type: 'expense', category: 'Transport' },
  { date: '2024-09-13', description: 'PVR Cinemas', amount: -600, type: 'expense', category: 'Entertainment' },
  { date: '2024-09-14', description: 'Myntra Fashion', amount: -1800, type: 'expense', category: 'Shopping' },
  { date: '2024-09-15', description: 'Meesho', amount: -950, type: 'expense', category: 'Shopping' },
  { date: '2024-09-16', description: 'D-Mart Grocery', amount: -2800, type: 'expense', category: 'Food & Dining' },
  { date: '2024-09-17', description: 'BWSSB Water Bill', amount: -320, type: 'expense', category: 'Utilities' },
  { date: '2024-09-18', description: 'Freelance Payment', amount: 15000, type: 'income', category: 'Income' },
  { date: '2024-09-19', description: 'Jio Recharge', amount: -239, type: 'expense', category: 'Utilities' },
  { date: '2024-09-20', description: 'Airtel Broadband', amount: -799, type: 'expense', category: 'Utilities' },
];

/** 12-month expense forecast data */
export const forecastData = MONTHS.map((month, i) => ({
  month,
  projected: Math.round(64000 * Math.pow(1.005, i)),
  optimistic: Math.round(60000 * Math.pow(1.003, i)),
  pessimistic: Math.round(68000 * Math.pow(1.007, i)),
}));

/** Inflation category defaults */
export const inflationCategories = [
  { key: 'rent', label: 'Rent / Housing', rate: 8, monthlyBudget: 22000, icon: '🏠' },
  { key: 'fuel', label: 'Fuel / Transport', rate: 10, monthlyBudget: 6000, icon: '⛽' },
  { key: 'groceries', label: 'Groceries / Food', rate: 6, monthlyBudget: 12000, icon: '🛒' },
  { key: 'medical', label: 'Medical / Health', rate: 12, monthlyBudget: 3000, icon: '💊' },
  { key: 'education', label: 'Education', rate: 9, monthlyBudget: 2000, icon: '📚' },
];

/** Roadmap items */
export const roadmapItems = [
  {
    quarter: 'Q1 2025',
    title: 'What-If Simulator',
    description: 'Run scenario analysis — what if I get a raise? What if rent doubles? See impact in real time.',
    status: 'upcoming',
    icon: '🔮',
  },
  {
    quarter: 'Q2 2025',
    title: 'Bank & SMS Auto-Import',
    description: 'Automatically import transactions from your bank statements or SMS alerts. Zero manual entry.',
    status: 'upcoming',
    icon: '📱',
  },
  {
    quarter: 'Q3 2025',
    title: 'Regional-Language Chatbot',
    description: 'Ask financial questions in Hindi, Tamil, Telugu and more. Finance without language barriers.',
    status: 'planned',
    icon: '🌐',
  },
  {
    quarter: 'Q4 2025',
    title: 'Family Shared Mode',
    description: 'Manage a shared household budget across multiple members with role-based views.',
    status: 'planned',
    icon: '👨‍👩‍👧‍👦',
  },
];

/** Team members */
export const teamMembers = [
  {
    name: 'Arun',
    initials: 'A',
    role: 'Full Stack Developer',
    color: 'from-teal-500 to-teal-700',
    contribution: 'Backend architecture, API design & database modelling',
  },
  {
    name: 'Ishanth',
    initials: 'I',
    role: 'Frontend Developer',
    color: 'from-navy-500 to-navy-700',
    contribution: 'React UI, Recharts visualizations & responsive design',
  },
  {
    name: 'Hariesh Murughavel',
    initials: 'HM',
    role: 'Data & ML Engineer',
    color: 'from-amber-500 to-amber-700',
    contribution: 'Inflation forecasting, expense categorization & CPI integration',
  },
];

/** Persona cards */
export const personas = [
  {
    icon: '👔',
    title: 'Salaried Employee',
    scenario: 'Track every rupee of your fixed salary, plan EMI payments, and grow your savings with automatic 50/30/20 splits.',
    color: 'border-teal-400',
  },
  {
    icon: '🏠',
    title: 'Family Household',
    scenario: 'Manage shared expenses for groceries, utilities, school fees and insurance under one unified view.',
    color: 'border-blue-400',
  },
  {
    icon: '💻',
    title: 'Freelancer',
    scenario: 'Plan a safe monthly budget from irregular income and keep a buffer for low months.',
    color: 'border-amber-400',
  },
  {
    icon: '🌅',
    title: 'Retiree',
    scenario: 'Know exactly how long savings last with inflation-adjusted projections and medical expense planning.',
    color: 'border-purple-400',
  },
];

/** Tech stack */
export const techStack = {
  Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts / Chart.js'],
  Backend: ['FastAPI', 'Python 3.11'],
  Data: ['SQLite / PostgreSQL', 'Pandas', 'NumPy'],
  Prediction: ['scikit-learn', 'Prophet', 'CPI / RBI Data'],
  Automation: ['cron / Celery', 'REST APIs'],
  'Security & Deploy': ['JWT Auth', 'Docker', 'Render'],
};

/** Metrics for Goals section */
export const metrics = [
  { value: '< 5 min', label: 'Setup time', icon: '⚡' },
  { value: '10–15%', label: 'Forecast accuracy range', icon: '🎯' },
  { value: '90%+', label: 'Auto-categorization accuracy', icon: '🤖' },
  { value: '0', label: 'Finance jargon required', icon: '📖' },
];

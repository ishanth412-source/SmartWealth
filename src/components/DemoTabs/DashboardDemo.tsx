// ────────────────────────────────────────────────────────────────────────────
// DemoTabs/DashboardDemo.tsx – Interactive Finance Dashboard demo tab
// ────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import { Plus, Upload, TrendingUp, Wallet, ArrowDownCircle, Percent } from 'lucide-react';
import { formatINR, autoCategorize } from '../../utils/utils';
import { expenseCategories, incomeExpenseData, savingsTrend, sampleTransactions } from '../../data/mockData';

type Transaction = {
  date: string;
  description: string;
  amount: number;
  type: string;
  category: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  'Housing / Rent': '#14b8a6',
  'Food & Dining': '#f59e0b',
  'Transport': '#6366f1',
  'Entertainment': '#ec4899',
  'Utilities': '#84cc16',
  'Medical': '#f97316',
  'Shopping': '#8b5cf6',
  'EMI': '#0ea5e9',
  'Income': '#22c55e',
  'Insurance': '#64748b',
  'Investments': '#a78bfa',
  'Other': '#94a3b8',
};

interface SummaryCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}

function SummaryCard({ icon, label, value, sub, color }: SummaryCardProps) {
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
        <p className="text-xl font-bold tabular-nums text-navy-900 dark:text-white">{value}</p>
        {sub && <p className="text-xs text-slate-400 dark:text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

export default function DashboardDemo() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pieData, setPieData] = useState(expenseCategories);
  const [barData, setBarData] = useState(incomeExpenseData);
  const [lineData, setLineData] = useState(savingsTrend);
  const [csvLoaded, setCsvLoaded] = useState(false);

  // Add expense form state
  const [form, setForm] = useState({ amount: '', category: 'Food & Dining', date: '' });
  const [formError, setFormError] = useState('');

  const categories = Object.keys(CATEGORY_COLORS).filter(c => c !== 'Income');

  function handleAddExpense(e: React.FormEvent) {
    e.preventDefault();
    const amt = parseFloat(form.amount);
    if (!amt || amt <= 0) { setFormError('Enter a valid amount'); return; }
    if (!form.date) { setFormError('Select a date'); return; }
    setFormError('');

    // Add to transactions list
    const newTx: Transaction = {
      date: form.date,
      description: `Manual – ${form.category}`,
      amount: -amt,
      type: 'expense',
      category: form.category,
    };
    setTransactions(prev => [newTx, ...prev]);

    // Update pie chart data
    setPieData(prev => {
      const idx = prev.findIndex(c => c.name === form.category);
      if (idx >= 0) {
        return prev.map((c, i) => i === idx ? { ...c, value: c.value + amt } : c);
      }
      return [...prev, { name: form.category, value: amt, color: CATEGORY_COLORS[form.category] ?? '#94a3b8' }];
    });

    // Update last month bar data
    setBarData(prev => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        expenses: updated[updated.length - 1].expenses + amt,
        savings: Math.max(0, updated[updated.length - 1].savings - amt),
      };
      return updated;
    });

    setForm({ amount: '', category: 'Food & Dining', date: '' });
  }

  function handleLoadCSV() {
    setTransactions(sampleTransactions);
    // Recompute pie from CSV
    const catMap: Record<string, number> = {};
    sampleTransactions.filter(t => t.type === 'expense').forEach(t => {
      catMap[t.category] = (catMap[t.category] ?? 0) + Math.abs(t.amount);
    });
    const newPie = Object.entries(catMap).map(([name, value]) => ({
      name, value, color: CATEGORY_COLORS[name] ?? '#94a3b8',
    }));
    setPieData(newPie);
    setCsvLoaded(true);

    // Add an extra month to bar data to simulate loaded data
    setBarData(prev => [...prev.slice(1), { month: 'Oct', income: 110000, expenses: 75000, savings: 35000 }]);
    setLineData(prev => [...prev, { month: 'Oct', savings: 193000 }]);
  }

  const totalExpenses = pieData.reduce((s, c) => s + c.value, 0);
  const totalIncome = barData.reduce((s, m) => s + m.income, 0) / barData.length;
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses / barData.length) / totalIncome * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl px-4 py-2.5 text-xs text-blue-700 dark:text-blue-300 text-center">
        ⚠️ Illustrative prototype using sample data. Not financial advice.
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          label="Net Worth"
          value="₹4,82,500"
          sub="↑ 12% this month"
          color="bg-gradient-to-br from-teal-500 to-teal-700"
        />
        <SummaryCard
          icon={<Wallet className="w-5 h-5 text-white" />}
          label="Monthly Income"
          value={formatINR(Math.round(totalIncome))}
          color="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <SummaryCard
          icon={<ArrowDownCircle className="w-5 h-5 text-white" />}
          label="Monthly Expenses"
          value={formatINR(Math.round(totalExpenses / barData.length))}
          color="bg-gradient-to-br from-amber-500 to-amber-700"
        />
        <SummaryCard
          icon={<Percent className="w-5 h-5 text-white" />}
          label="Savings Rate"
          value={`${savingsRate.toFixed(1)}%`}
          sub="Target: 20%+"
          color="bg-gradient-to-br from-purple-500 to-purple-700"
        />
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie chart */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Expense Breakdown</h3>
          <div className="flex items-center gap-4">
            <div className="w-40 h-40 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={62} dataKey="value" strokeWidth={2} stroke="transparent">
                    {pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatINR(v)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-1.5 overflow-y-auto max-h-36">
              {pieData.map(d => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-slate-600 dark:text-slate-400 truncate flex-1">{d.name}</span>
                  <span className="font-medium tabular-nums text-slate-700 dark:text-slate-300">{formatINR(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Income vs Expenses</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="income" name="Income" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="expenses" name="Expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Savings trend */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Savings Trend (Cumulative ₹)</h3>
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatINR(v)} />
            <Line type="monotone" dataKey="savings" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4, fill: '#14b8a6' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add expense form + CSV loader */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Add expense */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-teal-500" /> Add Expense
          </h3>
          <form onSubmit={handleAddExpense} className="space-y-3">
            <div>
              <label htmlFor="exp-amount" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Amount (₹)</label>
              <input
                id="exp-amount"
                type="number"
                min="1"
                placeholder="e.g. 450"
                className="input-field"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="exp-cat" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Category</label>
              <select
                id="exp-cat"
                className="input-field"
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="exp-date" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Date</label>
              <input
                id="exp-date"
                type="date"
                className="input-field"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
            {formError && <p className="text-xs text-rose-500">{formError}</p>}
            <button type="submit" className="btn-primary w-full justify-center text-sm">
              <Plus className="w-4 h-4" /> Add to Dashboard
            </button>
          </form>
        </div>

        {/* Transaction list + CSV button */}
        <div className="card p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Upload className="w-4 h-4 text-teal-500" /> Transactions
            </h3>
            <button
              onClick={handleLoadCSV}
              disabled={csvLoaded}
              className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all duration-200
                ${csvLoaded
                  ? 'bg-slate-100 dark:bg-navy-800 text-slate-400 cursor-not-allowed'
                  : 'btn-primary text-xs px-3 py-1.5'}`}
            >
              {csvLoaded ? '✓ CSV Loaded' : 'Load Sample CSV'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto max-h-56 space-y-2">
            {transactions.length === 0 ? (
              <div className="text-center text-sm text-slate-400 dark:text-slate-500 py-8">
                <Upload className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>Add an expense or load sample CSV</p>
              </div>
            ) : (
              transactions.map((tx, i) => (
                <div key={i} className="flex items-center gap-3 text-xs py-2 border-b border-slate-100 dark:border-navy-800 last:border-0">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: CATEGORY_COLORS[tx.category] ?? '#94a3b8' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-700 dark:text-slate-300 truncate">{tx.description}</p>
                    <p className="text-slate-400 dark:text-slate-500">{tx.category} · {tx.date}</p>
                  </div>
                  <span className={`font-semibold tabular-nums ${tx.amount > 0 ? 'text-teal-600 dark:text-teal-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatINR(Math.abs(tx.amount))}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

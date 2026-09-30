// ────────────────────────────────────────────────────────────────────────────
// DemoTabs/InflationDemo.tsx – Inflation-Aware Planning demo tab
// ────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { formatINR, futureValue, realValue } from '../../utils/utils';
import { inflationCategories } from '../../data/mockData';

interface InflationCategory {
  key: string;
  label: string;
  rate: number;
  monthlyBudget: number;
  icon: string;
}

export default function InflationDemo() {
  const [years, setYears] = useState(5);
  const [incomeGrowth, setIncomeGrowth] = useState(6);
  const [salary, setSalary] = useState(95000);
  const [cats, setCats] = useState<InflationCategory[]>(inflationCategories);

  // Weighted average inflation
  const totalBudget = cats.reduce((s, c) => s + c.monthlyBudget, 0);
  const weightedInflation = cats.reduce((s, c) => s + c.rate * (c.monthlyBudget / totalBudget), 0);
  const isLagging = incomeGrowth < weightedInflation;

  // Grouped bar chart data: today vs future per category
  const barData = useMemo(() =>
    cats.map(c => ({
      category: c.label.split(' /')[0], // short name
      today: c.monthlyBudget,
      future: futureValue(c.monthlyBudget, c.rate, years),
    })),
    [cats, years]
  );

  // Real value of savings over time (line chart: year 0..10)
  const savings = 162000;
  const lineData = useMemo(() =>
    Array.from({ length: years + 1 }, (_, yr) => ({
      year: `Y${yr}`,
      nominal: savings,
      real: realValue(savings, weightedInflation, yr),
    })),
    [years, weightedInflation]
  );

  function updateRate(key: string, newRate: number) {
    setCats(prev => prev.map(c => c.key === key ? { ...c, rate: newRate } : c));
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl px-4 py-2.5 text-xs text-blue-700 dark:text-blue-300 text-center">
        ⚠️ Illustrative prototype using sample data. Not financial advice.
      </div>

      {/* Alert banner */}
      {isLagging && (
        <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700/60 rounded-2xl px-5 py-4 animate-fade-in">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 dark:text-amber-300">
              ⚠️ Your income growth ({incomeGrowth}%) is lower than weighted inflation ({weightedInflation.toFixed(1)}%)!
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
              In {years} years, your ₹{(salary / 1000).toFixed(0)}K salary will have the purchasing power of{' '}
              <strong>{formatINR(realValue(salary, weightedInflation - incomeGrowth, years))}</strong> in today's money.
              Consider negotiating a raise or cutting variable expenses.
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Global Settings</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="infl-salary" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly Salary (₹)</label>
            <input
              id="infl-salary"
              type="number"
              className="input-field"
              value={salary}
              onChange={e => setSalary(Math.max(1, +e.target.value))}
            />
          </div>
          <div>
            <label htmlFor="infl-growth" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Expected Income Growth (% p.a.) — <span className="tabular-nums font-medium">{incomeGrowth}%</span>
            </label>
            <input
              id="infl-growth"
              type="range"
              min={0}
              max={25}
              value={incomeGrowth}
              onChange={e => setIncomeGrowth(+e.target.value)}
              className="w-full mt-1"
              style={{ accentColor: '#14b8a6' }}
              aria-label="Income growth rate"
            />
          </div>
          <div>
            <label htmlFor="infl-years" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Years to Project — <span className="tabular-nums font-medium">{years} yr</span>
            </label>
            <input
              id="infl-years"
              type="range"
              min={1}
              max={10}
              value={years}
              onChange={e => setYears(+e.target.value)}
              className="w-full mt-1"
              style={{ accentColor: '#f59e0b' }}
              aria-label="Projection years"
            />
          </div>
        </div>
      </div>

      {/* Per-category sliders */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Per-Category Inflation Rate</h3>
        <div className="space-y-5">
          {cats.map(cat => (
            <div key={cat.key}>
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor={`cat-${cat.key}`} className="flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400">
                  <span>{cat.icon}</span> {cat.label}
                </label>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
                  <span className="tabular-nums">{cat.rate}% p.a.</span>
                  <span className="tabular-nums">
                    {formatINR(cat.monthlyBudget)} → <span className="text-rose-500 font-semibold">{formatINR(futureValue(cat.monthlyBudget, cat.rate, years))}</span>
                  </span>
                </div>
              </div>
              <input
                id={`cat-${cat.key}`}
                type="range"
                min={0}
                max={25}
                value={cat.rate}
                onChange={e => updateRate(cat.key, +e.target.value)}
                className="w-full"
                style={{ accentColor: '#f59e0b' }}
                aria-label={`${cat.label} inflation rate`}
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Weighted avg inflation: <strong className={`tabular-nums ${isLagging ? 'text-amber-500' : 'text-teal-500'}`}>{weightedInflation.toFixed(1)}%</strong>
        </p>
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Grouped bar: today vs future */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">
            Today's Budget vs {years}-Year Future Budget
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="today" name="Today" fill="#14b8a6" radius={[4, 4, 0, 0]} maxBarSize={20} />
              <Bar dataKey="future" name={`In ${years}yr`} fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Real value of savings line */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Real Value of ₹1,62,000 Savings
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            How inflation erodes your purchasing power over time
          </p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="nominal" name="Nominal (₹)" stroke="#14b8a6" strokeWidth={2} dot={false} strokeDasharray="6 4" />
              <Line type="monotone" dataKey="real" name="Real Value" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

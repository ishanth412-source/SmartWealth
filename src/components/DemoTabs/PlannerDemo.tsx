// ────────────────────────────────────────────────────────────────────────────
// DemoTabs/PlannerDemo.tsx – Interactive Finance Planner demo tab
// ────────────────────────────────────────────────────────────────────────────
import { useState, useMemo } from 'react';
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  LineChart, Line, CartesianGrid, XAxis, YAxis,
} from 'recharts';
import { Target, Plus, Trash2, Sparkles } from 'lucide-react';
import { formatINR, daysLeftInMonth, futureValue } from '../../utils/utils';
import { MONTHS } from '../../data/mockData';

interface Goal {
  id: number;
  name: string;
  target: number;
  deadline: string; // YYYY-MM
  saved: number;
}

const SPLIT_COLORS = ['#14b8a6', '#f59e0b', '#6366f1'];

export default function PlannerDemo() {
  const [salary, setSalary] = useState(95000);
  const [funds, setFunds] = useState(162000);
  const [needsPct, setNeedsPct] = useState(50);
  const [wantsPct, setWantsPct] = useState(30);
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: 'Emergency Fund', target: 300000, deadline: '2025-06', saved: 162000 },
    { id: 2, name: 'Europe Trip', target: 150000, deadline: '2025-03', saved: 20000 },
  ]);
  const [newGoal, setNewGoal] = useState({ name: '', target: '', deadline: '' });

  const savingsPct = Math.max(0, 100 - needsPct - wantsPct);
  const needsAmt = Math.round(salary * needsPct / 100);
  const wantsAmt = Math.round(salary * wantsPct / 100);
  const savingsAmt = Math.round(salary * savingsPct / 100);

  const splitData = [
    { name: `Needs (${needsPct}%)`, value: needsPct, color: SPLIT_COLORS[0] },
    { name: `Wants (${wantsPct}%)`, value: wantsPct, color: SPLIT_COLORS[1] },
    { name: `Savings (${savingsPct}%)`, value: savingsPct, color: SPLIT_COLORS[2] },
  ];

  // Safe to spend: discretionary budget ÷ days left
  const daysLeft = daysLeftInMonth();
  const safeToSpendDaily = Math.max(0, Math.round(wantsAmt / 30 * daysLeft / daysLeft));

  // 12-month forecast (salary with 5% annual growth, expenses = needs + wants)
  const forecastData = useMemo(() => {
    return MONTHS.map((month, i) => {
      const projectedSalary = Math.round(salary * Math.pow(1 + 0.05 / 12, i));
      const projectedExpenses = needsAmt + wantsAmt;
      const projectedSavings = projectedSalary - projectedExpenses;
      return { month, salary: projectedSalary, expenses: projectedExpenses, savings: projectedSavings };
    });
  }, [salary, needsAmt, wantsAmt]);

  function handleNeedsChange(val: number) {
    setNeedsPct(val);
    if (val + wantsPct > 100) setWantsPct(100 - val);
  }

  function handleWantsChange(val: number) {
    setWantsPct(val);
    if (needsPct + val > 100) setNeedsPct(100 - val);
  }

  function addGoal() {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) return;
    setGoals(prev => [...prev, {
      id: Date.now(),
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      deadline: newGoal.deadline,
      saved: 0,
    }]);
    setNewGoal({ name: '', target: '', deadline: '' });
  }

  function removeGoal(id: number) {
    setGoals(prev => prev.filter(g => g.id !== id));
  }

  function goalProgress(goal: Goal) {
    const today = new Date();
    const [year, month] = goal.deadline.split('-').map(Number);
    const deadlineDate = new Date(year, month - 1, 1);
    const monthsLeft = Math.max(1,
      (deadlineDate.getFullYear() - today.getFullYear()) * 12 +
      (deadlineDate.getMonth() - today.getMonth())
    );
    const remaining = Math.max(0, goal.target - goal.saved);
    const monthlySaving = Math.ceil(remaining / monthsLeft);
    const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
    return { pct, monthlySaving, monthsLeft };
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700/50 rounded-xl px-4 py-2.5 text-xs text-blue-700 dark:text-blue-300 text-center">
        ⚠️ Illustrative prototype using sample data. Not financial advice.
      </div>

      {/* Inputs */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Your Numbers</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="plan-salary" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Monthly Salary (₹)
            </label>
            <input
              id="plan-salary"
              type="number"
              className="input-field"
              value={salary}
              onChange={e => setSalary(Math.max(1000, +e.target.value || 95000))}
            />
          </div>
          <div>
            <label htmlFor="plan-funds" className="block text-xs text-slate-500 dark:text-slate-400 mb-1">
              Total Funds on Hand (₹)
            </label>
            <input
              id="plan-funds"
              type="number"
              className="input-field"
              value={funds}
              onChange={e => setFunds(Math.max(0, +e.target.value || 0))}
            />
          </div>
        </div>
      </div>

      {/* Budget split */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Budget Split Sliders</h3>
          <div className="space-y-5">
            {[
              { label: 'Needs', pct: needsPct, amt: needsAmt, color: SPLIT_COLORS[0], onChange: handleNeedsChange, id: 'slider-needs' },
              { label: 'Wants', pct: wantsPct, amt: wantsAmt, color: SPLIT_COLORS[1], onChange: handleWantsChange, id: 'slider-wants' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-2">
                  <label htmlFor={s.id} className="font-medium text-slate-600 dark:text-slate-400">
                    {s.label} — <span className="tabular-nums">{s.pct}%</span>
                  </label>
                  <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">{formatINR(s.amt)}</span>
                </div>
                <input
                  id={s.id}
                  type="range"
                  min={5}
                  max={85}
                  value={s.pct}
                  onChange={e => s.onChange(+e.target.value)}
                  className="w-full"
                  style={{ accentColor: s.color }}
                  aria-label={`${s.label} percentage`}
                />
              </div>
            ))}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-600 dark:text-slate-400">Savings / EMI — <span className="tabular-nums">{savingsPct}%</span></span>
                <span className="tabular-nums font-semibold text-slate-700 dark:text-slate-300">{formatINR(savingsAmt)}</span>
              </div>
              <div className="h-2 rounded-full" style={{ background: SPLIT_COLORS[2], opacity: 0.7 }} />
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Auto-computed = 100% − Needs − Wants</p>
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="card p-5 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 self-start">Budget Donut</h3>
          <div className="w-44 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={splitData} cx="50%" cy="50%" innerRadius={44} outerRadius={70} dataKey="value" strokeWidth={2} stroke="white">
                  {splitData.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {splitData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-slate-600 dark:text-slate-400">{d.name}</span>
              </div>
            ))}
          </div>
          {/* Safe to spend */}
          <div className="mt-4 w-full bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Safe to Spend Today</span>
            </div>
            <p className="text-2xl font-bold tabular-nums text-amber-700 dark:text-amber-300">
              {formatINR(safeToSpendDaily)}
            </p>
            <p className="text-xs text-amber-500 mt-1">{daysLeft} days left in month</p>
          </div>
        </div>
      </div>

      {/* Goal planner */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-teal-500" /> Goal Planner
        </h3>

        <div className="space-y-4 mb-5">
          {goals.map(goal => {
            const { pct, monthlySaving, monthsLeft } = goalProgress(goal);
            return (
              <div key={goal.id} className="p-3 bg-slate-50 dark:bg-navy-800/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm text-slate-700 dark:text-slate-300">{goal.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      {formatINR(goal.saved)} / {formatINR(goal.target)}
                    </span>
                    <button
                      onClick={() => removeGoal(goal.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                      aria-label={`Remove goal ${goal.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-navy-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>{pct}% complete</span>
                  <span>Need {formatINR(monthlySaving)}/mo · {monthsLeft} months left</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add goal form */}
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          <input
            id="goal-name"
            type="text"
            placeholder="Goal name (e.g. Vacation)"
            className="input-field"
            value={newGoal.name}
            onChange={e => setNewGoal(g => ({ ...g, name: e.target.value }))}
          />
          <input
            id="goal-target"
            type="number"
            placeholder="Target amount (₹)"
            className="input-field"
            value={newGoal.target}
            onChange={e => setNewGoal(g => ({ ...g, target: e.target.value }))}
          />
          <input
            id="goal-deadline"
            type="month"
            className="input-field"
            value={newGoal.deadline}
            onChange={e => setNewGoal(g => ({ ...g, deadline: e.target.value }))}
          />
        </div>
        <button
          onClick={addGoal}
          className="btn-primary mt-3 text-sm w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" /> Add Goal
        </button>
      </div>

      {/* 12-month forecast */}
      <div className="card p-5">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">12-Month Expense Forecast</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => formatINR(v)} />
            <Line type="monotone" dataKey="salary" name="Salary" stroke="#14b8a6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="savings" name="Savings" stroke="#6366f1" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

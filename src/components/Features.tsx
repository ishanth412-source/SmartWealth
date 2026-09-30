// @ts-nocheck
// ────────────────────────────────────────────────────────────────────────────
// Features.tsx – Feature modules (Finance Dashboard, Planning, Inflation)
// displayed as alternating rows with illustrative UI preview cards
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard, Target, TrendingUp, PieChart as PieChartIcon,
  BarChart2, Upload, Bell, Sliders, Calendar,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  Tooltip, LineChart, Line, CartesianGrid,
} from 'recharts';

// ── Mini charts for illustrative cards ────────────────────────────────────

const PIE_DATA = [
  { name: 'Rent', value: 34, color: '#14b8a6' },
  { name: 'Food', value: 19, color: '#f59e0b' },
  { name: 'EMI', value: 8, color: '#6366f1' },
  { name: 'Other', value: 39, color: '#94a3b8' },
];

const BAR_DATA = [
  { m: 'Jun', i: 85, e: 55 },
  { m: 'Jul', i: 95, e: 68 },
  { m: 'Aug', i: 95, e: 71 },
  { m: 'Sep', i: 95, e: 64 },
];

const LINE_DATA = [
  { m: 'Apr', v: 27 }, { m: 'May', v: 50 }, { m: 'Jun', v: 80 },
  { m: 'Jul', v: 107 }, { m: 'Aug', v: 131 }, { m: 'Sep', v: 162 },
];

const FORECAST_DATA = [
  { m: 'Oct', v: 64000 }, { m: 'Nov', v: 64300 }, { m: 'Dec', v: 64600 },
  { m: 'Jan', v: 64900 }, { m: 'Feb', v: 65200 }, { m: 'Mar', v: 65500 },
];

// ── Feature card previews ──────────────────────────────────────────────────

function DashboardPreview() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Net Worth</p>
          <p className="text-xl font-bold tabular-nums text-navy-900 dark:text-white">₹4,82,500</p>
        </div>
        <span className="chip-teal">↑ 12% MoM</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={PIE_DATA} innerRadius={28} outerRadius={44} dataKey="value" strokeWidth={0}>
                {PIE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={BAR_DATA} barSize={6}>
              <Bar dataKey="i" fill="#14b8a6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="e" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <XAxis dataKey="m" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap">
        {['Rent: ₹22K', 'Food: ₹12K', 'EMI: ₹5K'].map(l => (
          <span key={l} className="chip-navy text-xs">{l}</span>
        ))}
      </div>
    </div>
  );
}

function PlannerPreview() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Budget Split</p>
        <span className="text-xs text-slate-500 dark:text-slate-400">₹95,000 / mo</span>
      </div>
      <div className="space-y-2">
        {[
          { label: 'Needs (50%)', val: 47500, color: 'bg-teal-500', pct: 50 },
          { label: 'Wants (30%)', val: 28500, color: 'bg-amber-400', pct: 30 },
          { label: 'Savings (20%)', val: 19000, color: 'bg-blue-500', pct: 20 },
        ].map(row => (
          <div key={row.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-600 dark:text-slate-400">{row.label}</span>
              <span className="font-medium tabular-nums text-slate-700 dark:text-slate-300">₹{row.val.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
              <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-3 py-2 text-center">
        <p className="text-xs text-amber-600 dark:text-amber-400">Safe to spend today</p>
        <p className="text-xl font-bold tabular-nums text-amber-700 dark:text-amber-300">₹1,240</p>
      </div>
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={FORECAST_DATA}>
            <Line type="monotone" dataKey="v" stroke="#14b8a6" strokeWidth={2} dot={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="m" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v: number) => `₹${v.toLocaleString('en-IN')}`} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function InflationPreview() {
  return (
    <div className="card p-5 space-y-4">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-3 py-2 flex items-center gap-2">
        <Bell className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
          Inflation (8.2%) outpacing income growth (6%). Review budget!
        </p>
      </div>
      {[
        { label: 'Rent', rate: 8, today: '₹22K', future: '₹32.1K' },
        { label: 'Fuel', rate: 10, today: '₹6K', future: '₹9.8K' },
        { label: 'Groceries', rate: 6, today: '₹12K', future: '₹16.4K' },
      ].map(row => (
        <div key={row.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-600 dark:text-slate-400">{row.label} · {row.rate}% p.a.</span>
            <span className="text-slate-500 dark:text-slate-400">{row.today} → <span className="text-rose-500 font-semibold">{row.future}</span></span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-navy-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-400 rounded-full" style={{ width: `${row.rate * 7}%` }} />
          </div>
        </div>
      ))}
      <div className="h-20">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={LINE_DATA}>
            <Line type="monotone" dataKey="v" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="m" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Main module definitions ────────────────────────────────────────────────

const MODULES = [
  {
    id: 'dashboard',
    icon: LayoutDashboard,
    badge: 'Module 1',
    title: 'Finance Dashboard',
    tagline: 'Everything in one view',
    description:
      'Aggregate your savings, expenses, salary, investments, insurance and EMI in a single, beautiful dashboard. Upload a CSV or add entries manually — the dashboard auto-categorizes and visualizes instantly.',
    highlights: [
      { icon: PieChartIcon, text: 'Pie, bar and trend charts' },
      { icon: BarChart2, text: 'Monthly income vs expense' },
      { icon: Upload, text: 'CSV upload + auto-categorization' },
      { icon: TrendingUp, text: 'Net worth & savings trend' },
    ],
    preview: <DashboardPreview />,
    accent: 'teal',
  },
  {
    id: 'planner',
    icon: Target,
    badge: 'Module 2',
    title: 'Finance Planning',
    tagline: 'Your money, your rules',
    description:
      'Enter your monthly salary and total funds. SmartWealth auto-splits into Needs / Wants / Savings / EMI and tells you exactly how much you can safely spend each day. Set goals and track progress in real time.',
    highlights: [
      { icon: Sliders, text: 'Editable 50/30/20 budget sliders' },
      { icon: Calendar, text: 'Goal planner with timeline' },
      { icon: TrendingUp, text: '12-month expense forecast' },
      { icon: Bell, text: 'Safe-to-spend daily figure' },
    ],
    preview: <PlannerPreview />,
    accent: 'amber',
  },
  {
    id: 'inflation',
    icon: TrendingUp,
    badge: 'Module 3',
    title: 'Inflation-Aware Planning',
    tagline: 'What costs ₹100 today costs ₹148 in 5 years',
    description:
      'Slide inflation rates per category — rent, fuel, groceries, medical, education. See how today's budget looks 1–10 years from now, track the real value of your savings, and get amber alerts when income growth lags inflation.',
    highlights: [
      { icon: Sliders, text: 'Per-category inflation sliders' },
      { icon: BarChart2, text: 'Today vs future grouped bar chart' },
      { icon: TrendingUp, text: 'Real value of savings over time' },
      { icon: Bell, text: 'Inflation-lag alert banner' },
    ],
    preview: <InflationPreview />,
    accent: 'rose',
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useScrollReveal();

  const mod = MODULES[activeTab];

  return (
    <section
      id="features"
      ref={ref as React.RefObject<HTMLElement>}
      className="fade-section py-20 bg-slate-50 dark:bg-navy-950"
      aria-label="Features"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">Core Modules</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Three modules, one <span className="gradient-text">complete picture</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            From raw transactions to inflation-adjusted forecasts — all in a clean, friendly interface.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div
            className="inline-flex gap-1 bg-slate-100 dark:bg-navy-900 rounded-2xl p-1"
            role="tablist"
            aria-label="Feature modules"
          >
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={activeTab === i}
                  aria-controls={`panel-${m.id}`}
                  id={`tab-${m.id}`}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${activeTab === i ? 'tab-active' : 'tab-inactive'}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{m.title}</span>
                  <span className="sm:hidden">{m.badge.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content panel */}
        <div
          id={`panel-${mod.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${mod.id}`}
          className="grid lg:grid-cols-2 gap-10 items-center animate-fade-in"
          key={mod.id}
        >
          {/* Text */}
          <div className={activeTab === 1 ? 'lg:order-2' : ''}>
            <span className="chip-teal mb-3 inline-flex">{mod.badge}</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white mt-2 mb-2">
              {mod.title}
            </h3>
            <p className="text-teal-600 dark:text-teal-400 font-medium mb-4 italic">{mod.tagline}</p>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{mod.description}</p>
            <ul className="space-y-3">
              {mod.highlights.map(h => {
                const HIcon = h.icon;
                return (
                  <li key={h.text} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                      <HIcon className="w-4 h-4 text-teal-500" />
                    </div>
                    {h.text}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preview card */}
          <div className={activeTab === 1 ? 'lg:order-1' : ''}>
            {mod.preview}
          </div>
        </div>
      </div>
    </section>
  );
}

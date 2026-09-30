// ────────────────────────────────────────────────────────────────────────────
// Hero.tsx – Landing hero section with floating dashboard mockup
// ────────────────────────────────────────────────────────────────────────────
import { ArrowRight, PlayCircle, TrendingUp, ShieldCheck, Sparkles } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const MINI_PIE_DATA = [
  { name: 'Savings', value: 20, color: '#14b8a6' },
  { name: 'Needs', value: 50, color: '#6366f1' },
  { name: 'Wants', value: 30, color: '#f59e0b' },
];

/** Floating dashboard mockup card shown in the hero */
function DashboardMockup() {
  return (
    <div className="relative animate-float">
      {/* Glow behind */}
      <div className="absolute -inset-4 bg-gradient-to-br from-teal-400/20 to-navy-500/20 rounded-3xl blur-2xl" />

      <div className="relative card p-5 w-full max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Net Worth</p>
            <p className="text-2xl font-bold tabular-nums text-navy-900 dark:text-white">₹4,82,500</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Mini stats row */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: 'Income', val: '₹95K', color: 'text-teal-600 dark:text-teal-400' },
            { label: 'Spent', val: '₹64K', color: 'text-slate-600 dark:text-slate-300' },
            { label: 'Saved', val: '₹31K', color: 'text-blue-600 dark:text-blue-400' },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 dark:bg-navy-800/60 rounded-xl p-2 text-center">
              <p className={`text-sm font-bold tabular-nums ${s.color}`}>{s.val}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pie chart */}
        <div className="flex items-center gap-3">
          <div className="w-20 h-20 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={MINI_PIE_DATA} cx="50%" cy="50%" innerRadius={22} outerRadius={38} dataKey="value" strokeWidth={0}>
                  {MINI_PIE_DATA.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {MINI_PIE_DATA.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                <span className="text-xs text-slate-600 dark:text-slate-400">{d.name}</span>
                <span className="ml-auto text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safe to spend chip */}
        <div className="mt-4 flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-xl px-3 py-2">
          <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <p className="text-sm font-semibold text-amber-700 dark:text-amber-300">
            Safe to spend today: <span className="tabular-nums">₹1,240</span>
          </p>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg animate-pulse-slow">
        ↑ 12%
      </div>
      <div className="absolute -bottom-3 -left-3 chip-teal shadow-lg">
        <ShieldCheck className="w-3 h-3" /> Inflation-proof
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="SmartWealth hero"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-teal-50/30 to-navy-50/20 dark:from-navy-950 dark:via-navy-900 dark:to-teal-950/20" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-teal-300/20 dark:bg-teal-800/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-navy-300/20 dark:bg-navy-800/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left animate-slide-up">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 chip-teal mb-6 text-sm">
            <Sparkles className="w-3.5 h-3.5" />
            By Team Cool Techiez • Inflation-aware forecasting
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-navy-900 dark:text-white mb-6">
            Your salary,{' '}
            <span className="gradient-text">planned.</span>
            <br />
            Your future,{' '}
            <span className="gradient-text-amber">inflation-proofed.</span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
            One dashboard for savings, expenses, investments, insurance and EMI.
          </p>
          <p className="text-base text-slate-500 dark:text-slate-400 mb-8 italic">
            "Know what you can spend today, and what is coming tomorrow."
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="#demo" className="btn-amber text-base">
              <PlayCircle className="w-5 h-5" />
              Try the Demo
            </a>
            <a href="#features" className="btn-secondary text-base">
              See Features
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Social proof row */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            {[
              '🏆 Built for India',
              '📊 Recharts-powered',
              '🔒 No data shared',
            ].map(badge => (
              <span key={badge} className="text-sm text-slate-500 dark:text-slate-400">{badge}</span>
            ))}
          </div>
        </div>

        {/* Floating mockup */}
        <div className="flex justify-center lg:justify-end">
          <DashboardMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
        <span className="text-xs text-slate-400">Scroll down</span>
        <div className="w-5 h-8 border-2 border-slate-300 dark:border-navy-600 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-teal-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}

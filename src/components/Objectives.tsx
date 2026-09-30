// ────────────────────────────────────────────────────────────────────────────
// Objectives.tsx – Problem/objectives strip with five icon cards
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { Layers, BarChart2, CalendarCheck, TrendingUp, ShieldCheck } from 'lucide-react';

const OBJECTIVES = [
  {
    icon: Layers,
    title: 'Unify',
    description: 'Bring salary, expenses, investments, insurance and EMIs into one place.',
    color: 'text-teal-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
  },
  {
    icon: BarChart2,
    title: 'Visualize',
    description: 'See spending patterns with clear, interactive charts — not spreadsheets.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: CalendarCheck,
    title: 'Plan',
    description: 'Auto-split income, set savings goals, and know your safe daily spend.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: TrendingUp,
    title: 'Predict',
    description: '12-month expense forecasts with CPI data from India's official sources.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: ShieldCheck,
    title: 'Protect',
    description: 'Get amber alerts before inflation erodes your income and lifestyle.',
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
  },
];

export default function Objectives() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="objectives"
      ref={ref}
      className="fade-section py-16 bg-gradient-to-r from-navy-800 to-teal-800 dark:from-navy-950 dark:to-teal-950"
      aria-label="Objectives"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-teal-200 uppercase tracking-widest mb-8">
          Why SmartWealth?
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {OBJECTIVES.map(obj => {
            const Icon = obj.icon;
            return (
              <div
                key={obj.title}
                className="flex flex-col items-center text-center gap-3 p-5 rounded-2xl bg-white/10 backdrop-blur-sm
                           border border-white/20 hover:bg-white/15 transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl ${obj.bg} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${obj.color}`} />
                </div>
                <h3 className="font-bold text-white">{obj.title}</h3>
                <p className="text-xs text-teal-100 leading-relaxed">{obj.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

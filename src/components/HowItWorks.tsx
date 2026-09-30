// ────────────────────────────────────────────────────────────────────────────
// HowItWorks.tsx – Horizontal flow diagram: Input → Plan → Dashboard
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { Upload, Sparkles, Database, Brain, Target, LayoutDashboard, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    title: 'Input',
    description: 'Add transactions manually or upload your bank CSV.',
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
  {
    icon: Sparkles,
    title: 'Clean & Categorize',
    description: 'AI auto-labels each entry (Swiggy → Food, Uber → Transport).',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Database,
    title: 'Store',
    description: 'Normalized and structured for fast, private querying.',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
  {
    icon: Brain,
    title: 'Predict',
    description: 'ML models forecast next 12 months adjusted for CPI data.',
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    icon: Target,
    title: 'Plan',
    description: '50/30/20 budget split, goal timelines, safe-to-spend figure.',
    color: 'from-rose-400 to-rose-600',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard & Alerts',
    description: 'Beautiful charts, net worth, and inflation-lag alerts.',
    color: 'from-navy-400 to-teal-600',
    bg: 'bg-slate-50 dark:bg-navy-800/50',
    iconColor: 'text-teal-600 dark:text-teal-400',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="fade-section py-20 bg-slate-50 dark:bg-navy-950"
      aria-label="How SmartWealth works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">Simple Process</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Six steps from raw transactions to a complete, inflation-aware financial plan.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col lg:flex-row items-center w-full lg:w-auto lg:flex-1">
                {/* Card */}
                <div className={`w-full lg:w-auto flex-1 flex flex-col items-center text-center p-5 rounded-2xl ${step.bg} border border-slate-200/60 dark:border-navy-800/60 hover:-translate-y-1 transition-transform duration-200`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
                    Step {i + 1}
                  </span>
                  <h3 className="font-bold text-sm text-navy-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                {/* Arrow */}
                {i < STEPS.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-300 dark:text-navy-700 flex-shrink-0 rotate-90 lg:rotate-0 my-2 lg:my-0 lg:mx-2" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

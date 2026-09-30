// ────────────────────────────────────────────────────────────────────────────
// InteractiveDemo.tsx – Full interactive demo section with three tabs
// ────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, Target, TrendingUp } from 'lucide-react';
import DashboardDemo from './DemoTabs/DashboardDemo';
import PlannerDemo from './DemoTabs/PlannerDemo';
import InflationDemo from './DemoTabs/InflationDemo';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: <DashboardDemo /> },
  { id: 'planner', label: 'Planner', icon: Target, component: <PlannerDemo /> },
  { id: 'inflation', label: 'Inflation', icon: TrendingUp, component: <InflationDemo /> },
];

export default function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="demo"
      ref={ref}
      className="fade-section py-20 bg-white dark:bg-navy-900"
      aria-label="Interactive demo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="chip-amber mb-3">🎮 Live Prototype</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Try the <span className="gradient-text">Interactive Demo</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Add expenses, tweak sliders, set goals — and watch all charts update in real time.
            No account needed.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="flex justify-center mb-8"
          role="tablist"
          aria-label="Demo tabs"
        >
          <div className="inline-flex gap-1 bg-slate-100 dark:bg-navy-800 rounded-2xl p-1 shadow-inner">
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`demo-tab-${tab.id}`}
                  aria-selected={activeTab === i}
                  aria-controls={`demo-panel-${tab.id}`}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${activeTab === i ? 'tab-active' : 'tab-inactive'}`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div
          key={activeTab}
          id={`demo-panel-${TABS[activeTab].id}`}
          role="tabpanel"
          aria-labelledby={`demo-tab-${TABS[activeTab].id}`}
          className="animate-fade-in"
        >
          {TABS[activeTab].component}
        </div>
      </div>
    </section>
  );
}

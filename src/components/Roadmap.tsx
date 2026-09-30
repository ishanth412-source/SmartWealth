// ────────────────────────────────────────────────────────────────────────────
// Roadmap.tsx – Timeline cards for upcoming features
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { roadmapItems } from '../data/mockData';

const STATUS_STYLES: Record<string, string> = {
  upcoming: 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
  planned: 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
};

const STATUS_LABELS: Record<string, string> = {
  upcoming: '🚀 Upcoming',
  planned: '📋 Planned',
};

export default function Roadmap() {
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
      id="roadmap"
      ref={ref}
      className="fade-section py-20 bg-white dark:bg-navy-900"
      aria-label="Product roadmap"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">What's Coming</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Product <span className="gradient-text">roadmap</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            We're building more powerful features. Here's what's next.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 to-teal-600 dark:from-teal-700 dark:to-teal-900 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-8">
            {roadmapItems.map((item, i) => (
              <div key={item.title} className={`relative flex gap-6 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-start lg:items-center`}>
                {/* Card */}
                <div className="flex-1 lg:max-w-md card p-5 hover:-translate-y-1 transition-transform duration-200 sm:ml-10 lg:ml-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_STYLES[item.status]}`}>
                      {STATUS_LABELS[item.status]}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{item.quarter}</span>
                  </div>
                  <h3 className="font-bold text-navy-900 dark:text-white mb-1">
                    {item.icon} {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.description}</p>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-6 lg:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-2 border-white dark:border-navy-900 shadow-md hidden sm:block" />

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Prototype scope note */}
        <div className="mt-12 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded-2xl text-center max-w-2xl mx-auto">
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <strong>📌 Prototype scope:</strong> This prototype does not include payments, stock trading or tax filing.
            These are planned for future production releases.
          </p>
        </div>
      </div>
    </section>
  );
}

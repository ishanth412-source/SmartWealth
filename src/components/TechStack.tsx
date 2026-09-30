// ────────────────────────────────────────────────────────────────────────────
// TechStack.tsx – Technology stack chips grouped by category
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { techStack } from '../data/mockData';

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700/50 text-teal-700 dark:text-teal-300',
  Backend: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50 text-blue-700 dark:text-blue-300',
  Data: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50 text-purple-700 dark:text-purple-300',
  Prediction: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300',
  Automation: 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-700/50 text-rose-700 dark:text-rose-300',
  'Security & Deploy': 'bg-slate-50 dark:bg-navy-800/50 border-slate-200 dark:border-navy-700 text-slate-700 dark:text-slate-300',
};

export default function TechStack() {
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
      id="tech"
      ref={ref}
      className="fade-section py-20 bg-slate-50 dark:bg-navy-950"
      aria-label="Technology stack"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">Under the Hood</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Technology <span className="gradient-text">stack</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Production-grade technologies chosen for reliability, speed and Indian ecosystem compatibility.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(techStack).map(([category, tools]) => (
            <div key={category} className="card p-5">
              <h3 className="font-bold text-sm text-navy-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 inline-block" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map(tool => (
                  <span
                    key={tool}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border ${CATEGORY_COLORS[category]}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

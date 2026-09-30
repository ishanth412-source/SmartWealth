// ────────────────────────────────────────────────────────────────────────────
// WhoItsFor.tsx – Persona cards for target users
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { personas } from '../data/mockData';

export default function WhoItsFor() {
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
      id="who"
      ref={ref}
      className="fade-section py-20 bg-white dark:bg-navy-900"
      aria-label="Who SmartWealth is for"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">Made for You</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Who it's <span className="gradient-text">for</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            SmartWealth is designed for everyday Indians — no finance degree required.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map(persona => (
            <div
              key={persona.title}
              className={`card p-6 border-t-4 ${persona.color} hover:-translate-y-2 transition-transform duration-300`}
            >
              <div className="text-4xl mb-4">{persona.icon}</div>
              <h3 className="font-bold text-lg text-navy-900 dark:text-white mb-3">{persona.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "{persona.scenario}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// GoalsMetrics.tsx – Animated metrics/badges section
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react';
import { metrics } from '../data/mockData';

interface AnimatedMetricProps {
  value: string;
  label: string;
  icon: string;
  isVisible: boolean;
}

function AnimatedMetric({ value, label, icon, isVisible }: AnimatedMetricProps) {
  return (
    <div
      className={`card p-8 text-center hover:-translate-y-1 transition-all duration-300
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: '0.1s' }}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-3xl font-extrabold tabular-nums gradient-text mb-2">{value}</p>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

export default function GoalsMetrics() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="metrics"
      ref={ref}
      className="fade-section py-20 bg-gradient-to-br from-navy-800 via-navy-900 to-teal-900 dark:from-navy-950 dark:via-navy-950 dark:to-teal-950"
      aria-label="Goals and metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip bg-white/10 text-teal-200 mb-3">Quality Bar</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
            Built to <span className="gradient-text-amber">deliver results</span>
          </h2>
          <p className="mt-3 text-teal-100/70 max-w-xl mx-auto">
            Our design targets are grounded in user research and actual CPI data.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(m => (
            <AnimatedMetric
              key={m.label}
              value={m.value}
              label={m.label}
              icon={m.icon}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

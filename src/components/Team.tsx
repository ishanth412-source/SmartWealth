// ────────────────────────────────────────────────────────────────────────────
// Team.tsx – Team Cool Techiez member cards
// ────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from 'react';
import { teamMembers } from '../data/mockData';

export default function Team() {
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
      id="team"
      ref={ref}
      className="fade-section py-20 bg-slate-50 dark:bg-navy-950"
      aria-label="Team"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="chip-teal mb-3">The Builders</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 dark:text-white mt-3">
            Team <span className="gradient-text">Cool Techiez</span>
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Three passionate developers building financial clarity for everyday Indians.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {teamMembers.map(member => (
            <div
              key={member.name}
              className="card p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center mb-4 shadow-lg text-white font-bold text-xl`}
                aria-label={`${member.name} avatar`}
              >
                {member.initials}
              </div>
              <h3 className="font-bold text-navy-900 dark:text-white text-lg">{member.name}</h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-1 mb-3">{member.role}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{member.contribution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

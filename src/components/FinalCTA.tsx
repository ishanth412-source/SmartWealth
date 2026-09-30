// ────────────────────────────────────────────────────────────────────────────
// FinalCTA.tsx – Final call-to-action and footer
// ────────────────────────────────────────────────────────────────────────────
import { PlayCircle, TrendingUp } from 'lucide-react';

export default function FinalCTA() {
  return (
    <>
      {/* CTA section */}
      <section
        id="cta"
        className="py-24 bg-gradient-to-br from-navy-800 via-teal-800 to-teal-900 dark:from-navy-950 dark:via-teal-950 dark:to-navy-950 relative overflow-hidden"
        aria-label="Call to action"
      >
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-300/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-navy-300/10 rounded-full blur-3xl" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-glow">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Know what you can{' '}
            <span className="text-amber-400">spend today.</span>
          </h2>
          <p className="text-lg text-teal-100/80 mb-3">
            And what is coming tomorrow.
          </p>
          <p className="text-sm text-teal-200/60 mb-8 italic">— SmartWealth by Team Cool Techiez</p>
          <a href="#demo" className="btn-amber text-lg px-8 py-4 inline-flex">
            <PlayCircle className="w-6 h-6" />
            Try the Demo — It's Free
          </a>
          <p className="mt-4 text-xs text-teal-200/50">
            No sign-up required · No data stored · Purely illustrative
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 dark:bg-black py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Smart<span className="gradient-text">Wealth</span></span>
            </div>

            {/* Links */}
            <nav className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              {['Features', 'Demo', "Who It's For", 'Roadmap', 'Team'].map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace(/[^a-z]/g, '')}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Copyright */}
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} SmartWealth · Team Cool Techiez
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 pt-6 border-t border-navy-800 text-center">
            <p className="text-xs text-slate-500 max-w-2xl mx-auto">
              SmartWealth is an academic / prototype project. All data shown is illustrative and for demonstration purposes only.
              This is not financial advice. Not affiliated with any bank, SEBI-registered entity, or RBI-regulated body.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

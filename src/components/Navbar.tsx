// ────────────────────────────────────────────────────────────────────────────
// Navbar.tsx – Sticky navigation bar with theme toggle
// ────────────────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { Sun, Moon, Menu, X, TrendingUp } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Try Demo' },
  { href: '#who', label: "Who It's For" },
  { href: '#roadmap', label: 'Roadmap' },
];

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-navy-950/80 backdrop-blur-md border-b border-slate-200/60 dark:border-navy-800/60 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group" aria-label="SmartWealth Home">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shadow-md group-hover:shadow-teal-400/40 transition-shadow">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-navy-900 dark:text-white">
            Smart<span className="gradient-text">Wealth</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300
                       hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:text-teal-600 dark:hover:text-teal-400
                       transition-all duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* CTA button (desktop) */}
          <a
            href="#demo"
            className="hidden md:inline-flex btn-primary text-sm px-4 py-2"
          >
            Try the Demo
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-navy-950 border-t border-slate-200 dark:border-navy-800 px-4 py-4 flex flex-col gap-3 animate-fade-in">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 py-2 border-b border-slate-100 dark:border-navy-800 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#demo" onClick={() => setMobileOpen(false)} className="btn-primary text-sm mt-1">
            Try the Demo
          </a>
        </div>
      )}
    </header>
  );
}

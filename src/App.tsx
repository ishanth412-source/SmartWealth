// ────────────────────────────────────────────────────────────────────────────
// App.tsx – SmartWealth root component
// Wires together all sections and manages the dark/light theme state
// ────────────────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';

// Layout components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Objectives from './components/Objectives';
import Features from './components/Features';
import InteractiveDemo from './components/InteractiveDemo';
import HowItWorks from './components/HowItWorks';
import WhoItsFor from './components/WhoItsFor';
import GoalsMetrics from './components/GoalsMetrics';
import TechStack from './components/TechStack';
import Roadmap from './components/Roadmap';
import Team from './components/Team';
import FinalCTA from './components/FinalCTA';

type Theme = 'dark' | 'light';

function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('sw-theme') as Theme | null;
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'dark'; // default to dark for fintech feel
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply/remove 'dark' class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sw-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-300">
      {/* 1. Sticky Navbar */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* 2. Hero */}
      <Hero />

      {/* 3. Problem / Objectives strip */}
      <Objectives />

      {/* 4. Features (three modules) */}
      <Features />

      {/* 5. Interactive Demo */}
      <InteractiveDemo />

      {/* 6. How it Works */}
      <HowItWorks />

      {/* 7. Who It's For */}
      <WhoItsFor />

      {/* 8. Goals / Metrics */}
      <GoalsMetrics />

      {/* 9. Tech Stack */}
      <TechStack />

      {/* 10. Roadmap */}
      <Roadmap />

      {/* 11. Team */}
      <Team />

      {/* 12. Final CTA + Footer */}
      <FinalCTA />
    </div>
  );
}

# SmartWealth 💰

> **"Know what you can spend today, and what is coming tomorrow."**  
> By **Team Cool Techiez**

A modern, responsive, single-page personal finance dashboard built with React + TypeScript + Tailwind CSS.

## ✨ Features

| Section | What it does |
|---|---|
| **Finance Dashboard** | Unified view of salary, expenses, investments, insurance & EMIs with pie/bar/trend charts |
| **Finance Planning** | 50/30/20 auto-split, editable sliders, goal planner, 12-month forecast, safe-to-spend daily figure |
| **Inflation-Aware Planning** | Per-category inflation sliders, today-vs-future budget bars, real value of savings, amber alert banner |
| **Interactive Demo** | Live charts, add-expense form, auto-categorization, sample CSV loader |

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS 3** (dark/light mode)
- **Recharts** (all charts)
- **lucide-react** (icons)
- **Vite 5** (build tool)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Install & Run

```bash
# Navigate to the project
cd SmartWealth

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
SmartWealth/
├── src/
│   ├── components/
│   │   ├── DemoTabs/
│   │   │   ├── DashboardDemo.tsx   # Interactive dashboard tab
│   │   │   ├── PlannerDemo.tsx     # Finance planner tab
│   │   │   └── InflationDemo.tsx   # Inflation calculator tab
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Objectives.tsx
│   │   ├── Features.tsx
│   │   ├── InteractiveDemo.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── WhoItsFor.tsx
│   │   ├── GoalsMetrics.tsx
│   │   ├── TechStack.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Team.tsx
│   │   └── FinalCTA.tsx
│   ├── data/
│   │   └── mockData.ts             # All sample data & constants
│   ├── utils/
│   │   └── utils.ts                # INR formatting, calculations
│   ├── App.tsx                     # Root component + theme management
│   ├── main.tsx
│   └── index.css                   # Global styles + Tailwind
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## ⚠️ Disclaimer

This is an illustrative prototype using sample data. **Not financial advice.**  
Prototype scope: no payments, stock trading or tax filing.

---

© 2025 SmartWealth · Team Cool Techiez

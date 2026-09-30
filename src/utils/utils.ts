// ────────────────────────────────────────────────────────────────────────────
// utils.ts – Utility helpers for SmartWealth
// ────────────────────────────────────────────────────────────────────────────

/**
 * Format a number in Indian currency format with ₹ symbol.
 * e.g. 1234567 → ₹12,34,567
 */
export function formatINR(amount: number, decimals = 0): string {
  return '₹' + amount.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a compact number (e.g. 1200000 → ₹12L, 85000 → ₹85K)
 */
export function formatINRCompact(amount: number): string {
  if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(1)}Cr`;
  if (amount >= 1_00_000) return `₹${(amount / 1_00_000).toFixed(1)}L`;
  if (amount >= 1_000) return `₹${(amount / 1_000).toFixed(0)}K`;
  return `₹${amount}`;
}

/**
 * Compute the "safe to spend today" figure:
 * remaining discretionary budget ÷ remaining days in month
 */
export function safeToSpend(monthlyDiscretionary: number, spentSoFar: number): number {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const remaining = monthlyDiscretionary - spentSoFar;
  const daysLeft = daysInMonth - today.getDate() + 1;
  return Math.max(0, Math.round(remaining / daysLeft));
}

/**
 * Calculate the future value of a budget after inflation
 */
export function futureValue(present: number, ratePercent: number, years: number): number {
  return Math.round(present * Math.pow(1 + ratePercent / 100, years));
}

/**
 * Calculate the real value of savings after inflation erosion
 */
export function realValue(nominal: number, inflationPercent: number, years: number): number {
  return Math.round(nominal / Math.pow(1 + inflationPercent / 100, years));
}

/**
 * Auto-categorize a transaction description into a category.
 * Simple keyword matching to simulate ML categorization.
 */
export function autoCategorize(description: string): string {
  const d = description.toLowerCase();
  if (/swiggy|zomato|bigbasket|d-mart|dmart|grocery|restaurant|cafe|pizza|burger|food/.test(d)) return 'Food & Dining';
  if (/uber|ola|rapido|petrol|fuel|metro|bus|train|transport/.test(d)) return 'Transport';
  if (/rent|housing|maintenance|society/.test(d)) return 'Housing / Rent';
  if (/netflix|amazon prime|hotstar|spotify|pvr|inox|cinema|entertainment/.test(d)) return 'Entertainment';
  if (/apollo|pharmeasy|1mg|medplus|hospital|doctor|medical|health/.test(d)) return 'Medical';
  if (/amazon|flipkart|myntra|meesho|shopping|mall|store/.test(d)) return 'Shopping';
  if (/bescom|bwssb|jio|airtel|vodafone|vi|water|electricity|internet|utility|recharge/.test(d)) return 'Utilities';
  if (/emi|loan|hdfc loan|icici loan|home loan|car loan/.test(d)) return 'EMI';
  if (/salary|credit|freelance|payment received/.test(d)) return 'Income';
  if (/insurance|lic|term plan/.test(d)) return 'Insurance';
  if (/mutual fund|sip|zerodha|groww|invest/.test(d)) return 'Investments';
  return 'Other';
}

/**
 * Days left in current month
 */
export function daysLeftInMonth(): number {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return daysInMonth - now.getDate() + 1;
}

/**
 * Clamp a value between min and max
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

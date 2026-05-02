// ─────────────────────────────────────────────────────────────────────────────
// CHART HELPERS
// Waterfall base/bar calculators and common chart option builders.
// ─────────────────────────────────────────────────────────────────────────────

import { chartColors } from './chartColors';

/**
 * Build waterfall chart data from income statement.
 * Returns { labels, bases, values, colors } for a stacked bar chart technique.
 *
 * Waterfall steps:
 *   Revenue → – Cost of Sales → – Direct Interest → Gross Profit
 *   → + Other Income → – Sell & Admin → – Impairment → Operating Profit
 *   → – Net Finance Cost → – VAT → – Tax → Net Profit
 */
export function buildWaterfallData(data, year = 'y25') {
  const get = (key) => (data[key] ? data[key][year] || 0 : 0);

  const revenue = get('revenue');
  const costOfSales = get('costOfSales');
  const directInterest = get('directInterest');
  const grossProfit = get('grossProfit');
  const otherIncome = get('otherIncome');
  const sellAdmin = get('sellAdmin');
  const impairment = get('impairment');
  const operatingProfit = get('operatingProfit');
  const netFinanceCost = get('netFinanceCost');
  const vatFinServices = get('vatFinServices');
  const incomeTax = get('incomeTax');
  const netProfit = get('netProfit');

  const steps = [
    { label: 'Revenue', value: revenue, type: 'total' },
    { label: 'Cost of Sales', value: -costOfSales, type: 'decrease' },
    { label: 'Direct Int.', value: -directInterest, type: 'decrease' },
    { label: 'Gross Profit', value: grossProfit, type: 'subtotal' },
    { label: 'Other Income', value: otherIncome, type: 'increase' },
    { label: 'Sell & Admin', value: -sellAdmin, type: 'decrease' },
    { label: 'Impairment', value: -impairment, type: 'decrease' },
    { label: 'Op. Profit', value: operatingProfit, type: 'subtotal' },
    { label: 'Net Fin. Cost', value: -netFinanceCost, type: 'decrease' },
    { label: 'VAT Fin. Svc', value: -vatFinServices, type: 'decrease' },
    { label: 'Income Tax', value: -incomeTax, type: 'decrease' },
    { label: 'Net Profit', value: netProfit, type: 'total' },
  ];

  // Filter out zero-value steps (e.g., company has no direct interest)
  const filtered = steps.filter(s => s.value !== 0 || s.type === 'total' || s.type === 'subtotal');

  const labels = [];
  const bases = [];
  const values = [];
  const colors = [];

  let running = 0;

  filtered.forEach((step) => {
    labels.push(step.label);

    if (step.type === 'total' || step.type === 'subtotal') {
      bases.push(0);
      values.push(step.value);
      colors.push(chartColors.singerRed);
    } else if (step.type === 'increase') {
      bases.push(running);
      values.push(step.value);
      colors.push(chartColors.green);
      running += step.value;
    } else {
      // decrease — value is negative
      const absVal = Math.abs(step.value);
      running -= absVal;
      bases.push(running);
      values.push(absVal);
      colors.push(chartColors.singerDark);
    }

    // For totals/subtotals, set running to their value
    if (step.type === 'total' || step.type === 'subtotal') {
      running = step.value;
    }
  });

  return { labels, bases, values, colors };
}

/**
 * Shared Chart.js scale options for consistent styling
 */
export function getScaleOptions(options = {}) {
  const { showX = true, showY = true, yCallback, xCallback } = options;

  const scaleBase = {
    grid: {
      color: chartColors.gridLine,
      drawBorder: false,
    },
    ticks: {
      color: chartColors.tickColor,
      font: { family: 'Inter', size: 11 },
    },
    border: {
      display: false,
    },
  };

  const scales = {};

  if (showX) {
    scales.x = {
      ...scaleBase,
      display: showX,
    };
    if (xCallback) scales.x.ticks = { ...scaleBase.ticks, callback: xCallback };
  }

  if (showY) {
    scales.y = {
      ...scaleBase,
      display: showY,
    };
    if (yCallback) scales.y.ticks = { ...scaleBase.ticks, callback: yCallback };
  }

  return scales;
}

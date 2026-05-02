// ─────────────────────────────────────────────────────────────────────────────
// NUMBER / CURRENCY FORMATTERS
// All display formatting passes through these functions.
// Values are stored in Rs. '000 — formatters handle unit conversion.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format value (in Rs. '000) to billions — e.g. "Rs. 35.9B"
 */
export function formatBillions(v) {
  const billions = v / 1_000_000;
  return `Rs. ${billions.toFixed(1)}B`;
}

/**
 * Format value (in Rs. '000) to millions — e.g. "Rs. 276.9M"
 */
export function formatMillions(v) {
  const millions = v / 1_000;
  return `Rs. ${millions.toFixed(1)}M`;
}

/**
 * Format value (in Rs. '000) with comma separators — e.g. "Rs. 3,997"
 */
export function formatThousands(v) {
  return `Rs. ${v.toLocaleString('en-US')}`;
}

/**
 * Format YoY percentage change — e.g. "+44%"
 */
export function formatChange(pct) {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${Math.round(pct)}%`;
}

/**
 * Format EPS — e.g. "Rs. 1.73"
 */
export function formatEPS(v) {
  return `Rs. ${v.toFixed(2)}`;
}

/**
 * Format share price — e.g. "Rs. 88.00"
 */
export function formatPrice(v) {
  return `Rs. ${v.toFixed(2)}`;
}

/**
 * Format margin percentage — e.g. "31.4%"
 */
export function formatMargin(numerator, denominator) {
  if (!denominator) return '0.0%';
  return `${((numerator / denominator) * 100).toFixed(1)}%`;
}

/**
 * Period label — e.g. "Q3 FY2025/26"
 */
export function formatDate() {
  return 'Q3 FY2025/26';
}

/**
 * Smart format — auto-selects B/M based on magnitude.
 * Input in Rs. '000.
 */
export function formatSmart(v) {
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return formatBillions(v);
  if (abs >= 1_000) return formatMillions(v);
  return formatThousands(v);
}

/**
 * Compute YoY change percentage
 */
export function calcYoYChange(current, prior) {
  if (!prior || prior === 0) return null;
  return ((current - prior) / Math.abs(prior)) * 100;
}

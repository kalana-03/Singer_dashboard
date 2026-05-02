// ─────────────────────────────────────────────────────────────────────────────
// CHART COLOR EXPORTS
// This is the ONLY file allowed to contain hex values.
// It mirrors tailwind.config.js colors for Chart.js canvas use.
// ─────────────────────────────────────────────────────────────────────────────

export const chartColors = {
  singerRed:     '#CC0000',
  singerDark:    '#8A0000',
  singerLight:   '#E8000F',
  green:         '#22C55E',
  red:           '#EF4444',
  blue:          '#4F8EF7',
  amber:         '#F59E0B',
  purple:        '#A855F7',
  teal:          '#14B8A6',
  slate:         '#64748B',
  prev:          '#2D3A5C',
  gridLine:      'rgba(255, 255, 255, 0.05)',
  tickColor:     '#6B7280',
  tooltipBg:     '#252A3D',
  tooltipBorder: '#CC0000',
  textPrimary:   '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted:     '#6B7280',
};

// Segment color map — maps data color keys to hex values
export const segmentColorMap = {
  'chart-red':    '#CC0000',
  'chart-blue':   '#4F8EF7',
  'chart-green':  '#22C55E',
  'chart-amber':  '#F59E0B',
  'chart-purple': '#A855F7',
  'chart-teal':   '#14B8A6',
  'chart-slate':  '#64748B',
};

// Chart.js global defaults — applied to all charts
export const chartDefaults = {
  font: {
    family: 'Inter',
    size: 11,
  },
  color: '#6B7280',
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#252A3D',
      borderColor: '#CC0000',
      borderWidth: 1,
      titleColor: '#F1F5F9',
      bodyColor: '#94A3B8',
      padding: 10,
      cornerRadius: 8,
      titleFont: { family: 'Inter', size: 12, weight: '600' },
      bodyFont: { family: 'Inter', size: 11 },
    },
  },
  scales: {
    grid: { color: 'rgba(255, 255, 255, 0.05)' },
    ticks: {
      color: '#6B7280',
      font: { family: 'Inter', size: 11 },
    },
  },
};

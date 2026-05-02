import React from 'react';
import Badge from '../ui/Badge';
import { formatSmart, formatEPS, formatChange } from '../../utils/formatters';

/**
 * KPI Card — uses .singer-card utility class.
 * accent: 'singer' (red top border) | 'positive' (green top border) | null
 */
export default function KPICard({ label, current, prior, change, accent, isEPS }) {
  const formattedCurrent = isEPS ? formatEPS(current) : formatSmart(current);
  const formattedPrior = isEPS ? formatEPS(prior) : formatSmart(prior);
  const changeText = change !== null ? formatChange(change) : null;
  const isPositiveChange = change !== null && change > 0;

  const accentBorder =
    accent === 'singer' ? 'border-t-[3px] border-t-singer-600'
    : accent === 'positive' ? 'border-t-[3px] border-t-positive'
    : '';

  return (
    <div className={`singer-card ${accentBorder} animate-fade-in`}>
      {/* Header row: label + badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-label uppercase text-text-muted tracking-widest">
          {label}
        </span>
        {changeText && (
          <Badge variant={isPositiveChange ? 'positive' : 'negative'}>
            {changeText}
          </Badge>
        )}
      </div>

      {/* Main value */}
      <div className="text-metric tabular-nums text-text-primary mb-2">
        {formattedCurrent}
      </div>

      {/* Prior year comparison */}
      <div className="text-small text-text-muted tabular-nums">
        vs {formattedPrior} prior year
      </div>
    </div>
  );
}

import React from 'react';
import Badge from '../ui/Badge';
import { formatPrice, calcYoYChange, formatChange, formatEPS } from '../../utils/formatters';

/**
 * Share Price + EPS Card
 */
export default function SharePriceCard({ sharePrice, epsData }) {
  const priceMetrics = [
    { label: 'Highest', y25: sharePrice.highest.y25, y24: sharePrice.highest.y24 },
    { label: 'Lowest',  y25: sharePrice.lowest.y25,  y24: sharePrice.lowest.y24 },
    { label: 'Last Traded', y25: sharePrice.last.y25, y24: sharePrice.last.y24 },
  ];

  return (
    <div className="singer-card animate-fade-in">
      <h3 className="text-heading text-text-primary mb-4">
        Share price — period
      </h3>

      <div className="space-y-3">
        {priceMetrics.map((m) => {
          const change = calcYoYChange(m.y25, m.y24);
          return (
            <div key={m.label} className="flex items-center justify-between">
              <div>
                <div className="text-label uppercase text-text-muted tracking-widest mb-0.5">
                  {m.label}
                </div>
                <div className="text-metric-sm tabular-nums text-text-primary">
                  {formatPrice(m.y25)}
                </div>
                <div className="text-small text-text-muted tabular-nums">
                  {formatPrice(m.y24)}
                </div>
              </div>
              {change !== null && (
                <Badge variant={change > 0 ? 'positive' : 'negative'}>
                  {formatChange(change)}
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-surface-border my-4" />

      {/* EPS Block */}
      {epsData && (
        <div>
          <div className="text-label uppercase text-text-muted tracking-widest mb-2">
            Earnings Per Share
          </div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-small text-text-muted">2025</div>
              <div className="text-metric-sm tabular-nums text-text-primary">
                {formatEPS(epsData.y25)}
              </div>
            </div>
            <div>
              <div className="text-small text-text-muted">2024</div>
              <div className="text-metric-sm tabular-nums text-text-muted">
                {formatEPS(epsData.y24)}
              </div>
            </div>
            <Badge variant="positive">
              {formatChange(calcYoYChange(epsData.y25, epsData.y24))}
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
}

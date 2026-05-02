import React from 'react';

/**
 * Custom HTML chart legend — replaces Chart.js default legend.
 * items: [{ color (hex), label }]
 */
export default function ChartLegend({ items }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-label text-text-muted">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

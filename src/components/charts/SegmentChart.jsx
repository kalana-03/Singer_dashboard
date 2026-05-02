import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { chartColors, segmentColorMap } from '../../utils/chartColors';
import { formatBillions } from '../../utils/formatters';
import ChartLegend from '../ui/ChartLegend';

Chart.register(...registerables);

/**
 * Segment Revenue — Horizontal bar chart
 * 7 segments with their assigned chart palette colors.
 * 2025 = full opacity, 2024 = 40% opacity.
 */
export default function SegmentChart({ segments }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !segments) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = segments.map(s => s.name);
    const data25 = segments.map(s => s.y25);
    const data24 = segments.map(s => s.y24);
    const colors25 = segments.map(s => segmentColorMap[s.color] || chartColors.slate);
    const colors24 = segments.map(s => {
      const hex = segmentColorMap[s.color] || chartColors.slate;
      return hex + '66'; // 40% opacity
    });

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '2025',
            data: data25,
            backgroundColor: colors25,
            borderRadius: 4,
            barPercentage: 0.75,
            categoryPercentage: 0.8,
          },
          {
            label: '2024',
            data: data24,
            backgroundColor: colors24,
            borderRadius: 4,
            barPercentage: 0.75,
            categoryPercentage: 0.8,
            borderWidth: 1,
            borderColor: colors25.map(c => c + '44'),
            borderDash: [4, 2],
          },
        ],
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: chartColors.tooltipBg,
            borderColor: chartColors.tooltipBorder,
            borderWidth: 1,
            titleColor: chartColors.textPrimary,
            bodyColor: chartColors.textSecondary,
            padding: 10,
            cornerRadius: 8,
            titleFont: { family: 'Inter', size: 12, weight: '600' },
            bodyFont: { family: 'Inter', size: 11 },
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${formatBillions(ctx.raw)}`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: chartColors.gridLine,
              drawBorder: false,
            },
            ticks: {
              color: chartColors.tickColor,
              font: { family: 'Inter', size: 11 },
              callback: (v) => formatBillions(v),
            },
            border: { display: false },
          },
          y: {
            grid: { display: false },
            ticks: {
              color: chartColors.textSecondary,
              font: { family: 'Inter', size: 12 },
            },
            border: { display: false },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [segments]);

  if (!segments) return null;

  const legendItems = segments.map(s => ({
    color: segmentColorMap[s.color] || chartColors.slate,
    label: s.name,
  }));

  return (
    <div className="singer-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-heading text-text-primary">
            Revenue by segment
          </h3>
          <p className="text-small text-text-muted mt-0.5">
            Nine months ended 31st December
          </p>
        </div>
      </div>
      <div className="relative" style={{ height: '340px' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Horizontal bar chart showing revenue by business segment"
        />
      </div>
      <ChartLegend items={[
        ...legendItems,
        { color: chartColors.prev, label: '2024 (prior year)' },
      ]} />
    </div>
  );
}

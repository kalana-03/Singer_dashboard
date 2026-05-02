import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../../utils/chartColors';
import { formatBillions } from '../../utils/formatters';
import ChartLegend from '../ui/ChartLegend';

Chart.register(...registerables);

/**
 * YoY Comparison Bar Chart — 2025 vs 2024
 * Shows Revenue, Gross Profit, Op. Profit, Net Profit side by side.
 */
export default function CompareBarChart({ comparison }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !comparison) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const labels = comparison.map(c => c.label);
    const data25 = comparison.map(c => c.y25);
    const data24 = comparison.map(c => c.y24);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: '2025',
            data: data25,
            backgroundColor: chartColors.singerRed,
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
          },
          {
            label: '2024',
            data: data24,
            backgroundColor: chartColors.prev,
            borderRadius: 4,
            barPercentage: 0.7,
            categoryPercentage: 0.7,
          },
        ],
      },
      options: {
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
            grid: { display: false },
            ticks: {
              color: chartColors.tickColor,
              font: { family: 'Inter', size: 11 },
            },
            border: { display: false },
          },
          y: {
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
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [comparison]);

  const legendItems = [
    { color: chartColors.singerRed, label: '2025' },
    { color: chartColors.prev, label: '2024' },
  ];

  return (
    <div className="singer-card animate-fade-in">
      <h3 className="text-heading text-text-primary mb-4">
        2025 vs 2024
      </h3>
      <div className="relative" style={{ height: '320px' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Bar chart comparing 2025 vs 2024 key financial metrics"
        />
      </div>
      <ChartLegend items={legendItems} />
    </div>
  );
}

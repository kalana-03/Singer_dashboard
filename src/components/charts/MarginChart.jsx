import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../../utils/chartColors';
import ChartLegend from '../ui/ChartLegend';

Chart.register(...registerables);

/**
 * Margin Analysis — Grouped bar chart
 * Gross | Operating | Net margins as percentages, 2025 vs 2024.
 */
export default function MarginChart({ margins }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !margins) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: ['Gross', 'Operating', 'Net'],
        datasets: [
          {
            label: '2025',
            data: [margins.gross.y25, margins.operating.y25, margins.net.y25],
            backgroundColor: chartColors.green,
            borderRadius: 4,
            barPercentage: 0.65,
            categoryPercentage: 0.7,
          },
          {
            label: '2024',
            data: [margins.gross.y24, margins.operating.y24, margins.net.y24],
            backgroundColor: chartColors.prev,
            borderRadius: 4,
            barPercentage: 0.65,
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
              label: (ctx) => ` ${ctx.dataset.label}: ${ctx.raw.toFixed(1)}%`,
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
              callback: (v) => `${v}%`,
            },
            border: { display: false },
            beginAtZero: true,
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
  }, [margins]);

  const legendItems = [
    { color: chartColors.green, label: '2025' },
    { color: chartColors.prev, label: '2024' },
  ];

  return (
    <div className="singer-card animate-fade-in">
      <h3 className="text-heading text-text-primary mb-4">
        Profit margins (% of revenue)
      </h3>
      <div className="relative" style={{ height: '260px' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Grouped bar chart showing gross, operating, and net profit margins"
        />
      </div>
      <ChartLegend items={legendItems} />
    </div>
  );
}

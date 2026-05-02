import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../../utils/chartColors';
import { buildWaterfallData } from '../../utils/chartHelpers';
import { formatBillions } from '../../utils/formatters';
import ChartLegend from '../ui/ChartLegend';

Chart.register(...registerables);

/**
 * Waterfall Chart — Revenue → Net Profit flow
 * Uses stacked bar technique with invisible base bars.
 */
export default function WaterfallChart({ data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    // Destroy previous instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const { labels, bases, values, colors } = buildWaterfallData(data);

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Base',
            data: bases,
            backgroundColor: 'transparent',
            borderWidth: 0,
            barPercentage: 0.6,
            categoryPercentage: 0.8,
          },
          {
            label: 'Value',
            data: values,
            backgroundColor: colors,
            borderWidth: 0,
            borderRadius: 3,
            barPercentage: 0.6,
            categoryPercentage: 0.8,
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
            filter: (item) => item.datasetIndex === 1,
            callbacks: {
              label: (ctx) => {
                const val = ctx.raw;
                return ` ${formatBillions(val)}`;
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            ticks: {
              color: chartColors.tickColor,
              font: { family: 'Inter', size: 10 },
              maxRotation: 45,
              minRotation: 45,
            },
            border: { display: false },
          },
          y: {
            stacked: true,
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
  }, [data]);

  const legendItems = [
    { color: chartColors.singerRed, label: 'Total / Subtotal' },
    { color: chartColors.green, label: 'Addition' },
    { color: chartColors.singerDark, label: 'Deduction' },
  ];

  return (
    <div className="singer-card animate-fade-in">
      <h3 className="text-heading text-text-primary mb-4">
        Revenue → Net Profit
      </h3>
      <div className="relative" style={{ height: '320px' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Waterfall chart showing revenue to net profit flow"
        />
      </div>
      <ChartLegend items={legendItems} />
    </div>
  );
}

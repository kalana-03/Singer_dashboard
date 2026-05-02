import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { chartColors } from '../../utils/chartColors';
import { formatBillions } from '../../utils/formatters';
import ChartLegend from '../ui/ChartLegend';

Chart.register(...registerables);

/**
 * Cost Breakdown — Donut (pie) chart
 * Shows cost composition: Cost of Sales, Sell & Admin, Net Finance, Impairment, Tax
 */
export default function CostBreakdown({ costBreakdown }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !costBreakdown) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const items = [
      { label: 'Cost of Sales', value: costBreakdown.costOfSales, color: chartColors.singerRed },
      { label: 'Sell & Admin',  value: costBreakdown.sellAdmin,   color: chartColors.amber },
      { label: 'Net Finance',   value: costBreakdown.netFinanceCost, color: chartColors.blue },
      { label: 'Impairment',    value: costBreakdown.impairment,  color: chartColors.purple },
      { label: 'Income Tax',    value: costBreakdown.incomeTax,   color: chartColors.slate },
    ];

    const data = {
      labels: items.map(i => i.label),
      datasets: [
        {
          data: items.map(i => i.value),
          backgroundColor: items.map(i => i.color),
          borderWidth: 0,
        },
      ],
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
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
              label: (ctx) => ` ${ctx.label}: ${formatBillions(ctx.raw)}`,
            },
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
  }, [costBreakdown]);

  if (!costBreakdown) return null;

  const legendItems = [
    { color: chartColors.singerRed, label: `Cost of Sales · ${formatBillions(costBreakdown.costOfSales)}` },
    { color: chartColors.amber,     label: `Sell & Admin · ${formatBillions(costBreakdown.sellAdmin)}` },
    { color: chartColors.blue,      label: `Net Finance · ${formatBillions(costBreakdown.netFinanceCost)}` },
    { color: chartColors.purple,    label: `Impairment · ${formatBillions(costBreakdown.impairment)}` },
    { color: chartColors.slate,     label: `Tax · ${formatBillions(costBreakdown.incomeTax)}` },
  ];

  return (
    <div className="singer-card animate-fade-in">
      <h3 className="text-heading text-text-primary mb-4">
        Cost breakdown
      </h3>
      <div className="relative pb-4" style={{ height: '200px' }}>
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Horizontal stacked bar chart showing cost breakdown"
        />
      </div>
      <ChartLegend items={legendItems} />
    </div>
  );
}

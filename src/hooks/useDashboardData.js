import { useMemo } from 'react';
import { financials } from '../data/financials';
import { useDashboardContext } from '../context/DashboardContext';
import { calcYoYChange } from '../utils/formatters';

/**
 * Central hook for all derived dashboard data.
 * All margins, ratios, YoY% are computed here via useMemo.
 */
export function useDashboardData() {
  const { period, entity } = useDashboardContext();

  const data = useMemo(() => {
    return financials[period]?.[entity] || financials.q3.group;
  }, [period, entity]);

  // KPI metrics with YoY change
  const kpis = useMemo(() => {
    const metrics = [
      { key: 'revenue',         label: 'Revenue',           accent: 'singer' },
      { key: 'grossProfit',     label: 'Gross Profit',      accent: null },
      { key: 'operatingProfit', label: 'Operating Profit',  accent: null },
      { key: 'profitBeforeTax', label: 'Profit Before Tax', accent: null },
      { key: 'netProfit',       label: 'Net Profit',        accent: 'positive' },
      { key: 'eps',             label: 'EPS',               accent: null, isEPS: true },
    ];

    return metrics
      .filter(m => data[m.key])
      .map(m => {
        const current = data[m.key].y25;
        const prior = data[m.key].y24;
        const change = calcYoYChange(current, prior);
        return {
          ...m,
          current,
          prior,
          change,
        };
      });
  }, [data]);

  // Margins (as percentages)
  const margins = useMemo(() => {
    if (!data.revenue || !data.grossProfit) return null;

    const rev25 = data.revenue.y25;
    const rev24 = data.revenue.y24;

    return {
      gross:     { y25: (data.grossProfit.y25 / rev25) * 100,     y24: data.grossProfit.y24 ? (data.grossProfit.y24 / rev24) * 100 : 0 },
      operating: { y25: data.operatingProfit ? (data.operatingProfit.y25 / rev25) * 100 : 0, y24: data.operatingProfit?.y24 ? (data.operatingProfit.y24 / rev24) * 100 : 0 },
      net:       { y25: data.netProfit ? (data.netProfit.y25 / rev25) * 100 : 0,       y24: data.netProfit?.y24 ? (data.netProfit.y24 / rev24) * 100 : 0 },
    };
  }, [data]);

  // Cost breakdown for current year
  const costBreakdown = useMemo(() => {
    if (!data.costOfSales) return null;

    return {
      costOfSales:    data.costOfSales?.y25 || 0,
      sellAdmin:      data.sellAdmin?.y25 || 0,
      netFinanceCost: data.netFinanceCost?.y25 || 0,
      impairment:     data.impairment?.y25 || 0,
      incomeTax:      data.incomeTax?.y25 || 0,
    };
  }, [data]);

  // Comparison data (2025 vs 2024)
  const comparison = useMemo(() => {
    const keys = ['revenue', 'grossProfit', 'operatingProfit', 'netProfit'];
    return keys
      .filter(k => data[k])
      .map(k => ({
        key: k,
        label: k === 'revenue' ? 'Revenue'
          : k === 'grossProfit' ? 'Gross Profit'
          : k === 'operatingProfit' ? 'Op. Profit'
          : 'Net Profit',
        y25: data[k].y25,
        y24: data[k].y24,
      }));
  }, [data]);

  // Share price data
  const sharePrice = useMemo(() => {
    return financials.sharePrice[period];
  }, [period]);

  // Segment data
  const segments = useMemo(() => {
    return financials.segments[entity]?.ytd || financials.segments.company.ytd;
  }, [entity]);

  return {
    data,
    kpis,
    margins,
    costBreakdown,
    comparison,
    sharePrice,
    segments,
    period,
    entity,
  };
}

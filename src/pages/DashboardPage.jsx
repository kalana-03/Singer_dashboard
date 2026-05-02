import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import KPICard from '../components/cards/KPICard';
import SharePriceCard from '../components/cards/SharePriceCard';
import WaterfallChart from '../components/charts/WaterfallChart';
import CompareBarChart from '../components/charts/CompareBarChart';
import MarginChart from '../components/charts/MarginChart';
import CostBreakdown from '../components/charts/CostBreakdown';
import SegmentChart from '../components/charts/SegmentChart';

export default function DashboardPage() {
  const {
    data,
    kpis,
    margins,
    costBreakdown,
    comparison,
    sharePrice,
    segments,
  } = useDashboardData();

  return (
    <div className="space-y-4 md:space-y-section-gap">
      {/* ROW 1 — KPI Cards */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-card-gap">
          {kpis.map((kpi) => (
            <KPICard
              key={kpi.key}
              label={kpi.label}
              current={kpi.current}
              prior={kpi.prior}
              change={kpi.change}
              accent={kpi.accent}
              isEPS={kpi.isEPS}
            />
          ))}
        </div>
      </section>

      {/* ROW 2 — Waterfall (60%) + Comparison (40%) */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-card-gap">
          <div className="lg:col-span-3">
            <WaterfallChart data={data} />
          </div>
          <div className="lg:col-span-2">
            <CompareBarChart comparison={comparison} />
          </div>
        </div>
      </section>

      {/* ROW 3 — Margins + Cost Breakdown + Share Price */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-card-gap">
          <MarginChart margins={margins} />
          <CostBreakdown costBreakdown={costBreakdown} />
          <SharePriceCard
            sharePrice={sharePrice}
            epsData={data.eps}
          />
        </div>
      </section>

      {/* ROW 4 — Full Width Segment Revenue */}
      <section>
        <SegmentChart segments={segments} />
      </section>
    </div>
  );
}

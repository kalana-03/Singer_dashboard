import React from 'react';
import { useDashboardContext } from '../../context/DashboardContext';
import Toggle from '../ui/Toggle';

const periodOptions = [
  { value: 'q3', label: 'Q3' },
  { value: 'ytd', label: 'YTD' },
];

const entityOptions = [
  { value: 'group', label: 'Group' },
  { value: 'company', label: 'Company' },
];

export default function Header() {
  const { period, setPeriod, entity, setEntity } = useDashboardContext();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-header h-header bg-surface-page border-b border-surface-border flex items-center justify-between px-6"
    >
      {/* Left — Logo & subtitle */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-singer-gradient rounded-icon flex items-center justify-center flex-shrink-0">
          <span className="text-text-onRed font-bold text-base">S</span>
        </div>
        <div className="relative pb-1.5">
          <h1 className="text-subhead font-semibold text-text-primary leading-none">
            Singer (Sri Lanka) PLC
          </h1>
          <p className="text-micro text-text-muted mt-0.5">
            Interim Financial Report · Q3 FY2025/26
          </p>
          {/* Red underline accent */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-singer-600" />
        </div>
      </div>

      {/* Right — Toggle controls */}
      <div className="flex items-center gap-3">
        <Toggle options={periodOptions} value={period} onChange={setPeriod} />
        <Toggle options={entityOptions} value={entity} onChange={setEntity} />
      </div>
    </header>
  );
}

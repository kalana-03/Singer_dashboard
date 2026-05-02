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
      className="fixed top-0 left-0 right-0 z-header h-header bg-surface-page border-b border-surface-border flex items-center justify-between px-2 sm:px-4 md:px-6"
    >
      {/* Left — Logo & subtitle */}
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 flex-1 min-w-0">
        <div className="w-7 sm:w-8 md:w-9 h-7 sm:h-8 md:h-9 bg-singer-gradient rounded-icon flex items-center justify-center flex-shrink-0">
          <span className="text-text-onRed font-bold text-xs sm:text-sm md:text-base">S</span>
        </div>
        <div className="relative pb-1 min-w-0">
          <h1 className="text-micro sm:text-small md:text-subhead font-semibold text-text-primary leading-tight truncate">
            Singer PLC
          </h1>
          <p className="text-[10px] md:text-micro text-text-muted hidden sm:block whitespace-nowrap">
            Financial Dashboard
          </p>
          {/* Red underline accent */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] md:h-[2px] bg-singer-600" />
        </div>
      </div>

      {/* Right — Toggle controls */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
        <Toggle options={periodOptions} value={period} onChange={setPeriod} />
        <Toggle options={entityOptions} value={entity} onChange={setEntity} />
      </div>
    </header>
  );
}

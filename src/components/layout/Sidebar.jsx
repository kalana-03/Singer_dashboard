import React, { useState } from 'react';

const navItems = [
  { id: 'dashboard',  label: 'Dashboard',        icon: '📊' }
];

export default function Sidebar() {
  const [active, setActive] = useState('dashboard');

  return (
    <aside className="hidden md:flex fixed left-0 top-header bottom-0 w-sidebar bg-surface-sidebar border-r border-surface-border z-sidebar flex-col">
      {/* Top — Monogram */}
      <div className="px-5 py-5 flex items-center gap-3">
        <div className="w-80 h-10 bg-singer-gradient rounded-icon flex items-center justify-center">
          <span className="text-text-onRed font-bold text-lg">SINGER</span>
        </div>
      </div>

      {/* Accent strip */}
      <div className="h-[1px] bg-singer-gradient mx-4 mb-3 opacity-60" />

      {/* Nav items */}
      <nav className="flex-1 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 h-11 rounded-chip
                text-small font-medium
                transition-all duration-base ease-smooth
                cursor-pointer select-none
                ${isActive
                  ? 'bg-surface-elevated text-text-primary border-l-[3px] border-l-singer-600'
                  : 'text-text-muted hover:bg-surface-elevated hover:text-text-secondary border-l-[3px] border-l-transparent'
                }
              `}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={`text-base ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom — CSE info */}
      <div className="px-4 py-4 border-t border-surface-border">
        <p className="text-micro text-text-muted leading-relaxed">
          Singer (Sri Lanka) PLC<br />
          CSE Listed · PQ 160
        </p>
      </div>
    </aside>
  );
}

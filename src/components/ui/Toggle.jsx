import React from 'react';

/**
 * Toggle pill group — uses toggle-active / toggle-inactive utility classes.
 * options: [{ value, label }]
 */
export default function Toggle({ options, value, onChange }) {
  return (
    <div className="flex items-center gap-0 rounded-btn border border-surface-border overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            px-2 md:px-4 py-1 md:py-1.5 text-micro md:text-label font-medium tracking-wide
            transition-all duration-base ease-smooth
            cursor-pointer select-none
            ${value === opt.value ? 'toggle-active' : 'toggle-inactive border-0'}
          `}
          style={{ minWidth: '40px' }}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

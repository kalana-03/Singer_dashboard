import React from 'react';

/**
 * Badge component — uses plugin utility classes.
 * variant: 'positive' | 'negative' | 'brand'
 */
export default function Badge({ children, variant = 'positive' }) {
  const cls =
    variant === 'positive' ? 'badge-positive'
    : variant === 'negative' ? 'badge-negative'
    : 'badge-brand';

  return (
    <span className={`${cls} inline-flex items-center animate-badge-pop`}>
      {variant === 'positive' && '▲ '}
      {variant === 'negative' && '▼ '}
      {children}
    </span>
  );
}

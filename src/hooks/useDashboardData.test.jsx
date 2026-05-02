import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { DashboardProvider } from '../context/DashboardContext';
import { useDashboardData } from './useDashboardData';

function wrapper({ children }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}

describe('useDashboardData', () => {
  it('returns core derived values for default context', () => {
    const { result } = renderHook(() => useDashboardData(), { wrapper });

    expect(result.current.data).toBeTruthy();
    expect(Array.isArray(result.current.kpis)).toBe(true);
    expect(result.current.kpis.length).toBeGreaterThan(0);
    expect(result.current.margins).toBeTruthy();
    expect(result.current.costBreakdown).toBeTruthy();
    expect(result.current.sharePrice).toBeTruthy();
    expect(Array.isArray(result.current.segments)).toBe(true);
  });
});

import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardProvider } from '../../context/DashboardContext';
import Header from './Header';

describe('Header', () => {
  it('renders title and toggle controls', () => {
    render(
      <DashboardProvider>
        <Header />
      </DashboardProvider>
    );

    expect(screen.getByText('Singer PLC')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Q3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'YTD' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Group' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Company' })).toBeInTheDocument();
  });
});

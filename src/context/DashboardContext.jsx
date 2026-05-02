import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [period, setPeriod] = useState('q3');   // 'q3' | 'ytd'
  const [entity, setEntity] = useState('group'); // 'group' | 'company'

  const value = {
    period,
    setPeriod,
    entity,
    setEntity,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return ctx;
}

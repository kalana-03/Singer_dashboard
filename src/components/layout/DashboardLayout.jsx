import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-surface-page">
      <Header />
      <Sidebar />
      <main className="ml-sidebar mt-header p-section-gap">
        {children}

        {/* Footer */}
        <footer className="border-t border-surface-border mt-section-gap pt-inner-gap pb-6">
          <p className="text-micro text-text-muted leading-relaxed">
            Figures are provisional and subject to audit.<br />
            Source: Singer (Sri Lanka) PLC Interim Financial Statements Q3 FY2025/26.<br />
            Signed: 3rd February 2026. Auditors: KPMG Chartered Accountants.
          </p>
        </footer>
      </main>
    </div>
  );
}

import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Keep a local console trail in case remote monitoring is not configured yet.
    console.error('Unhandled UI error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-page text-text-primary flex items-center justify-center p-6">
          <div className="singer-card max-w-xl w-full text-center">
            <h1 className="text-heading mb-3">Something went wrong</h1>
            <p className="text-small text-text-secondary">
              The dashboard encountered an unexpected error. Please refresh the page.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

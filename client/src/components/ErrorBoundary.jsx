import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Dashboard Error Boundary Caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const label = this.props.label || 'This widget';
      return (
        <div className="w-full rounded-xl border border-[oklch(0.62_0.22_25/0.35)] bg-[oklch(0.62_0.22_25/0.08)] p-4 text-left shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          <div className="flex items-start gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[oklch(0.62_0.22_25/0.35)] bg-[oklch(0.62_0.22_25/0.12)] text-[oklch(0.62_0.22_25)]">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-black text-[oklch(0.96_0.005_260)]">{label} could not load</h2>
              <p className="mt-1 text-xs leading-relaxed text-[oklch(0.65_0.01_260)]">
                The rest of the dashboard is still available. Try this section again, or continue working from the sidebar.
              </p>
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, errorInfo: null })}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-[oklch(0.65_0.19_35/0.35)] bg-[oklch(0.65_0.19_35/0.12)] px-3 py-2 text-xs font-black text-[oklch(0.78_0.16_75)] transition-colors hover:bg-[oklch(0.65_0.19_35/0.18)]"
              >
                <RefreshCcw className="h-3.5 w-3.5" />
                Retry section
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

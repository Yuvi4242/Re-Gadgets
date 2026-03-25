import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Dashboard Error Boundary Caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#060e20] text-white p-6">
           <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-2xl max-w-lg w-full text-center">
              <h1 className="text-2xl font-black text-rose-400 mb-2">Something went wrong.</h1>
              <p className="text-rose-200/60 text-sm mb-6">A critical rendering error occurred in this dashboard module.</p>
              <button 
                onClick={() => window.location.href = '/'} 
                className="bg-brandBlue text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-brandPurple transition-colors"
              >
                Return to Home
              </button>
           </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

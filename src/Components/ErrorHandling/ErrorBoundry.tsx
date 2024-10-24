import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  ErrorPage: React.ComponentType;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true });
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { ErrorPage, children } = this.props;

    return hasError ? <ErrorPage /> : children;
  }
}

export default ErrorBoundary;

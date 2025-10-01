// Sentry ErrorBoundary disabled for offline-first mode
import type { FC, PropsWithChildren } from 'react';
import { useCallback, Component, type ReactNode } from 'react';

// Simple ErrorBoundary implementation without Sentry
interface FallbackProps {
  error: Error;
  resetError: () => void;
}

type FallbackRender = (props: FallbackProps) => ReactNode;

class SimpleErrorBoundary extends Component<
  { fallback: FallbackRender; onError?: (error: Error) => void; children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({
        error: this.state.error,
        resetError: () => this.setState({ hasError: false, error: null }),
      });
    }

    return this.props.children;
  }
}

import { AffineErrorFallback } from './affine-error-fallback';

export { type FallbackProps } from './error-basic/fallback-creator';

export interface AffineErrorBoundaryProps extends PropsWithChildren {
  height?: number | string;
  className?: string;
}

/**
 * TODO(@eyhn): Unify with SWRErrorBoundary
 */
export const AffineErrorBoundary: FC<AffineErrorBoundaryProps> = props => {
  const fallbackRender: FallbackRender = useCallback(
    fallbackProps => {
      return (
        <AffineErrorFallback
          {...fallbackProps}
          height={props.height}
          className={props.className}
        />
      );
    },
    [props.height, props.className]
  );

  const onError = useCallback((error: unknown, componentStack?: string) => {
    console.error('Uncaught error:', error, componentStack);
  }, []);

  return (
    <SimpleErrorBoundary fallback={fallbackRender} onError={onError}>
      {props.children}
    </SimpleErrorBoundary>
  );
};

/**
 * Mock tracking system for offline-first mode
 * All tracking calls become no-ops to disable telemetry
 */

// Mock tracker that does nothing
const createNoOpTracker = () => {
  const handler = {
    get: () => {
      return () => {}; // Return a no-op function for any method call
    }
  };
  
  // Create a deeply nested proxy that returns no-op functions for any property access
  const createProxy = (): any => {
    return new Proxy(() => {}, {
      ...handler,
      apply: () => {}, // No-op when called as function
      get: (target, prop) => {
        if (typeof prop === 'string') {
          return createProxy(); // Return another proxy for chaining
        }
        return () => {}; // Return no-op function
      }
    });
  };
  
  return createProxy();
};

export const track = createNoOpTracker();
export const mixpanel = createNoOpTracker();
export const sentry = {
  captureException: () => {},
  captureMessage: () => {},
  configureScope: () => {},
  withScope: (callback: any) => callback({}),
};

export default track;
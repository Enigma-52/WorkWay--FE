/**
 * Check if code is running on the server (SSR) or client
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is running on the client
 */
export const isClient = typeof window !== 'undefined';

/**
 * Safely access window object (returns undefined on server)
 */
export const safeWindow = isClient ? window : undefined;

/**
 * Safely access document object (returns undefined on server)
 */
export const safeDocument = isClient ? document : undefined;

/**
 * Execute a function only on the client side
 * @param fn Function to execute on client
 * @param fallback Optional fallback value to return on server
 */
export function onClient<T>(fn: () => T, fallback?: T): T | undefined {
  return isClient ? fn() : fallback;
}

/**
 * Execute a function only on the server side
 * @param fn Function to execute on server
 * @param fallback Optional fallback value to return on client
 */
export function onServer<T>(fn: () => T, fallback?: T): T | undefined {
  return isServer ? fn() : fallback;
}

/**
 * Helper utility to safely handle route params in Next.js 14+
 * Use this to properly await any params that might be promises
 */

/**
 * Process a single param and await it if it's a promise
 * @param param The parameter value which might be a string or Promise<string>
 * @returns The awaited string value
 */
export async function getSafeParam(param: string | Promise<string>): Promise<string> {
  return param instanceof Promise ? await param : param;
}

/**
 * Process an entire params object and await any values that are promises
 * @param params The params object from Next.js page props
 * @returns A safe object with all values properly awaited
 */
export async function getSafeParams<T extends Record<string, string | Promise<string>>>(
  params: T
): Promise<{ [K in keyof T]: string }> {
  const result: any = {};
  
  for (const [key, value] of Object.entries(params)) {
    result[key] = value instanceof Promise ? await value : value;
  }
  
  return result;
}
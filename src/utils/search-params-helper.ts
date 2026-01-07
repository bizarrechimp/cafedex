/**
 * Helper utility to safely handle searchParams in Next.js 14+
 * Use this to properly await any searchParams that might be promises
 */

/**
 * Process searchParams and await any values that are promises
 * @param searchParams The searchParams object from Next.js page props
 * @returns A safe object with all values properly awaited
 */
export async function getSafeSearchParams<
  T extends Record<string, string | Promise<string> | undefined>,
>(searchParams: T): Promise<{ [K in keyof T]: string | undefined }> {
  const result: any = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      result[key] = value instanceof Promise ? await value : value;
    }
  }

  return result;
}

/**
 * Get a single parameter safely from searchParams
 * @param searchParams The searchParams object
 * @param key The key to extract
 * @returns The awaited value or undefined
 */
export async function getSafeSearchParam(
  searchParams: Record<string, string | Promise<string> | undefined>,
  key: string
): Promise<string | undefined> {
  const value = searchParams[key];
  if (value === undefined) return undefined;
  return value instanceof Promise ? await value : value;
}

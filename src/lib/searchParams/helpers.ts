/**
 * URL Search Parameters Utilities
 * Consolidated helpers for handling Next.js 14+ promise-based params and searchParams
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
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    result[key] = value instanceof Promise ? await value : value;
  }

  return result as { [K in keyof T]: string };
}

/**
 * Process searchParams and await any values that are promises
 * @param searchParams The searchParams object from Next.js page props
 * @returns A safe object with all values properly awaited
 */
export async function getSafeSearchParams<
  T extends Record<string, string | Promise<string> | undefined>,
>(searchParams: T): Promise<{ [K in keyof T]: string | undefined }> {
  const result: Record<string, string | undefined> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== undefined) {
      result[key] = value instanceof Promise ? await value : value;
    }
  }

  return result as { [K in keyof T]: string | undefined };
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

/**
 * Build a query string from an object
 * @param params Object with key-value pairs
 * @returns Query string (without leading ?)
 */
export function buildQueryString(params: Record<string, string | undefined>): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, value);
    }
  }

  return searchParams.toString();
}

/**
 * Parse a query string into an object
 * @param query Query string (with or without leading ?)
 * @returns Object with parsed parameters
 */
export function parseQueryString(query: string): Record<string, string> {
  const cleanQuery = query.startsWith('?') ? query.slice(1) : query;
  const searchParams = new URLSearchParams(cleanQuery);
  const result: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}

/**
 * Update a specific parameter in a query string
 * @param query Current query string
 * @param key Parameter key to update
 * @param value New value (undefined to remove)
 * @returns Updated query string
 */
export function updateQueryParam(query: string, key: string, value: string | undefined): string {
  const params = parseQueryString(query);

  if (value === undefined) {
    delete params[key];
  } else {
    params[key] = value;
  }

  return buildQueryString(params);
}

/**
 * Get all active filters from search params
 * @param searchParams Search parameters object
 * @returns Object with only non-empty filter values
 */
export function getActiveFilters(
  searchParams: Record<string, string | Promise<string> | undefined>
): Record<string, string> {
  const filters: Record<string, string> = {};

  for (const [key, value] of Object.entries(searchParams)) {
    if (value && typeof value === 'string') {
      filters[key] = value;
    }
  }

  return filters;
}

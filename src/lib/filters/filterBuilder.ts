/**
 * Filter Builder
 * Centralized logic for building MongoDB queries from filter parameters
 */

import { Cafe } from '@/types/cafe';
import { CafeListFilterSchema } from '@/lib/validators';
import { isActiveProvince } from '@/lib/constants/provinces';
import { logger } from '@/lib/logger';

export interface FilterOptions {
  city?: string;
  state?: string;
  featured?: boolean;
  roastery?: boolean;
}

export interface FilterResult {
  cafes: Cafe[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Validates filter parameters
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateFilters = (filters: any) => {
  try {
    const validated = CafeListFilterSchema.parse(filters);
    logger.debug('Filters validated successfully', validated);
    return validated;
  } catch (error) {
    logger.warn('Invalid filters provided', error);
    throw new Error(`Filtros inválidos: ${error}`);
  }
};

/**
 * Builds a filter object for MongoDB query
 */
export const buildMongoFilter = (options: FilterOptions): Record<string, unknown> => {
  const filter: Record<string, unknown> = { published: true };

  if (options.city) {
    filter.city = { $eq: options.city };
    logger.debug(`Adding city filter: ${options.city}`);
  }

  if (options.state && isActiveProvince(options.state)) {
    filter.state = { $eq: options.state };
    logger.debug(`Adding state filter: ${options.state}`);
  }

  if (options.featured !== undefined) {
    filter.featured = options.featured;
    logger.debug(`Adding featured filter: ${options.featured}`);
  }

  if (options.roastery !== undefined) {
    filter['specialty_features.roastery'] = options.roastery;
    logger.debug(`Adding roastery filter: ${options.roastery}`);
  }

  return filter;
};

/**
 * Applies pagination to a cafe array
 */
export const applyPagination = (cafes: Cafe[], limit: number = 10, skip: number = 0): Cafe[] => {
  return cafes.slice(skip, skip + limit);
};

/**
 * Filters cafes by city
 */
export const filterByCity = (cafes: Cafe[], city: string): Cafe[] => {
  if (!city || city === 'all') return cafes;
  return cafes.filter((cafe) => cafe.city === city);
};

/**
 * Filters cafes by state
 */
export const filterByState = (cafes: Cafe[], state: string): Cafe[] => {
  if (!state || state === 'all' || !isActiveProvince(state)) return cafes;
  return cafes.filter((cafe) => cafe.state === state);
};

/**
 * Combines multiple filters
 */
export const applyFilters = (cafes: Cafe[], options: FilterOptions): Cafe[] => {
  let filtered = cafes;

  if (options.city) {
    filtered = filterByCity(filtered, options.city);
  }

  if (options.state) {
    filtered = filterByState(filtered, options.state);
  }

  if (options.featured) {
    filtered = filtered.filter((cafe) => cafe.featured);
  }

  if (options.roastery !== undefined) {
    filtered = filtered.filter((cafe) => cafe.specialty_features.roastery === options.roastery);
  }

  return filtered;
};

/**
 * Gets unique cities from a cafe list
 */
export const getUniqueCities = (cafes: Cafe[]): string[] => {
  const cities = new Set(cafes.map((cafe) => cafe.city));
  return Array.from(cities).sort();
};

/**
 * Gets unique states from a cafe list
 */
export const getUniqueStates = (cafes: Cafe[]): string[] => {
  const states = new Set(cafes.map((cafe) => cafe.state).filter(isActiveProvince));
  return Array.from(states).sort();
};

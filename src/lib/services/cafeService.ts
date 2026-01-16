/**
 * Cafe Service Layer
 * Contains all business logic for cafe-related operations
 * Abstracts database implementation details
 *
 * @module services/cafeService
 */

import { cache } from 'react';
import { Cafe } from '@/types/cafe';
import CafeModel from '@/lib/db/cafe';
import connectMongo from '@/lib/db/mongodb';
import { serializeCafe, serializeCafes } from '@/lib/db/serializers';
import { isActiveProvince } from '@/lib/constants/provinces';
import { logger } from '@/lib/logger';
import { DatabaseError } from '@/lib/errors';

/**
 * Get cities for a specific state/province
 * @param state - The state/province name to filter by
 * @returns Array of unique cities in that state
 */
export const getCitiesByState = cache(async (state: string): Promise<string[]> => {
  try {
    await connectMongo();

    if (!state || state.toLowerCase() === 'all') {
      // Return all cities
      const cities = await CafeModel.find().select('city').distinct('city').lean();
      return (cities as string[]).sort();
    }

    // Return cities for specific state
    const cities = await CafeModel.find({
      state: {
        $regex: `^${state.trim()}$`,
        $options: 'i',
      },
    })
      .select('city')
      .distinct('city')
      .lean();

    return (cities as string[]).sort();
  } catch (error) {
    logger.error(`Error fetching cities by state: ${state}`, error);
    return [];
  }
});

/**
 * Get a single cafe by slug
 * @param slug - The cafe slug identifier
 * @returns The cafe object or null if not found
 * @throws DatabaseError if connection fails
 */
export const getCafeBySlug = cache(async (slug: string): Promise<Cafe | null> => {
  try {
    await connectMongo();
    const cafe = await CafeModel.findOne({ slug }).lean();

    if (!cafe) {
      logger.debug(`Cafe not found with slug: ${slug}`);
      return null;
    }

    return serializeCafe(cafe);
  } catch (error) {
    logger.error(`Error fetching cafe by slug: ${slug}`, error);
    throw new DatabaseError('Failed to fetch cafe');
  }
});

/**
 * Alias for getCafeBySlug for backward compatibility
 * @deprecated Use getCafeBySlug instead
 */
export const getCafe = getCafeBySlug;

/**
 * Get all cafes sorted by slug
 * @returns Array of all published cafes
 */
export const getAllCafes = cache(async (): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const cafes = await CafeModel.find().sort({ slug: 1 }).lean();
    return serializeCafes(cafes);
  } catch (error) {
    logger.error('Error fetching all cafes', error);
    throw new DatabaseError('Failed to fetch cafes');
  }
});

/**
 * Get featured cafes
 * Falls back to top-rated cafes if no featured ones exist
 * @returns Array of up to 3 featured or top-rated cafes
 */
export const getFeaturedCafes = cache(async (): Promise<Cafe[]> => {
  try {
    await connectMongo();

    // First try to get featured cafes
    const featuredCafes = await CafeModel.find({ featured: true })
      .sort({ rating: -1 })
      .limit(3)
      .lean();

    // If no featured cafes, get top rated ones instead
    if (featuredCafes.length === 0) {
      const topRatedCafes = await CafeModel.find().sort({ rating: -1 }).limit(3).lean();
      return serializeCafes(topRatedCafes);
    }

    return serializeCafes(featuredCafes);
  } catch (error) {
    logger.error('Error fetching featured cafes', error);
    return [];
  }
});

/**
 * Get cafes filtered by city
 * @param city - The city name to filter by
 * @returns Array of cafes in the specified city
 */
export const getCafesByCity = cache(async (city: string): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const cafes = await CafeModel.find({ city }).sort({ rating: -1 }).lean();
    logger.debug(`Found ${cafes.length} cafes in city: ${city}`);
    return serializeCafes(cafes);
  } catch (error) {
    logger.error(`Error fetching cafes by city: ${city}`, error);
    return [];
  }
});

/**
 * Get cafes filtered by state/province
 * @param state - The province name to filter by
 * @returns Array of cafes in the specified province
 */
export const getCafesByState = cache(async (state: string): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const normalizedState = state.trim().toLowerCase();

    // Validate that the state is active
    if (!isActiveProvince(state)) {
      logger.warn(`State '${state}' is not active in the system`);
    }

    const cafes = await CafeModel.find({
      state: {
        $regex: `^${normalizedState}$`,
        $options: 'i', // Case-insensitive
      },
    })
      .sort({ rating: -1 })
      .lean();

    logger.debug(`Found ${cafes.length} cafes in state: ${state}`);
    return serializeCafes(cafes);
  } catch (error) {
    logger.error(`Error fetching cafes by state: ${state}`, error);
    return [];
  }
});

/**
 * Get cafes filtered by specific feature
 * Features can be: brew_methods, services, or serving items
 * @param feature - The feature to filter by
 * @returns Array of cafes with the specified feature
 */
export const getCafesByFeature = cache(async (feature: string): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const cafes = await CafeModel.find({
      $or: [
        { 'specialty_features.brew_methods': feature },
        { 'specialty_features.services': feature },
        { 'specialty_features.serving': feature },
      ],
    })
      .sort({ rating: -1 })
      .lean();

    return serializeCafes(cafes);
  } catch (error) {
    logger.error(`Error fetching cafes by feature: ${feature}`, error);
    return [];
  }
});

/**
 * Get cafes with roastery
 * @returns Array of cafes that have an in-house roastery
 */
export const getCafesWithRoastery = cache(async (): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const cafes = await CafeModel.find({ 'specialty_features.roastery': true })
      .sort({ rating: -1 })
      .lean();
    return serializeCafes(cafes);
  } catch (error) {
    logger.error('Error fetching cafes with roastery', error);
    return [];
  }
});

/**
 * Get cafes with specific brew method
 * @param method - The brew method (e.g., 'espresso', 'v60', 'pour-over')
 * @returns Array of cafes with the specified brew method
 */
export const getCafesByBrewMethod = cache(async (method: string): Promise<Cafe[]> => {
  try {
    await connectMongo();
    const cafes = await CafeModel.find({
      'specialty_features.brew_methods': method,
    })
      .sort({ rating: -1 })
      .lean();
    return serializeCafes(cafes);
  } catch (error) {
    logger.error(`Error fetching cafes by brew method: ${method}`, error);
    return [];
  }
});

/**
 * Search cafes by name (partial match, case-insensitive)
 * @param query - The search query
 * @returns Array of up to 20 matching cafes
 */
export const searchCafesByName = cache(async (query: string): Promise<Cafe[]> => {
  try {
    if (!query || query.trim().length === 0) {
      logger.warn('Search query is empty');
      return [];
    }

    await connectMongo();
    const cafes = await CafeModel.find({
      $or: [
        { 'i18n.es.name': { $regex: query, $options: 'i' } },
        { 'i18n.en.name': { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
      ],
    })
      .sort({ rating: -1 })
      .limit(20)
      .lean();

    logger.debug(`Found ${cafes.length} cafes matching: ${query}`);
    return serializeCafes(cafes);
  } catch (error) {
    logger.error(`Error searching cafes by name: ${query}`, error);
    return [];
  }
});

/**
 * Search and filter cafes with advanced options
 * Optimized for performance with a single MongoDB query
 * @param options - Search and filter options
 * @returns Object containing filtered cafes and total count
 */
export const searchAndFilterCafes = cache(
  async (options: {
    search?: string;
    state?: string;
    city?: string;
    filters?: string[]; // Quick filter keys: 'open_now', 'pet_friendly', 'wifi', 'vegan', 'outdoor', 'breakfast', 'workspace', 'roastery'
  }): Promise<{ cafes: Cafe[]; total: number; filtered: number }> => {
    try {
      await connectMongo();

      // Build the MongoDB query
      const query: Record<string, unknown> = {};

      // Search query (name, city, state)
      if (options.search && options.search.trim().length > 0) {
        const searchTerm = options.search.trim();
        query.$or = [
          { 'i18n.es.name': { $regex: searchTerm, $options: 'i' } },
          { 'i18n.en.name': { $regex: searchTerm, $options: 'i' } },
          { city: { $regex: searchTerm, $options: 'i' } },
          { state: { $regex: searchTerm, $options: 'i' } },
        ];
      }

      // State/Province filter
      if (options.state && options.state.toLowerCase() !== 'all') {
        query.state = {
          $regex: `^${options.state.trim()}$`,
          $options: 'i',
        };
      }

      // City filter
      if (options.city && options.city.toLowerCase() !== 'all') {
        query.city = options.city;
      }

      // Build quick filters (efficient $or condition)
      const quickFilterConditions: Record<string, unknown>[] = [];
      let hasOpenNowFilter = false;

      if (options.filters && options.filters.length > 0) {
        for (const filter of options.filters) {
          switch (filter) {
            case 'pet_friendly':
              quickFilterConditions.push({ 'specialty_features.services': 'dog_friendly' });
              break;
            case 'wifi':
              quickFilterConditions.push({ 'specialty_features.services': 'free_wifi' });
              break;
            case 'vegan':
              quickFilterConditions.push({ 'specialty_features.services': 'vegan_options' });
              break;
            case 'outdoor':
              quickFilterConditions.push({ 'specialty_features.services': 'outdoor_seating' });
              break;
            case 'breakfast':
              quickFilterConditions.push({ 'specialty_features.serving': 'breakfast' });
              break;
            case 'workspace':
              quickFilterConditions.push({ 'specialty_features.services': 'laptop_friendly' });
              break;
            case 'roastery':
              quickFilterConditions.push({ 'specialty_features.roastery': true });
              break;
            case 'open_now':
              // Will be handled after fetching - need to check current time
              hasOpenNowFilter = true;
              break;
          }
        }

        // Combine all quick filters with $or (cafe must match at least one)
        if (quickFilterConditions.length > 0) {
          if (query.$or) {
            // If we already have search $or, combine with $and
            query.$and = [{ $or: query.$or }, { $or: quickFilterConditions }];
            delete query.$or;
          } else {
            query.$or = quickFilterConditions;
          }
        }
      }

      // Execute the query with sorting
      let cafes = await CafeModel.find(query).sort({ rating: -1, slug: 1 }).limit(100).lean();
      const total = await CafeModel.countDocuments();

      // If open_now filter is active, filter results by current opening hours
      if (hasOpenNowFilter) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const dayMap: Record<number, string> = {
          0: 'sun',
          1: 'mon',
          2: 'tue',
          3: 'wed',
          4: 'thu',
          5: 'fri',
          6: 'sat',
        };
        const currentDay = dayMap[dayOfWeek];
        const currentHours =
          String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

        cafes = cafes.filter((cafe) => {
          const hours = cafe.specialty_features?.opening_hours?.[currentDay];
          if (!hours) return false;

          const [start, end] = hours.split('-').map((h: string) => h.trim());
          return currentHours >= start && currentHours < end;
        });
      }

      // Count filtered results
      const filtered = await CafeModel.countDocuments(query);

      logger.debug(
        `Search/Filter query: search="${options.search}", state="${options.state}", city="${options.city}", filters="${options.filters?.join(',')}". Results: ${cafes.length}`
      );

      return {
        cafes: serializeCafes(cafes),
        total,
        filtered,
      };
    } catch (error) {
      logger.error('Error searching/filtering cafes', error);
      return { cafes: [], total: 0, filtered: 0 };
    }
  }
);

/**
 * Get total cafe count
 * @returns The total number of published cafes
 */
export const getCafeCount = cache(async (): Promise<number> => {
  try {
    await connectMongo();
    const count = await CafeModel.countDocuments();
    logger.debug(`Total cafe count: ${count}`);
    return count;
  } catch (error) {
    logger.error('Error fetching cafe count', error);
    return 0;
  }
});

/**
 * Get cafes with pagination
 * @param page - The page number (1-indexed)
 * @param limit - Results per page (max 100)
 * @returns Object containing paginated cafes array and total count
 */
export const getCafesWithPagination = cache(
  async (page: number = 1, limit: number = 10): Promise<{ cafes: Cafe[]; total: number }> => {
    try {
      await connectMongo();
      const skip = (page - 1) * limit;
      const maxLimit = Math.min(limit, 100);

      const [cafes, total] = await Promise.all([
        CafeModel.find().sort({ slug: 1 }).skip(skip).limit(maxLimit).lean(),
        CafeModel.countDocuments(),
      ]);

      logger.debug(`Fetched page ${page} with ${cafes.length} cafes`);
      return {
        cafes: serializeCafes(cafes),
        total,
      };
    } catch (error) {
      logger.error(`Error fetching cafes with pagination (page ${page})`, error);
      return { cafes: [], total: 0 };
    }
  }
);

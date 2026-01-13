/**
 * Environment variable configuration with type safety
 * All environment variables should be accessed through this file
 *
 * @module env
 */

// Validate required environment variables
const requiredEnvVars = {
  MONGODB_URI: process.env.MONGODB_URI,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
};

// Check for missing required variables in production
if (process.env.NODE_ENV === 'production') {
  const missing = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

/**
 * Typed environment variables with validation
 */
export const env = {
  // Database
  mongodb: {
    /** MongoDB connection URI */
    uri: process.env.MONGODB_URI || '',
    /** Connection timeout in milliseconds */
    timeout: parseInt(process.env.MONGODB_TIMEOUT || '10000'),
    /** Maximum number of retries for failed connections */
    maxRetries: parseInt(process.env.MONGODB_MAX_RETRIES || '3'),
  },

  // External APIs
  googleMaps: {
    /** Google Maps API key (public) */
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  },
  googlePlaces: {
    /** Google Places API key (server-side only) */
    apiKey: process.env.GOOGLE_PLACES_API_KEY || '',
  },
  googleTagManager: {
    /** Google Tag Manager ID (public) */
    id: process.env.NEXT_PUBLIC_GTM_ID || '',
  },

  // Application
  node: {
    env: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
  },

  // Caching and performance
  cache: {
    /** Default cache TTL in seconds */
    defaultTTL: parseInt(process.env.CACHE_TTL || '3600'),
    /** Search results cache TTL */
    searchTTL: parseInt(process.env.SEARCH_CACHE_TTL || '1800'),
    /** Featured cafes cache TTL */
    featuredTTL: parseInt(process.env.FEATURED_CACHE_TTL || '3600'),
  },

  // Feature flags (optional)
  features: {
    /** Enable blog functionality */
    enableBlog: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
    /** Enable analytics */
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    /** Enable debug logging */
    debugLogging: process.env.DEBUG_LOGGING === 'true',
  },
} as const;

/**
 * Helper functions for environment detection
 */
export const isProduction = () => env.node.env === 'production';
export const isDevelopment = () => env.node.env === 'development';
export const isTest = () => env.node.env === 'test';

/**
 * Validate environment at startup
 */
export function validateEnv(): void {
  if (!env.mongodb.uri) {
    throw new Error('MONGODB_URI environment variable is not set');
  }

  if (!env.googleMaps.apiKey) {
    if (typeof window === 'undefined') {
      // Server-side
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { logger } = require('@/lib/logger');
      logger.warn('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set - maps will not work');
    }
  }
}

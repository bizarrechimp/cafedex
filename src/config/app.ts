/**
 * Application configuration
 * General app constants and metadata
 */

export const app = {
  name: 'Cafedex',
  description: 'Descubre las mejores cafeterías independientes en España',
  version: '0.1.0',
  author: 'bizarrechimp',
  url: 'https://cafedex.com',

  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  cache: {
    // Revalidation times in seconds
    featured: 3600, // 1 hour
    cafes: 1800, // 30 minutes
    search: 600, // 10 minutes
  },

  defaults: {
    country: 'Spain',
    language: 'es',
  },
} as const;

export type AppConfig = typeof app;

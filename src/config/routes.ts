/**
 * Application routes configuration
 * Centralized route constants for type-safe navigation
 */

export const routes = {
  home: '/',
  cafes: '/cafeterias',
  cafe: (slug: string) => `/cafe/${slug}`,
  api: {
    health: '/api/health',
    cafes: '/api/cafes',
    search: '/api/search',
  },
} as const;

export type Routes = typeof routes;

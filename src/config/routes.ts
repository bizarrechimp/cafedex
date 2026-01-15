/**
 * Application routes configuration
 * Centralized route constants for type-safe navigation
 */

import { defaultLocale, Locale } from '@/lib/i18n/config';
import { localizePathname } from '@/lib/i18n/routing';

const withLocale = (path: string, locale: Locale = defaultLocale) => localizePathname(path, locale);

export const routes = {
  home: '/',
  cafes: '/cafeterias',
  cafe: (slug: string) => `/cafe/${slug}`,
  localized: {
    home: (locale?: Locale) => withLocale('/', locale ?? defaultLocale),
    cafes: (locale?: Locale) => withLocale('/cafeterias', locale ?? defaultLocale),
    cafe: (locale: Locale, slug: string) => withLocale(`/cafe/${slug}`, locale),
  },
  api: {
    health: '/api/health',
    cafes: '/api/cafes',
    search: '/api/search',
  },
} as const;

export type Routes = typeof routes;

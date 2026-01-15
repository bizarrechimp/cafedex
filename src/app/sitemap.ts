import type { MetadataRoute } from 'next';
import { app } from '@/config/app';
import { locales } from '@/lib/i18n/config';
import { getAllCafes } from '@/lib/services/cafeService';

export const revalidate = 3600;

const buildUrl = (path: string) => `${app.url}${path}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  // const staticPaths = ['/', '/cafeterias'] as const;
  // Example static path: add '/about' when that route exists.

  // for (const path of staticPaths) {
  //   for (const locale of locales) {
  //     const url = path === '/' ? `/${locale}` : `/${locale}${path}`;
  //     entries.push({
  //       url: buildUrl(url),
  //       changeFrequency: path === '/' ? 'daily' : 'weekly',
  //       priority: path === '/' ? 1 : 0.8,
  //     });
  //   }
  // }

  for (const locale of locales) {
    entries.push({
      url: buildUrl(`/${locale}`),
      changeFrequency: 'daily',
      priority: 1,
    });
    entries.push({
      url: buildUrl(`/${locale}/cafeterias`),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  try {
    const cafes = await getAllCafes();
    for (const cafe of cafes) {
      const lastModified = cafe.updatedAt
        ? new Date(cafe.updatedAt)
        : cafe.lastUpdated
          ? new Date(cafe.lastUpdated)
          : new Date();
      for (const locale of locales) {
        entries.push({
          url: buildUrl(`/${locale}/cafe/${cafe.slug}`),
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch {
    // Skip cafe URLs if the database is unavailable at build time.
  }

  return entries;
}

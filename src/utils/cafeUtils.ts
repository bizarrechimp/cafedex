import { Cafe } from '@/data/types';
import { getAllCafes } from '@/data/cafes/index';

export function getRandomCafes(count: number = 4): Cafe[] {
  const allCafes = getAllCafes();
  const shuffled = [...allCafes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allCafes.length));
}

export function getFeaturedCafes(): Cafe[] {
  return getRandomCafes(4);
}

export function searchCafes(query: string): Cafe[] {
  const allCafes = getAllCafes();
  const searchTerm = query.toLowerCase();

  return allCafes.filter((cafe: Cafe) =>
    cafe.name.toLowerCase().includes(searchTerm) ||
    cafe.city.toLowerCase().includes(searchTerm) ||
    cafe.description?.toLowerCase().includes(searchTerm) ||
    cafe.features?.some((feature: string) => feature.toLowerCase().includes(searchTerm))
  );
}

// Re-export utility functions
export { getCafesByCity, getCafesByFeature, getAllCafes } from '@/data/cafes/index';
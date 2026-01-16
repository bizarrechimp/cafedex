import { NextRequest, NextResponse } from 'next/server';
import { searchAndFilterCafesPaginated } from '@/lib/services/cafeService';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

const MAX_LIMIT = 20;
const DEFAULT_LIMIT = 10;
const MAX_QUERY_LENGTH = 100;

const ALLOWED_QUICK_FILTERS = new Set([
  'open_now',
  'pet_friendly',
  'wifi',
  'vegan',
  'outdoor',
  'breakfast',
  'workspace',
  'roastery',
]);

const parseLimit = (value: string | null) => {
  if (!value) return DEFAULT_LIMIT;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return DEFAULT_LIMIT;
  return Math.min(Math.max(parsed, 1), MAX_LIMIT);
};

const parseFilters = (value: string | null) => {
  if (!value) return [];
  return value
    .split(',')
    .map((filter) => filter.trim())
    .filter((filter) => ALLOWED_QUICK_FILTERS.has(filter));
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseLimit(searchParams.get('limit'));
    const search = searchParams.get('search')?.trim() || undefined;
    const state = searchParams.get('state')?.trim() || undefined;
    const city = searchParams.get('city')?.trim() || undefined;
    const cursor = searchParams.get('cursor')?.trim() || null;
    const filters = parseFilters(searchParams.get('filters'));

    if (search && search.length > MAX_QUERY_LENGTH) {
      return NextResponse.json({ error: 'Search query is too long.' }, { status: 400 });
    }

    const result = await searchAndFilterCafesPaginated({
      search,
      state,
      city,
      filters,
      cursor,
      limit,
    });

    return NextResponse.json({ ...result, limit });
  } catch (error) {
    logger.error('Failed to load cafes pagination API', error);
    return NextResponse.json({ error: 'Failed to load cafes.' }, { status: 500 });
  }
}

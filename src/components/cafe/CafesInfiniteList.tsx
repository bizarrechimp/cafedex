'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import CafeCard from './CafeCard';
import CafeCardSkeleton from './CafeCardSkeleton';
import { CardGrid } from '@/components/sections';
import { Cafe } from '@/types/cafe';
import { useI18n } from '@/lib/i18n/client';
import { useLocale } from '@/lib/i18n/useLocale';
import { getCafeI18n } from '@/lib/i18n/cafe';
import { useInfiniteList } from '@/lib/hooks/useInfiniteList';

const DEFAULT_LIMIT = 10;
const PREFETCH_MARGIN = '0px 0px 30% 0px';

interface CafesInfiniteListProps {
  initialCafes: Cafe[];
  initialCursor: string | null;
  initialHasMore: boolean;
  initialTotal: number;
  initialFiltered: number;
  initialQueryKey: string;
  defaultState: string;
  defaultCity: string;
}

const buildQueryKey = (params: {
  search?: string;
  state?: string;
  city?: string;
  filters?: string;
}) => {
  const searchParams = new URLSearchParams();
  if (params.search) searchParams.set('search', params.search);
  if (params.state) searchParams.set('state', params.state);
  if (params.city) searchParams.set('city', params.city);
  if (params.filters) searchParams.set('filters', params.filters);
  return searchParams.toString();
};

export default function CafesInfiniteList({
  initialCafes,
  initialCursor,
  initialHasMore,
  initialTotal,
  initialFiltered,
  initialQueryKey,
  defaultState,
  defaultCity,
}: CafesInfiniteListProps) {
  const { t } = useI18n();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const search = searchParams?.get('search') ?? '';
  const state = searchParams?.get('state') ?? defaultState;
  const city = searchParams?.get('city') ?? defaultCity;
  const filters = searchParams?.get('filters') ?? '';

  const queryKey = useMemo(
    () => buildQueryKey({ search, state, city, filters }),
    [search, state, city, filters]
  );

  const fetchPage = useCallback(
    async (cursor: string | null, signal: AbortSignal) => {
      const apiParams = new URLSearchParams();
      if (search) apiParams.set('search', search);
      if (state) apiParams.set('state', state);
      if (city) apiParams.set('city', city);
      if (filters) apiParams.set('filters', filters);
      if (cursor) apiParams.set('cursor', cursor);
      apiParams.set('limit', String(DEFAULT_LIMIT));

      const response = await fetch(`/api/cafes?${apiParams.toString()}`, { signal });
      if (!response.ok) {
        throw new Error('Failed to fetch cafes.');
      }
      return (await response.json()) as {
        cafes: Cafe[];
        nextCursor: string | null;
        hasMore: boolean;
        total: number;
        filtered: number;
      };
    },
    [city, filters, search, state]
  );

  const { items, hasMore, total, filtered, loadingInitial, loadingMore, error, loadMore } =
    useInfiniteList<Cafe>({
      queryKey,
      fetchPage: async (cursor, signal) => {
        const response = await fetchPage(cursor, signal);
        return {
          items: response.cafes,
          nextCursor: response.nextCursor,
          hasMore: response.hasMore,
          total: response.total,
          filtered: response.filtered,
        };
      },
      getItemId: (cafe) => cafe.id ?? cafe.slug,
      initialItems: initialCafes,
      initialCursor,
      initialHasMore,
      initialTotal,
      initialFiltered,
      initialKey: initialQueryKey,
    });

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: PREFETCH_MARGIN, threshold: 0 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  const resultsText =
    filtered === total
      ? t('filters.showing', { count: items.length, total })
      : t('filters.showing', { count: items.length, total: filtered });
  const showResultsText = !loadingInitial || items.length > 0;

  if (!loadingInitial && items.length === 0 && error) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <p className="text-sm text-red-600 dark:text-red-400">{t('cafes.error.description')}</p>
        <button
          type="button"
          onClick={() => loadMore()}
          className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
        >
          {t('cafes.error.retry')}
        </button>
      </div>
    );
  }

  if (!loadingInitial && items.length === 0 && !error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          {t('filters.noResults')}
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {t('sections.horizontal.emptyDescription')}
        </p>
      </div>
    );
  }

  return (
    <>
      {showResultsText && (
        <div className="my-0 text-sm text-gray-600 dark:text-gray-400 text-center">
          {resultsText}
        </div>
      )}

      <div className="pt-3 pb-12 px-2 sm:px-4 overflow-hidden flex justify-center w-full">
        <div className="w-full max-w-5xl flex justify-center">
          <CardGrid columns="auto" gap="medium">
            {items.map((cafe) => {
              const { name } = getCafeI18n(cafe, locale);
              if (!name || !cafe.city || !cafe.state || !cafe.location?.address || !cafe.slug) {
                return (
                  <div
                    key={`cafe-missing-${cafe.slug || cafe.id}`}
                    className="w-full max-w-[320px] h-[427px] flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-xl shadow-lg text-red-700 dark:text-red-200"
                  >
                    <span>{t('cafes.missingData')}</span>
                  </div>
                );
              }

              return <CafeCard key={`cafe-${cafe.slug}`} cafe={cafe} hideMeta={true} />;
            })}

            {loadingInitial &&
              Array.from({ length: 6 }).map((_, index) => (
                <CafeCardSkeleton key={`cafe-skeleton-initial-${index}`} />
              ))}

            {loadingMore &&
              Array.from({ length: 3 }).map((_, index) => (
                <CafeCardSkeleton key={`cafe-skeleton-more-${index}`} />
              ))}
          </CardGrid>
        </div>
      </div>

      {error && (
        <div className="flex flex-col items-center gap-3 pb-12 text-center">
          <p className="text-sm text-red-600 dark:text-red-400">{t('cafes.error.description')}</p>
          <button
            type="button"
            onClick={() => loadMore()}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-colors"
          >
            {t('cafes.error.retry')}
          </button>
        </div>
      )}

      <div ref={sentinelRef} className="h-1 w-full" aria-hidden="true" />
    </>
  );
}

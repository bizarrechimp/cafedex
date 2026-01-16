import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type CacheEntry<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
  filtered: number;
  timestamp: number;
};

const CACHE_TTL_MS = 2 * 60 * 1000;
const MAX_CACHE_ENTRIES = 20;
const LOAD_COOLDOWN_MS = 300;

const listCache = new Map<string, CacheEntry<unknown>>();

const pruneCache = (maxEntries: number) => {
  if (listCache.size <= maxEntries) return;
  const entries = Array.from(listCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
  const excess = entries.length - maxEntries;
  for (let i = 0; i < excess; i += 1) {
    listCache.delete(entries[i][0]);
  }
};

export interface InfiniteListResponse<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
  total: number;
  filtered: number;
}

interface UseInfiniteListOptions<T> {
  queryKey: string;
  fetchPage: (cursor: string | null, signal: AbortSignal) => Promise<InfiniteListResponse<T>>;
  getItemId: (item: T) => string;
  initialItems?: T[];
  initialCursor?: string | null;
  initialHasMore?: boolean;
  initialTotal?: number;
  initialFiltered?: number;
  initialKey?: string;
  cacheTtlMs?: number;
  maxCacheEntries?: number;
}

export const useInfiniteList = <T>(options: UseInfiniteListOptions<T>) => {
  const {
    queryKey,
    fetchPage,
    getItemId,
    initialItems = [],
    initialCursor = null,
    initialHasMore = false,
    initialTotal = 0,
    initialFiltered = 0,
    initialKey,
    cacheTtlMs = CACHE_TTL_MS,
    maxCacheEntries = MAX_CACHE_ENTRIES,
  } = options;

  const [items, setItems] = useState<T[]>(initialItems);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);
  const [total, setTotal] = useState<number>(initialTotal);
  const [filtered, setFiltered] = useState<number>(initialFiltered);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(
    initialItems.length === 0 && initialHasMore
  );
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const inflightRef = useRef<AbortController | null>(null);
  const lastLoadRef = useRef<number>(0);
  const activeKeyRef = useRef<string>(queryKey);
  const requestIdRef = useRef<number>(0);

  const cacheKey = useMemo(() => queryKey, [queryKey]);

  const clearInflight = useCallback(() => {
    if (inflightRef.current) {
      inflightRef.current.abort();
      inflightRef.current = null;
    }
  }, []);

  const setCacheEntry = useCallback(
    (entryKey: string, entry: CacheEntry<T>) => {
      listCache.set(entryKey, entry);
      if (listCache.size > maxCacheEntries) {
        pruneCache(maxCacheEntries);
      }
    },
    [maxCacheEntries]
  );

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    if (inflightRef.current) return;
    if (Date.now() - lastLoadRef.current < LOAD_COOLDOWN_MS) return;

    const isInitialLoad = items.length === 0;
    setLoadingMore(true);
    setError(null);
    lastLoadRef.current = Date.now();
    clearInflight();

    const controller = new AbortController();
    const requestId = (requestIdRef.current += 1);
    inflightRef.current = controller;

    try {
      const response = await fetchPage(nextCursor, controller.signal);
      const merged = [...items, ...response.items];
      const deduped = new Map<string, T>();
      merged.forEach((item) => {
        deduped.set(getItemId(item), item);
      });

      const nextItems = Array.from(deduped.values());
      setItems(nextItems);
      setNextCursor(response.nextCursor);
      setHasMore(response.hasMore);
      setTotal(response.total);
      setFiltered(response.filtered);

      setCacheEntry(activeKeyRef.current, {
        items: nextItems,
        nextCursor: response.nextCursor,
        hasMore: response.hasMore,
        total: response.total,
        filtered: response.filtered,
        timestamp: Date.now(),
      });
    } catch (loadError) {
      if (!controller.signal.aborted) {
        setError(loadError as Error);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setLoadingMore(false);
        if (isInitialLoad) {
          setLoadingInitial(false);
        }
      }
      if (inflightRef.current === controller) {
        inflightRef.current = null;
      }
    }
  }, [clearInflight, fetchPage, getItemId, hasMore, items, loadingMore, nextCursor, setCacheEntry]);

  useEffect(() => {
    activeKeyRef.current = cacheKey;
    clearInflight();
    setError(null);
    setLoadingMore(false);

    const cached = listCache.get(cacheKey) as CacheEntry<T> | undefined;
    const isCacheValid = cached && Date.now() - cached.timestamp < cacheTtlMs;
    const canUseInitial =
      initialKey === cacheKey &&
      (initialItems.length > 0 || initialHasMore === false || initialTotal === 0);

    if (isCacheValid && cached) {
      setItems(cached.items);
      setNextCursor(cached.nextCursor);
      setHasMore(cached.hasMore);
      setTotal(cached.total);
      setFiltered(cached.filtered);
      setLoadingInitial(false);
      return;
    }

    if (canUseInitial) {
      setItems(initialItems);
      setNextCursor(initialCursor);
      setHasMore(initialHasMore);
      setTotal(initialTotal);
      setFiltered(initialFiltered);
      setLoadingInitial(false);
      return;
    }

    setItems([]);
    setNextCursor(null);
    setHasMore(true);
    setTotal(0);
    setFiltered(0);
    setLoadingInitial(true);
  }, [
    cacheKey,
    cacheTtlMs,
    clearInflight,
    initialCursor,
    initialFiltered,
    initialHasMore,
    initialItems,
    initialKey,
    initialTotal,
  ]);

  useEffect(() => {
    if (!loadingInitial || items.length > 0) return;
    loadMore();
  }, [items.length, loadMore, loadingInitial]);

  useEffect(() => {
    return () => {
      clearInflight();
    };
  }, [clearInflight]);

  return {
    items,
    nextCursor,
    hasMore,
    total,
    filtered,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
  };
};

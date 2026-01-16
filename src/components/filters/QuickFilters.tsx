'use client';

import { Chip } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { useI18n } from '@/lib/i18n/client';

interface QuickFiltersProps {
  isVisible: boolean;
  activeFilters?: string[];
}

const QUICK_FILTERS = [
  { key: 'open_now', services: [] },
  { key: 'pet_friendly', services: ['dog_friendly'] },
  { key: 'wifi', services: ['free_wifi'] },
  { key: 'vegan', services: ['vegan_options'] },
  { key: 'outdoor', services: ['outdoor_seating'] },
  { key: 'breakfast', services: ['breakfast'] },
  { key: 'workspace', services: ['laptop_friendly'] },
  { key: 'roastery', services: [] },
];

export default function QuickFilters({ isVisible, activeFilters = [] }: QuickFiltersProps) {
  const router = useRouter();
  const { t } = useI18n();

  const filterLabels: Record<string, string> = useMemo(
    () => ({
      open_now: t('filters.quick.openNow'),
      pet_friendly: t('filters.quick.petFriendly'),
      wifi: t('filters.quick.wifi'),
      vegan: t('filters.quick.vegan'),
      outdoor: t('filters.quick.outdoor'),
      breakfast: t('filters.quick.breakfast'),
      workspace: t('filters.quick.workspace'),
      roastery: t('filters.quick.roastery'),
    }),
    [t]
  );

  const handleFilterToggle = useCallback(
    (filterKey: string) => {
      const url = new URL(window.location.href);
      const currentFilters = url.searchParams.get('filters')?.split(',') || [];

      if (currentFilters.includes(filterKey)) {
        // Remove filter
        const updated = currentFilters.filter((f) => f !== filterKey);
        if (updated.length === 0) {
          url.searchParams.delete('filters');
        } else {
          url.searchParams.set('filters', updated.join(','));
        }
      } else {
        // Add filter
        currentFilters.push(filterKey);
        url.searchParams.set('filters', currentFilters.join(','));
      }

      // Reset to page 1 when filtering
      url.searchParams.delete('page');
      router.push(url.pathname + url.search);
    },
    [router]
  );

  if (!isVisible) return null;

  return (
    <div className="w-full py-0 px-0 flex justify-center">
      <div className="flex flex-wrap gap-2 justify-center max-w-5xl">
        {QUICK_FILTERS.map((filter) => {
          const isActive = activeFilters.includes(filter.key);
          return (
            <Chip
              key={filter.key}
              onClick={() => handleFilterToggle(filter.key)}
              className={`cursor-pointer transition-all text-xs py-0 h-8 ${
                isActive
                  ? 'border-amber-500 bg-amber-500 text-white'
                  : 'bg-white dark:bg-slate-700 border-gray-300 text-gray-700 dark:border-slate-600 dark:text-gray-200'
              }`}
              color="default"
              variant="bordered"
              size="sm"
            >
              {filterLabels[filter.key] || filter.key}
            </Chip>
          );
        })}
      </div>
    </div>
  );
}

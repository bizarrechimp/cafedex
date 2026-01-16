'use client';

import { Input } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n/client';

interface SearchBarProps {
  onToggleFilters: () => void;
  showFiltersButton?: boolean;
}

export default function SearchBar({ onToggleFilters, showFiltersButton = true }: SearchBarProps) {
  const router = useRouter();
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (query: string) => {
      const url = new URL(window.location.href);

      if (query.trim() === '') {
        url.searchParams.delete('search');
      } else {
        url.searchParams.set('search', query);
        // Reset to page 1 when searching
        url.searchParams.delete('page');
      }

      router.push(url.pathname + url.search);
    },
    [router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Trigger search immediately if >= 3 characters
    if (query.length >= 3) {
      handleSearch(query);
    } else if (query.length === 0) {
      // Clear search if empty
      handleSearch('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    router.push(url.pathname + url.search);
  };

  const showClearButton = searchQuery.trim().length > 0;

  return (
    <div className="w-full">
      <Input
        placeholder={t('search.placeholder')}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label={t('search.aria')}
        size="sm"
        startContent={
          <svg
            className="w-4 h-4 text-brand-ink/60 dark:text-brand-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        }
        endContent={
          <div className="flex items-center gap-1 text-brand-ink/60 dark:text-brand-secondary">
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center justify-center hover:text-brand-primary transition-colors p-0 w-6 h-6"
                aria-label={t('search.clear')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            {showFiltersButton && (
              <button
                type="button"
                onClick={onToggleFilters}
                className="flex items-center justify-center hover:text-brand-primary transition-colors p-0 w-6 h-6"
                aria-label={t('search.toggleFilters')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </button>
            )}
          </div>
        }
        color="primary"
        variant="bordered"
        className="w-full"
        classNames={{
          input:
            'text-ui-label font-ui h-9 bg-white text-brand-ink dark:bg-brand-primary/20 dark:text-brand-secondary',
          inputWrapper: 'h-9 dark:bg-brand-primary/20 dark:border-brand-primary/30',
        }}
      />
    </div>
  );
}

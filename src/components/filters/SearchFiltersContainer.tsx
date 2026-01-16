'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from './SearchBar';
import QuickFilters from './QuickFilters';
import ProvinceFilter from './ProvinceFilter';
import CityFilter from './CityFilter';

interface SearchFiltersContainerProps {
  selectedCity?: string;
  selectedState?: string;
  cities?: string[];
}

export default function SearchFiltersContainer({
  selectedCity = 'all',
  selectedState = '',
  cities = [],
}: SearchFiltersContainerProps) {
  const [showQuickFilters, setShowQuickFilters] = useState(false);
  const searchParams = useSearchParams();

  // Extract active quick filters from URL
  const activeFilters = useMemo(() => {
    const filters = searchParams?.get('filters');
    return filters ? filters.split(',') : [];
  }, [searchParams]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl space-y-3">
        {/* Search Bar */}
        <SearchBar onToggleFilters={() => setShowQuickFilters(!showQuickFilters)} />

        {/* Geographic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ProvinceFilter selectedState={selectedState} />
          <CityFilter cities={cities} selectedCity={selectedCity} />
        </div>

        {/* Quick Filters */}
        <QuickFilters isVisible={showQuickFilters} activeFilters={activeFilters} />
      </div>
    </div>
  );
}

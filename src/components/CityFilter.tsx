'use client';

import { useRouter } from 'next/navigation';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
}

export default function CityFilter({ cities, selectedCity }: CityFilterProps) {
  const router = useRouter();

  return (
    <div className="mb-8">
      <label htmlFor="city-filter" className="block text-lg font-medium mb-2">
        Filtrar por ciudad:
      </label>
      <select
        id="city-filter"
        className="border border-gray-300 rounded px-4 py-2"
        value={selectedCity}
        onChange={(e) => {
          const url = new URL(window.location.href);
          if (e.target.value === 'all') {
            url.searchParams.delete('city');
          } else {
            url.searchParams.set('city', e.target.value);
          }
          router.push(url.pathname + url.search);
        }}
      >
        <option value="all">Todas</option>
        {cities.map((city) => (
          <option key={`city-${city}`} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

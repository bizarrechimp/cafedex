'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectItem } from '@heroui/react';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
}

export default function CityFilter({ cities, selectedCity }: CityFilterProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    if (e.target.value === 'all') {
      url.searchParams.delete('city');
    } else {
      url.searchParams.set('city', e.target.value);
    }
    router.push(url.pathname + url.search);
  };

  const allCities = ['all', ...cities];

  return (
    <div className="w-full md:max-w-xs">
      <Select
        label="Filtrar por ciudad"
        placeholder="Selecciona una ciudad"
        selectedKeys={selectedCity ? [selectedCity] : ['all']}
        onChange={handleChange}
        color="warning"
        variant="bordered"
        className="w-full"
        classNames={{
          label: 'text-gray-700 dark:text-gray-300 font-medium',
          trigger: 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600',
        }}
      >
        {allCities.map((city) => (
          <SelectItem key={city} textValue={city === 'all' ? 'Todas las ciudades' : city}>
            {city === 'all' ? 'Todas las ciudades' : city}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

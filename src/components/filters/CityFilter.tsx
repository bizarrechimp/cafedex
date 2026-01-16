'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectItem } from '@heroui/react';
import { useI18n } from '@/lib/i18n/client';

interface CityFilterProps {
  cities: string[];
  selectedCity: string;
}

export default function CityFilter({ cities, selectedCity }: CityFilterProps) {
  const router = useRouter();
  const { t } = useI18n();

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
    <div className="w-full">
      <Select
        label={t('filters.city.label')}
        placeholder={t('filters.city.placeholder')}
        selectedKeys={selectedCity ? [selectedCity] : ['all']}
        onChange={handleChange}
        color="primary"
        variant="bordered"
        size="sm"
        className="w-full"
        classNames={{
          label: 'text-ui-label font-ui text-brand-ink',
          trigger:
            'bg-white border border-brand-beige h-10 min-h-10 text-brand-ink',
          popoverContent: 'text-body-s font-ui',
        }}
      >
        {allCities.map((city) => (
          <SelectItem key={city} textValue={city === 'all' ? t('filters.city.all') : city}>
            {city === 'all' ? t('filters.city.all') : city}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { Select, SelectItem } from '@heroui/react';
import { getActiveProvinces } from '@/lib/constants/provinces';
import { useI18n } from '@/lib/i18n/client';

interface ProvinceFilterProps {
  selectedState: string;
}

export default function ProvinceFilter({ selectedState }: ProvinceFilterProps) {
  const router = useRouter();
  const { t } = useI18n();
  const provinces = getActiveProvinces();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    if (e.target.value === 'all') {
      url.searchParams.delete('state');
    } else {
      url.searchParams.set('state', e.target.value);
    }
    router.push(url.pathname + url.search);
  };

  return (
    <div className="w-full md:max-w-[220px]">
      <Select
        label={t('filters.province.label')}
        placeholder={t('filters.province.placeholder')}
        selectedKeys={selectedState ? [selectedState] : []}
        onChange={handleChange}
        color="warning"
        variant="bordered"
        className="w-full"
        classNames={{
          label: 'text-gray-700 dark:text-gray-300 font-medium',
          trigger: 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600',
        }}
      >
        {provinces.map((p) => (
          <SelectItem key={p.name} textValue={p.name}>
            {p.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

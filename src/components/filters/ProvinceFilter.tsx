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
    <div className="w-full">
      <Select
        label={t('filters.province.label')}
        placeholder={t('filters.province.placeholder')}
        selectedKeys={selectedState ? [selectedState] : []}
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
        {provinces.map((p) => (
          <SelectItem key={p.name} textValue={p.name}>
            {p.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

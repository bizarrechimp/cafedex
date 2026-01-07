'use client';

import { useRouter } from 'next/navigation';
import { getActiveProvinces } from '@/lib/data/provinces';

interface ProvinceFilterProps {
  selectedState: string;
}

export default function ProvinceFilter({ selectedState }: ProvinceFilterProps) {
  const router = useRouter();
  const provinces = getActiveProvinces(); // for MVP this will return only Alicante

  return (
    <div className="mb-8">
      <label htmlFor="state-filter" className="block text-lg font-medium mb-2">
        Filtrar por provincia:
      </label>
      <select
        id="state-filter"
        className="border border-gray-300 rounded px-4 py-2"
        value={selectedState}
        onChange={(e) => {
          const url = new URL(window.location.href);
          if (e.target.value === 'all') {
            url.searchParams.delete('state');
          } else {
            url.searchParams.set('state', e.target.value);
          }
          router.push(url.pathname + url.search);
        }}
      >
        <option value="all">Todas</option>
        {provinces.map((p) => (
          <option key={`state-${p.code}`} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

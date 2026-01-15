'use client';

import CafeInfoSection from './CafeInfoSection';
import { useI18n } from '@/lib/i18n/client';
import { DAY_ORDER, formatOpeningHoursValue, getDayLabel } from '@/lib/i18n/cafe';
import type { WeekdayCode } from '@/types/cafe';

interface OpeningHoursProps {
  hours: Partial<Record<WeekdayCode, string>>;
}

export default function OpeningHours({ hours }: OpeningHoursProps) {
  const { t } = useI18n();
  const entries = DAY_ORDER.filter((day) => hours[day]).map((day) => [day, hours[day] ?? '']);

  return (
    <CafeInfoSection icon="🕒" title={t('cafe.openingHours.title')}>
      <div className="space-y-3">
        {entries.map(([day, time]) => (
          <div
            key={day}
            className="flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50 pb-2 last:border-0 last:pb-0"
          >
            <span className="text-gray-500 dark:text-gray-400 font-medium">
              {getDayLabel(day as WeekdayCode, t)}
            </span>
            <span className="text-gray-900 dark:text-white font-bold">
              {formatOpeningHoursValue(time, t)}
            </span>
          </div>
        ))}
      </div>
    </CafeInfoSection>
  );
}

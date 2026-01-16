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
            className="flex justify-between items-center border-b border-brand-beige/70 pb-2 last:border-0 last:pb-0"
          >
            <span className="text-body-s font-ui text-brand-ink/70 font-medium">
              {getDayLabel(day as WeekdayCode, t)}
            </span>
            <span className="text-body-s font-ui text-brand-ink font-semibold">
              {formatOpeningHoursValue(time, t)}
            </span>
          </div>
        ))}
      </div>
    </CafeInfoSection>
  );
}

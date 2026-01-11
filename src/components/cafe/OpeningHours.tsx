'use client';

import CafeInfoSection from './CafeInfoSection';

interface OpeningHoursProps {
  hours: Record<string, string>;
}

export default function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <CafeInfoSection icon="🕒" title="Horario">
      <div className="space-y-3">
        {Object.entries(hours).map(([day, time]) => (
          <div
            key={day}
            className="flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50 pb-2 last:border-0 last:pb-0"
          >
            <span className="text-gray-500 dark:text-gray-400 font-medium">{day}</span>
            <span className="text-gray-900 dark:text-white font-bold">{time}</span>
          </div>
        ))}
      </div>
    </CafeInfoSection>
  );
}

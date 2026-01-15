'use client';

import CafeInfoSection from './CafeInfoSection';
import { useI18n } from '@/lib/i18n/client';

interface LocationSectionProps {
  address: string;
  googleMapsUrl: string;
}

export default function LocationSection({ address, googleMapsUrl }: LocationSectionProps) {
  const { t } = useI18n();

  return (
    <CafeInfoSection icon="📍" title={t('cafe.location.title')}>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-snug">{address}</p>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 font-bold rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors w-full md:w-auto"
      >
        {t('cafe.location.openMaps')}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </CafeInfoSection>
  );
}

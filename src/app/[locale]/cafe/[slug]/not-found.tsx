'use client';

import Link from 'next/link';
import { useI18n } from '@/lib/i18n/client';
import { localizePathname } from '@/lib/i18n/routing';
import { useLocale } from '@/lib/i18n/useLocale';

export default function NotFound() {
  const { t } = useI18n();
  const locale = useLocale();

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t('cafe.notFound.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{t('cafe.notFound.description')}</p>
        <Link
          href={localizePathname('/cafeterias', locale)}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          {t('cafe.notFound.cta')}
        </Link>
      </div>
    </main>
  );
}

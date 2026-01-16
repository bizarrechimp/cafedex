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
        <h2 className="text-h2 font-display mb-4">{t('cafe.notFound.title')}</h2>
        <p className="text-body-m font-ui text-brand-ink/70 mb-8">
          {t('cafe.notFound.description')}
        </p>
        <Link
          href={localizePathname('/cafeterias', locale)}
          className="inline-block bg-brand-primary text-white px-6 py-3 rounded-full text-ui-button font-ui hover:bg-brand-primary/90 transition-colors"
        >
          {t('cafe.notFound.cta')}
        </Link>
      </div>
    </main>
  );
}

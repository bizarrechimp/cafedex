'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';
import { useI18n } from '@/lib/i18n/client';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useI18n();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      logger.error('[Cafeterias Page Error]', _error);
    }
  }, [_error]);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-h2 font-display mb-4">{t('cafes.error.title')}</h2>
        <p className="text-body-m font-ui text-brand-ink/70 mb-8">
          {t('cafes.error.description')}
        </p>
        <button
          onClick={() => reset()}
          className="bg-brand-primary text-white px-6 py-3 rounded-full text-ui-button font-ui hover:bg-brand-primary/90 transition-colors"
        >
          {t('cafes.error.retry')}
        </button>
      </div>
    </main>
  );
}

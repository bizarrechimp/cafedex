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
      logger.error('[App Error]', _error);
    }
  }, [_error]);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t('app.error.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{t('app.error.description')}</p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          {t('app.error.retry')}
        </button>
      </div>
    </main>
  );
}

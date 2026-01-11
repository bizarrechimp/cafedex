'use client';

import { logger } from '@/lib/logger';
import { useEffect } from 'react';

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      logger.error('[Cafeterias Page Error]', _error);
    }
  }, [_error]);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Error de conexión</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lo sentimos, ha ocurrido un error al cargar la lista de cafeterías.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}

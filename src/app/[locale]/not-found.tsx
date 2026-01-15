'use client';

import Link from 'next/link';
import { Button, Card, CardBody } from '@heroui/react';
import { useI18n } from '@/lib/i18n/client';
import { localizePathname } from '@/lib/i18n/routing';
import { useLocale } from '@/lib/i18n/useLocale';

export default function NotFound() {
  const { t } = useI18n();
  const locale = useLocale();

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.2),_transparent_60%)]" />
      <div className="container relative z-10 flex min-h-[70vh] items-center justify-center py-16">
        <Card className="card-custom w-full max-w-xl border border-amber-200/70 dark:border-amber-500/20">
          <CardBody className="gap-6 p-8 text-center">
            <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
              404
            </span>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {t('app.notFound.title')}
              </h2>
              <p className="text-muted mt-3">{t('app.notFound.description')}</p>
            </div>
            <Button
              as={Link}
              href={localizePathname('/', locale)}
              color="warning"
              variant="solid"
              className="mx-auto w-full max-w-[220px] font-semibold"
            >
              {t('app.notFound.cta')}
            </Button>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}

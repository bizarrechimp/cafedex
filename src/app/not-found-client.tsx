'use client';

import Link from 'next/link';
import { Button, Card, CardBody } from '@heroui/react';
import ThemeProvider from '@/providers/ThemeProvider';
import { Locale } from '@/lib/i18n/config';
import { getTranslator } from '@/lib/i18n';
import { localizePathname } from '@/lib/i18n/routing';

interface NotFoundClientProps {
  locale: Locale;
}

export default function NotFoundClient({ locale }: NotFoundClientProps) {
  const { t } = getTranslator(locale);

  return (
    <ThemeProvider>
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(230,153,76,0.2),_transparent_60%)]" />
        <div className="container relative z-10 flex min-h-[70vh] items-center justify-center py-16">
          <Card className="card-custom w-full max-w-xl border border-brand-beige">
            <CardBody className="gap-6 p-8 text-center">
              <span className="mx-auto inline-flex items-center gap-2 rounded-full bg-brand-warm/80 px-4 py-1 text-ui-label font-ui uppercase tracking-[0.35em] text-brand-primary">
                404
              </span>
              <div>
                <h2 className="text-h2 font-display text-brand-primary">
                  {t('app.notFound.title')}
                </h2>
                <p className="text-body-m font-ui text-muted mt-3">
                  {t('app.notFound.description')}
                </p>
              </div>
              <Button
                as={Link}
                href={localizePathname('/', locale)}
                color="primary"
                variant="solid"
                className="mx-auto w-full max-w-[220px] text-ui-button font-ui"
              >
                {t('app.notFound.cta')}
              </Button>
            </CardBody>
          </Card>
        </div>
      </main>
    </ThemeProvider>
  );
}

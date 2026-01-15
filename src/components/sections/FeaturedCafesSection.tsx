'use client';

import { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/client';

interface FeaturedCafesSectionProps {
  children: ReactNode;
}

export default function FeaturedCafesSection({ children }: FeaturedCafesSectionProps) {
  const { t } = useI18n();

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">{t('home.featured.title')}</h2>
      {children}
    </section>
  );
}

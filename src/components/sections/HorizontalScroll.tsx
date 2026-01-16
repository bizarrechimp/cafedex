'use client';

import { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/client';

interface HorizontalScrollProps {
  children: ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
}

export default function HorizontalScroll({
  children,
  emptyMessage,
  emptyDescription,
}: HorizontalScrollProps) {
  const { t } = useI18n();
  const resolvedMessage = emptyMessage ?? t('sections.horizontal.emptyTitle');
  const resolvedDescription = emptyDescription ?? t('sections.horizontal.emptyDescription');

  // Verificar si no hay elementos
  const childArray = Array.isArray(children) ? children : [children];
  const hasContent = childArray.some((child) => child !== null && child !== undefined);

  if (!hasContent) {
    return (
      <div className="text-center py-16 bg-brand-beige/40 rounded-xl">
        <h3 className="text-h3 font-display text-brand-primary">
          {resolvedMessage}
        </h3>
        <p className="mt-2 text-body-m font-ui text-brand-ink/70">
          {resolvedDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden py-8 pb-12 px-4 horizontal-scroll">
      <div className="flex gap-6 min-w-min">{children}</div>
    </div>
  );
}

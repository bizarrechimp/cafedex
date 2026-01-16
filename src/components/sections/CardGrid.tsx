'use client';

import { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/client';

interface CardGridProps {
  children: ReactNode;
  columns?: 'auto' | '1' | '2' | '3' | '4';
  gap?: 'small' | 'medium' | 'large';
  emptyMessage?: string;
}

const columnClasses = {
  auto: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  '1': 'grid-cols-1',
  '2': 'grid-cols-2',
  '3': 'grid-cols-3',
  '4': 'grid-cols-4',
};

const gapClasses = {
  small: 'gap-4',
  medium: 'gap-6',
  large: 'gap-8',
};

export default function CardGrid({
  children,
  columns = 'auto',
  gap = 'medium',
  emptyMessage,
}: CardGridProps) {
  const { t } = useI18n();
  const resolvedEmptyMessage = emptyMessage ?? t('sections.cardGrid.emptyMessage');
  const childArray = Array.isArray(children) ? children.filter(Boolean) : [children];
  const hasContent = childArray.length > 0;

  if (!hasContent) {
    return (
      <div className="text-center py-16 bg-brand-beige/40 rounded-xl">
        <p className="text-body-m font-ui text-brand-ink/70">{resolvedEmptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]} w-full justify-items-center sm:justify-items-start`}
    >
      {children}
    </div>
  );
}

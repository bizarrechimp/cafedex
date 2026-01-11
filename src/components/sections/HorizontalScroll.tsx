'use client';

import { ReactNode } from 'react';

interface HorizontalScrollProps {
  children: ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
}

export default function HorizontalScroll({
  children,
  emptyMessage = 'No hay cafeterías disponibles',
  emptyDescription = 'Intenta cambiar los filtros o vuelve más tarde.',
}: HorizontalScrollProps) {
  // Verificar si no hay elementos
  const childArray = Array.isArray(children) ? children : [children];
  const hasContent = childArray.some((child) => child !== null && child !== undefined);

  if (!hasContent) {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <h3 className="text-xl text-gray-600 dark:text-gray-400">{emptyMessage}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto overflow-y-hidden py-8 pb-12 px-4 horizontal-scroll">
      <div className="flex gap-6 min-w-min">{children}</div>
    </div>
  );
}

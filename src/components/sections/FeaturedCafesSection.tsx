'use client';

import { ReactNode } from 'react';

interface FeaturedCafesSectionProps {
  children: ReactNode;
}

export default function FeaturedCafesSection({ children }: FeaturedCafesSectionProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Cafeterías Destacadas</h2>
      {children}
    </section>
  );
}

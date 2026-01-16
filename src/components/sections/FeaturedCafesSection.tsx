'use client';

import { ReactNode } from 'react';

interface FeaturedCafesSectionProps {
  children: ReactNode;
}

export default function FeaturedCafesSection({ children }: FeaturedCafesSectionProps) {
  return (
    <section className="mb-16">
      {children}
    </section>
  );
}

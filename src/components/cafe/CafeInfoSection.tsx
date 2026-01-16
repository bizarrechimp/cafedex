'use client';

import React from 'react';

interface CafeInfoSectionProps {
  icon: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function CafeInfoSection({ icon, title, subtitle, children }: CafeInfoSectionProps) {
  return (
    <section className="bg-brand-beige/40 p-8 rounded-2xl border border-brand-beige shadow-sm">
      <h2 className="text-h2 font-display mb-6 flex items-center">
        <span className="w-8 h-8 bg-brand-warm text-brand-primary rounded-lg flex items-center justify-center mr-3">
          {icon}
        </span>
        {title}
      </h2>
      {subtitle && (
        <p className="text-body-m font-ui text-brand-ink/70 mb-4">{subtitle}</p>
      )}
      {children}
    </section>
  );
}

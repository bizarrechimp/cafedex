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
    <section className="bg-gray-50 dark:bg-gray-800/40 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center mr-3">
          {icon}
        </span>
        {title}
      </h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 mb-4">{subtitle}</p>}
      {children}
    </section>
  );
}

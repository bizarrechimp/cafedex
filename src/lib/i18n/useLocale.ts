'use client';

import { useParams } from 'next/navigation';
import { defaultLocale, isLocale, Locale } from './config';

export const useLocale = (): Locale => {
  const params = useParams();
  const value = typeof params?.locale === 'string' ? params.locale : undefined;
  return isLocale(value) ? value : defaultLocale;
};

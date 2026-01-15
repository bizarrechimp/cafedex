'use client';

import { useMemo } from 'react';
import { getTranslator } from './index';
import { useLocale } from './useLocale';

export const useI18n = () => {
  const locale = useLocale();

  return useMemo(() => getTranslator(locale), [locale]);
};

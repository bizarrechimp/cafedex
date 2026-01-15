import { headers } from 'next/headers';
import { defaultLocale, isLocale, Locale } from './config';
import { getTranslator } from './index';

export const getRequestLocale = async (): Promise<Locale> => {
  const headerList = await headers();
  const headerValue = headerList.get('x-cafedex-locale');
  return isLocale(headerValue) ? headerValue : defaultLocale;
};

export const getServerTranslations = (locale?: Locale) => {
  const resolvedLocale = locale ?? defaultLocale;
  return getTranslator(resolvedLocale);
};

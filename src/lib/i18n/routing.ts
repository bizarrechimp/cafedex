import { defaultLocale, isLocale, Locale } from './config';

export const getLocaleFromPathname = (pathname: string): Locale => {
  const [, segment] = pathname.split('/');
  return isLocale(segment) ? segment : defaultLocale;
};

export const stripLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split('/');
  const locale = segments[1];
  if (isLocale(locale)) {
    return `/${segments.slice(2).join('/')}`.replace(/\/$/, '') || '/';
  }
  return pathname || '/';
};

export const localizePathname = (pathname: string, locale: Locale): string => {
  const basePath = stripLocaleFromPathname(pathname);
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
};

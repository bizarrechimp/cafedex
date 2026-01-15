import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale } from './src/lib/i18n/config';
import { parsePreferencesCookie, PREFERENCES_COOKIE } from './src/lib/preferences';

const PUBLIC_FILE = /\.(.*)$/;

const getPreferredLocale = (request: NextRequest) => {
  const cookieValue = request.cookies.get(PREFERENCES_COOKIE)?.value;
  const { prefs } = parsePreferencesCookie(cookieValue);
  if (prefs.language && isLocale(prefs.language)) {
    return prefs.language;
  }
  return defaultLocale;
};

const setLocaleCookie = (response: NextResponse, locale: string, request: NextRequest) => {
  const cookieValue = request.cookies.get(PREFERENCES_COOKIE)?.value;
  const { prefs } = parsePreferencesCookie(cookieValue);
  if (prefs.language === locale) {
    return;
  }

  const payload = encodeURIComponent(JSON.stringify({ ...prefs, language: locale }));
  response.cookies.set(PREFERENCES_COOKIE, payload, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
  });
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const [, maybeLocale] = pathname.split('/');
  if (isLocale(maybeLocale)) {
    const response = NextResponse.next();
    response.headers.set('x-cafedex-locale', maybeLocale);
    setLocaleCookie(response, maybeLocale, request);
    return response;
  }

  const preferredLocale = getPreferredLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === '/' ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
};

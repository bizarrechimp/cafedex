import { cookies } from 'next/headers';
import { defaultLocale, isLocale } from '@/lib/i18n/config';
import { parsePreferencesCookie, PREFERENCES_COOKIE } from '@/lib/preferences';
import NotFoundClient from './not-found-client';

export default function NotFound() {
  const cookieStore = cookies();
  const raw = cookieStore.get(PREFERENCES_COOKIE)?.value;
  const { prefs } = parsePreferencesCookie(raw);
  const locale = isLocale(prefs.language) ? prefs.language : defaultLocale;

  return <NotFoundClient locale={locale} />;
}

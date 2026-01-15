import type { TFunction } from '@/lib/i18n/types';
import { defaultLocale, Locale } from '@/lib/i18n/config';
import type { Cafe, WeekdayCode, BrewMethodCode, ServiceCode, ServingCode } from '@/types/cafe';

export const DAY_ORDER: WeekdayCode[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const DAY_LABEL_KEYS: Record<WeekdayCode, string> = {
  mon: 'day.mon',
  tue: 'day.tue',
  wed: 'day.wed',
  thu: 'day.thu',
  fri: 'day.fri',
  sat: 'day.sat',
  sun: 'day.sun',
};

export const getDayLabel = (day: WeekdayCode, t: TFunction) => {
  return t(DAY_LABEL_KEYS[day]);
};

export const formatOpeningHoursValue = (value: string, t: TFunction) => {
  return value === 'closed' ? t('hours.closed') : value;
};

export const getCafeI18n = (cafe: Cafe, locale: Locale) => {
  const fallbackLocale = cafe.i18n?.[defaultLocale];
  const localized = cafe.i18n?.[locale] ?? fallbackLocale;
  const name = localized?.name ?? (cafe as unknown as { name?: string }).name ?? '';
  const description =
    localized?.description ?? (cafe as unknown as { description?: string }).description ?? '';

  return { name, description };
};

export const translateBrewMethod = (code: BrewMethodCode, t: TFunction) => {
  return t(`cafe.brew_methods.${code}`);
};

export const translateService = (code: ServiceCode, t: TFunction) => {
  return t(`cafe.services.${code}`);
};

export const translateServing = (code: ServingCode, t: TFunction) => {
  return t(`cafe.serving.${code}`);
};

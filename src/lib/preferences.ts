import { defaultLocale, isLocale, Locale } from '@/lib/i18n/config';

export type ThemePreference = 'light' | 'dark';

export interface UserPreferences {
  version: 1;
  theme?: ThemePreference;
  language?: Locale;
  cookies?: {
    functional?: boolean;
    analytics?: boolean;
    marketing?: boolean;
  };
}

export const PREFERENCES_COOKIE = 'cafedex_prefs';

export const DEFAULT_PREFERENCES: UserPreferences = {
  version: 1,
  theme: 'light',
  language: defaultLocale,
  cookies: {
    functional: true,
    analytics: false,
    marketing: false,
  },
};

export const normalizePreferences = (input?: Partial<UserPreferences> | null): UserPreferences => {
  const theme = input?.theme === 'dark' || input?.theme === 'light' ? input.theme : undefined;
  const language = isLocale(input?.language) ? input?.language : undefined;

  return {
    ...DEFAULT_PREFERENCES,
    ...input,
    theme: theme ?? DEFAULT_PREFERENCES.theme,
    language: language ?? DEFAULT_PREFERENCES.language,
    cookies: {
      ...DEFAULT_PREFERENCES.cookies,
      ...input?.cookies,
    },
  };
};

export const mergePreferences = (
  base: UserPreferences,
  next: Partial<UserPreferences>
): UserPreferences => {
  return normalizePreferences({
    ...base,
    ...next,
    cookies: {
      ...base.cookies,
      ...next.cookies,
    },
  });
};

export const parsePreferencesCookie = (raw?: string | null) => {
  if (!raw) {
    return { prefs: DEFAULT_PREFERENCES, hasCookie: false };
  }

  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded) as UserPreferences;
    return { prefs: normalizePreferences(parsed), hasCookie: true };
  } catch {
    return { prefs: DEFAULT_PREFERENCES, hasCookie: false };
  }
};

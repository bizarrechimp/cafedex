import en from './locales/en.json';
import es from './locales/es.json';

export const translations = {
  en,
  es,
} as const;

export type TranslationKey = keyof typeof es;

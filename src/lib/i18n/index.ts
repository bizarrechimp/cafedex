import { defaultLocale, Locale } from './config';
import { translations, TranslationKey } from './translations';

type InterpolationValues = Record<string, string | number>;

const formatMessage = (template: string, values?: InterpolationValues) => {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
};

export const getTranslator = (locale: Locale) => {
  const messages = translations[locale] ?? translations[defaultLocale];

  const t = (key: TranslationKey, values?: InterpolationValues) => {
    const template = messages[key] ?? translations[defaultLocale][key] ?? key;
    return formatMessage(template, values);
  };

  return { locale, t };
};

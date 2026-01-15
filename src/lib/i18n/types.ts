import type { TranslationKey } from './translations';

export type TFunction = (key: TranslationKey, values?: Record<string, string | number>) => string;

'use client';

import { useI18n } from '@/lib/i18n/client';
import { translateBrewMethod, translateService, translateServing } from '@/lib/i18n/cafe';
import type { BrewMethodCode, ServiceCode, ServingCode } from '@/types/cafe';

interface SpecialtyFeaturesProps {
  brewMethods?: BrewMethodCode[];
  services?: ServiceCode[];
  serving?: ServingCode[];
}

export default function SpecialtyFeatures({
  brewMethods,
  services,
  serving,
}: SpecialtyFeaturesProps) {
  const { t } = useI18n();

  if (!brewMethods?.length && !services?.length && !serving?.length) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{t('cafe.features.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brewMethods && brewMethods.length > 0 && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-900 dark:text-purple-200 mb-3 flex items-center">
              <span className="mr-2">☕</span> {t('cafe.features.brewMethods')}
            </h3>
            <ul className="space-y-2">
              {brewMethods.map((method) => (
                <li key={method} className="text-sm text-purple-700 dark:text-purple-300">
                  • {translateBrewMethod(method, t)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {services && services.length > 0 && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-900 dark:text-green-200 mb-3 flex items-center">
              <span className="mr-2">🎁</span> {t('cafe.features.services')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-sm text-green-700 dark:text-green-300">
                  • {translateService(service, t)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {serving && serving.length > 0 && (
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-6 rounded-xl border border-orange-200 dark:border-orange-800">
            <h3 className="font-bold text-orange-900 dark:text-orange-200 mb-3 flex items-center">
              <span className="mr-2">🍽️</span> {t('cafe.features.serving')}
            </h3>
            <ul className="space-y-2">
              {serving.map((item) => (
                <li key={item} className="text-sm text-orange-700 dark:text-orange-300">
                  • {translateServing(item, t)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

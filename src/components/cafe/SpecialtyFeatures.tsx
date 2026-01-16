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
      <h2 className="text-h2 font-display mb-6">{t('cafe.features.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {brewMethods && brewMethods.length > 0 && (
          <div className="bg-gradient-to-br from-brand-beige/50 to-brand-warm/60 p-6 rounded-xl border border-brand-beige">
            <h3 className="text-h4 font-display text-brand-primary mb-3 flex items-center">
              <span className="mr-2">☕</span> {t('cafe.features.brewMethods')}
            </h3>
            <ul className="space-y-2">
              {brewMethods.map((method) => (
                <li key={method} className="text-body-s font-ui text-brand-ink">
                  • {translateBrewMethod(method, t)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {services && services.length > 0 && (
          <div className="bg-gradient-to-br from-brand-beige/50 to-brand-warm/60 p-6 rounded-xl border border-brand-beige">
            <h3 className="text-h4 font-display text-brand-primary mb-3 flex items-center">
              <span className="mr-2">🎁</span> {t('cafe.features.services')}
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-body-s font-ui text-brand-ink">
                  • {translateService(service, t)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {serving && serving.length > 0 && (
          <div className="bg-gradient-to-br from-brand-beige/50 to-brand-warm/60 p-6 rounded-xl border border-brand-beige">
            <h3 className="text-h4 font-display text-brand-primary mb-3 flex items-center">
              <span className="mr-2">🍽️</span> {t('cafe.features.serving')}
            </h3>
            <ul className="space-y-2">
              {serving.map((item) => (
                <li key={item} className="text-body-s font-ui text-brand-ink">
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

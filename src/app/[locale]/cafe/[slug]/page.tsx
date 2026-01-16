import { notFound } from 'next/navigation';
import { getCafeBySlug } from '@/lib/services/cafeService';
import { logger } from '@/lib/logger';
import HeroImage from '@/components/cafe/HeroImage';
import PageHeader from '@/components/cafe/PageHeader';
import LocationSection from '@/components/cafe/LocationSection';
import OpeningHours from '@/components/cafe/OpeningHours';
import FeatureBadge from '@/components/ui/FeatureBadge';
import SocialLinks from '@/components/ui/SocialLinks';
import BackLink from '@/components/cafe/BackLink';
import CafeDescription from '@/components/cafe/CafeDescription';
import { getServerTranslations } from '@/lib/i18n/server';
import { isLocale, locales, Locale } from '@/lib/i18n/config';
import {
  getCafeI18n,
  translateBrewMethod,
  translateService,
  translateServing,
} from '@/lib/i18n/cafe';
import type { BrewMethodCode, ServiceCode, ServingCode } from '@/types/cafe';
import { app } from '@/config/app';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const cafe = await getCafeBySlug(slug);
  if (!cafe) {
    return {};
  }

  const { t } = getServerTranslations(locale as Locale);
  const { name, description } = getCafeI18n(cafe, locale as Locale);
  const title = t('metadata.cafe.title', { name });
  const descriptionValue = description || t('metadata.default.description');
  const canonical = `${app.url}/${locale}/cafe/${slug}`;
  const alternates = Object.fromEntries(
    locales.map((itemLocale) => [itemLocale, `${app.url}/${itemLocale}/cafe/${slug}`])
  );

  return {
    title,
    description: descriptionValue,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description: descriptionValue,
      url: canonical,
      siteName: t('metadata.siteName'),
      locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: descriptionValue,
    },
  };
}

export default async function CafePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  try {
    const { locale: rawLocale, slug } = await params;
    if (!isLocale(rawLocale)) {
      notFound();
    }

    const locale = rawLocale as Locale;
    const { t } = getServerTranslations(locale);
    const cafe = await getCafeBySlug(slug);

    if (!cafe) {
      notFound();
    }

    const { image, city, state, location, rating, specialty_features, rrss } = cafe;
    const { name, description } = getCafeI18n(cafe, locale);
    const address = location?.address || '';

    const googleMapsUrl =
      location?.lat && location?.lng
        ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || name)}`;

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <HeroImage src={image} alt={name} title={name} priority />

          <PageHeader title={name} location={{ city, state }} rating={rating} />

          {description && <CafeDescription description={description} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <LocationSection address={address} googleMapsUrl={googleMapsUrl} />
            {specialty_features?.opening_hours &&
            Object.keys(specialty_features.opening_hours).length > 0 ? (
              <OpeningHours hours={specialty_features.opening_hours} />
            ) : null}
          </div>

          {specialty_features?.brew_methods?.length ||
          specialty_features?.services?.length ||
          specialty_features?.serving?.length ? (
            <div className="mb-12">
              <h2 className="text-h2 font-display mb-6">{t('cafe.features.title')}</h2>
              <div className="flex flex-wrap gap-3">
                {(specialty_features?.brew_methods || []).map((feature) => (
                  <FeatureBadge
                    key={`brew-${feature}`}
                    text={translateBrewMethod(feature as BrewMethodCode, t)}
                  />
                ))}
                {(specialty_features?.services || []).map((feature) => (
                  <FeatureBadge
                    key={`service-${feature}`}
                    text={translateService(feature as ServiceCode, t)}
                  />
                ))}
                {(specialty_features?.serving || []).map((feature) => (
                  <FeatureBadge
                    key={`serving-${feature}`}
                    text={translateServing(feature as ServingCode, t)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <SocialLinks
            instagram={rrss?.instagram}
            website={rrss?.website}
            facebook={rrss?.facebook}
          />

          <BackLink />
        </div>
      </main>
    );
  } catch (error) {
    logger.error('Error fetching cafe:', error);
    notFound();
  }
}

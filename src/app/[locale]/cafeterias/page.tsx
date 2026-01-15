import CafeCard from '@/components/cafe/CafeCard';
import { CardGrid } from '@/components/sections';
import { CityFilter, ProvinceFilter, EnsureStateInUrl } from '@/components';
import { getAllCafes, getCafesByState } from '@/lib/services/cafeService';
import { Cafe } from '@/types/cafe';
import { getServerTranslations } from '@/lib/i18n/server';
import { isLocale, locales, Locale } from '@/lib/i18n/config';
import { getCafeI18n } from '@/lib/i18n/cafe';
import { notFound } from 'next/navigation';
import { app } from '@/config/app';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const { t } = getServerTranslations(locale as Locale);
  const title = t('metadata.cafes.title');
  const description = t('metadata.cafes.description');
  const canonical = `${app.url}/${locale}/cafeterias`;
  const alternates = Object.fromEntries(
    locales.map((itemLocale) => [itemLocale, `${app.url}/${itemLocale}/cafeterias`])
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: t('metadata.siteName'),
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CafeteriasPage(props: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const { locale: rawLocale } = await props.params;
  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;
  const { t } = getServerTranslations(locale);
  const searchParams = props.searchParams ? await props.searchParams : undefined;

  const selectedCity = searchParams?.city || 'all';
  const selectedState = searchParams?.state || 'Alicante';

  const allCafes: Cafe[] =
    selectedState === 'Alicante' ? await getCafesByState('Alicante') : await getAllCafes();

  const cities: string[] = Array.from(new Set(allCafes.map((cafe: Cafe) => cafe.city))).sort();

  const filteredCafes: Cafe[] =
    selectedCity === 'all' ? allCafes : allCafes.filter((cafe: Cafe) => cafe.city === selectedCity);

  const cafeNumbers = Object.fromEntries(
    allCafes.map((cafe: Cafe, index: number) => [cafe.slug, index + 1])
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('cafes.title')}</h1>

      {allCafes.length > 0 ? (
        <>
          <div className="flex gap-4 flex-col md:flex-row md:items-end md:gap-8">
            <CityFilter cities={cities} selectedCity={selectedCity} />
            <ProvinceFilter selectedState={selectedState} />
          </div>
          <EnsureStateInUrl />

          <div className="py-8 pb-12 px-4 overflow-hidden">
            <CardGrid columns="auto" gap="medium">
              {filteredCafes.map((cafe: Cafe) => {
                const { name } = getCafeI18n(cafe, locale);
                if (!name || !cafe.city || !cafe.state || !cafe.location?.address || !cafe.slug) {
                  return (
                    <div
                      key={`cafe-missing-${cafe.slug || Math.random()}`}
                      className="w-[320px] h-[427px] flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-xl shadow-lg text-red-700 dark:text-red-200"
                    >
                      <span>{t('cafes.missingData')}</span>
                    </div>
                  );
                }
                return (
                  <CafeCard
                    key={`cafe-${cafe.slug}`}
                    cafe={cafe}
                    number={cafeNumbers[cafe.slug]}
                    hideMeta={true}
                  />
                );
              })}
            </CardGrid>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl text-gray-600 dark:text-gray-400">{t('cafes.empty.title')}</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-500">{t('cafes.empty.description')}</p>
        </div>
      )}
    </main>
  );
}

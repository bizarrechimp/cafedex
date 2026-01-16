import CafeCard from '@/components/cafe/CafeCard';
import { CardGrid } from '@/components/sections';
import { SearchFiltersContainer, EnsureStateInUrl } from '@/components';
import { searchAndFilterCafes, getAllCafes, getCitiesByState } from '@/lib/services/cafeService';
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

  // Extract filter parameters from URL
  const searchQuery = searchParams?.search || '';
  const selectedState = searchParams?.state || 'Alicante';
  const selectedCity = searchParams?.city || 'all';
  const filterString = searchParams?.filters || '';
  const filters = filterString ? filterString.split(',').filter((f) => f.trim()) : [];

  // Fetch all cafes
  const allCafes = await getAllCafes();

  // Get filtered cities based on selected state
  const citiesForState = await getCitiesByState(selectedState);

  // Execute search and filter query (optimized single query to MongoDB)
  const {
    cafes: filteredCafes,
    total,
    filtered,
  } = await searchAndFilterCafes({
    search: searchQuery,
    state: selectedState,
    city: selectedCity,
    filters: filters.length > 0 ? filters : undefined,
  });

  const cafeNumbers = Object.fromEntries(
    allCafes.map((cafe: Cafe, index: number) => [cafe.slug, index + 1])
  );

  const resultsText =
    filteredCafes.length === total
      ? t('filters.showing', { count: filteredCafes.length, total })
      : t('filters.showing', { count: filteredCafes.length, total: filtered });

  return (
    <main className="w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('cafes.title')}</h1>

        <EnsureStateInUrl />

        {/* New unified search and filters component - centered and constrained */}
        <section className="mb-2 flex justify-center">
          <div className="w-full max-w-5xl">
            <SearchFiltersContainer
              selectedCity={selectedCity}
              selectedState={selectedState}
              cities={citiesForState}
            />
          </div>
        </section>

        {/* Results section */}
        {filteredCafes.length > 0 ? (
          <>
            <div className="my-0 text-sm text-gray-600 dark:text-gray-400 text-center">
              {resultsText}
            </div>

            <div className="pt-3 pb-12 px-2 sm:px-4 overflow-hidden flex justify-center w-full">
              <div className="w-full max-w-5xl flex justify-center">
                <CardGrid columns="auto" gap="medium">
                  {filteredCafes.map((cafe: Cafe) => {
                    const { name } = getCafeI18n(cafe, locale);
                    if (
                      !name ||
                      !cafe.city ||
                      !cafe.state ||
                      !cafe.location?.address ||
                      !cafe.slug
                    ) {
                      return (
                        <div
                          key={`cafe-missing-${cafe.slug || Math.random()}`}
                          className="w-full max-w-[320px] h-[427px] flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-xl shadow-lg text-red-700 dark:text-red-200"
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
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {t('filters.noResults')}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              {t('sections.horizontal.emptyDescription')}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

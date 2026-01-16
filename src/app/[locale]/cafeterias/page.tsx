import { SearchFiltersContainer, EnsureStateInUrl, CafesInfiniteList } from '@/components';
import { searchAndFilterCafesPaginated, getCitiesByState } from '@/lib/services/cafeService';
import { getServerTranslations } from '@/lib/i18n/server';
import { isLocale, locales, Locale } from '@/lib/i18n/config';
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

  // Get filtered cities based on selected state
  const citiesForState = await getCitiesByState(selectedState);

  // Fetch first page for the initial render
  const {
    cafes: initialCafes,
    total,
    filtered,
    nextCursor,
    hasMore,
  } = await searchAndFilterCafesPaginated({
    search: searchQuery,
    state: selectedState,
    city: selectedCity,
    filters: filters.length > 0 ? filters : undefined,
    cursor: null,
  });

  const initialQueryParams = new URLSearchParams();
  if (searchQuery) initialQueryParams.set('search', searchQuery);
  if (selectedState) initialQueryParams.set('state', selectedState);
  if (selectedCity) initialQueryParams.set('city', selectedCity);
  if (filters.length > 0) initialQueryParams.set('filters', filters.join(','));

  return (
    <main className="w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-h1 font-display mb-8 text-center">{t('cafes.title')}</h1>

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

        <CafesInfiniteList
          initialCafes={initialCafes}
          initialCursor={nextCursor}
          initialHasMore={hasMore}
          initialTotal={total}
          initialFiltered={filtered}
          initialQueryKey={initialQueryParams.toString()}
          defaultState={selectedState}
          defaultCity={selectedCity}
        />
      </div>
    </main>
  );
}

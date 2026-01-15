import CafeCard from '@/components/cafe/CafeCard';
import { FeaturedCafesSection, HorizontalScroll } from '@/components/sections';
import { getFeaturedCafes, getAllCafes } from '@/lib/services/cafeService';
import { getServerTranslations } from '@/lib/i18n/server';
import { isLocale, locales, Locale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import { app } from '@/config/app';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const { t } = getServerTranslations(locale as Locale);
  const title = t('metadata.home.title');
  const description = t('metadata.home.description');
  const canonical = `${app.url}/${locale}`;
  const alternates = Object.fromEntries(
    locales.map((itemLocale) => [itemLocale, `${app.url}/${itemLocale}`])
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

export default async function Home() {
  const [cafes, allCafes] = await Promise.all([getFeaturedCafes(), getAllCafes()]);

  const cafeNumbers = Object.fromEntries(allCafes.map((cafe, index) => [cafe.slug, index + 1]));

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <FeaturedCafesSection>
          <HorizontalScroll>
            {cafes.map((cafe) => (
              <div key={`featured-${cafe.slug}`} className="flex-shrink-0">
                <CafeCard cafe={cafe} number={cafeNumbers[cafe.slug]} hideMeta={true} />
              </div>
            ))}
          </HorizontalScroll>
        </FeaturedCafesSection>
      </main>
    </div>
  );
}

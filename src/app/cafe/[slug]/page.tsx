import { getCafeBySlug } from '@/lib/services/cafeService';
import { notFound } from 'next/navigation';
import { logger } from '@/lib/logger';
import HeroImage from '@/components/cafe/HeroImage';
import PageHeader from '@/components/cafe/PageHeader';
import LocationSection from '@/components/cafe/LocationSection';
import OpeningHours from '@/components/cafe/OpeningHours';
import FeatureBadge from '@/components/ui/FeatureBadge';
import SocialLinks from '@/components/ui/SocialLinks';
import BackLink from '@/components/cafe/BackLink';
import CafeDescription from '@/components/cafe/CafeDescription';

// Make this page dynamic
export const dynamic = 'force-dynamic';

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const cafe = await getCafeBySlug(slug);

    if (!cafe) {
      notFound();
    }

    const { name, image, city, state, location, rating, specialty_features, rrss, description } =
      cafe;
    const address = location?.address || '';

    // Use lat/lng if available for Google Maps, otherwise fall back to address
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
            {specialty_features?.opening_Hours && (
              <OpeningHours hours={specialty_features.opening_Hours} />
            )}
          </div>

          {specialty_features?.brew_methods?.length ||
          specialty_features?.services?.length ||
          specialty_features?.serving?.length ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Características del Café</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  ...(specialty_features?.brew_methods || []),
                  ...(specialty_features?.services || []),
                  ...(specialty_features?.serving || []),
                ].map((feature) => (
                  <FeatureBadge key={feature} text={feature} />
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

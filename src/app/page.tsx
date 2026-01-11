import CafeCard from '@/components/cafe/CafeCard';
import { FeaturedCafesSection, HorizontalScroll } from '@/components/sections';
import { getFeaturedCafes, getAllCafes } from '@/lib/services/cafeService';

// Keep it static but with revalidation since featured cafes don't change often
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [cafes, allCafes] = await Promise.all([getFeaturedCafes(), getAllCafes()]);

  // Create a mapping of cafe slugs to their original index
  const cafeNumbers = Object.fromEntries(allCafes.map((cafe, index) => [cafe.slug, index + 1]));

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Cafés Section */}
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

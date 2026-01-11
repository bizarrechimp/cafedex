import CafeCard from '@/components/cafe/CafeCard';
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
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Cafeterías Destacadas</h2>
          {cafes.length > 0 ? (
            <div className="overflow-hidden py-8 pb-12 px-4">
              <div className="flex justify-center lg:justify-evenly gap-6 max-w-full lg:max-w-5xl mx-auto">
                {cafes.map((cafe, _index) => (
                  <div
                    key={`featured-${cafe.slug}`}
                    className={`$ {
                      index === 0 ? 'block' :
                      index === 1 ? 'hidden md:block' :
                      index === 2 ? 'hidden lg:block' :
                      'hidden'
                    }`}
                  >
                    <CafeCard cafe={cafe} number={cafeNumbers[cafe.slug]} hideMeta={true} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <h3 className="text-xl text-gray-600 dark:text-gray-400">
                Próximamente nuevas cafeterías
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-500">
                Estamos trabajando en traerte las mejores cafeterías de España.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

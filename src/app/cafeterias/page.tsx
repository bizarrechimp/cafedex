import CafeCard from '@/components/CafeCard';
import CityFilter from '@/components/CityFilter';
import { getAllCafes } from '@/utils/cafeUtils';
import { Cafe } from '@/data/types';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function CafeteriasPage({
  searchParams,
}: {
  searchParams?: { city?: string };
}) {
  const allCafes = await getAllCafes();
  const cities = Array.from(new Set(allCafes.map((cafe: Cafe) => cafe.city))).sort();

  const selectedCity = searchParams?.city || 'all';
  const filteredCafes = selectedCity === 'all'
    ? allCafes
    : allCafes.filter((cafe: Cafe) => cafe.city === selectedCity);

  const cafeNumbers = Object.fromEntries(
    allCafes.map((cafe, index) => [cafe.slug, index + 1])
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>

      {allCafes.length > 0 ? (
        <>
          <CityFilter cities={cities} selectedCity={selectedCity} />

          <div className="py-8 pb-12 px-4 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-6">
              {filteredCafes.map((cafe: Cafe) => (
                <CafeCard
                  key={`cafe-${cafe.slug}`}
                  name={cafe.name}
                  image={cafe.image}
                  location={cafe.city}
                  address={cafe.address}
                  rating={cafe.rating}
                  slug={cafe.slug}
                  googleMapsUrl={cafe.googleMapsUrl}
                  instagramUrl={cafe.instagramUrl}
                  websiteUrl={cafe.websiteUrl}
                  number={cafeNumbers[cafe.slug]}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl text-gray-600 dark:text-gray-400">
            No hay cafeterías disponibles en este momento.
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-500">
            Pronto agregaremos nuevas cafeterías a nuestra base de datos.
          </p>
        </div>
      )}
    </main>
  );
}
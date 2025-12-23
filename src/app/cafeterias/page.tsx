import CafeCard from '@/components/CafeCard';
import CityFilter from '@/components/CityFilter';
import { getAllCafes } from '@/utils/cafeUtils';
import { Cafe } from '@/data/types';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function CafeteriasPage(props: { searchParams?: Promise<{ [key: string]: string | undefined }> }) {
  try {
    const searchParams = await props.searchParams;
    const selectedCity = searchParams?.city || 'all';

    console.log('CafeteriasPage: Attempting to fetch cafes...');
    const allCafes = await getAllCafes();
    console.log('CafeteriasPage: Cafes fetched successfully, count:', allCafes.length);

    const cities = Array.from(new Set(allCafes.map((cafe: Cafe) => cafe.city))).sort();
    console.log('CafeteriasPage: Available cities:', cities);

    const filteredCafes = selectedCity === 'all'
      ? allCafes
      : allCafes.filter((cafe: Cafe) => cafe.city === selectedCity);
    console.log(`CafeteriasPage: Filtered cafes for city ${selectedCity}:`, filteredCafes.length);

    const cafeNumbers = Object.fromEntries(
      allCafes.map((cafe, index) => [cafe.slug, index + 1])
    );

    if (allCafes.length === 0) {
      return (
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>
          <div className="text-center py-16">
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              No hay cafeterías en la base de datos
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              La base de datos está vacía. Por favor, ejecuta el script de seed o agrega cafeterías manualmente.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>

        {allCafes.length > 0 ? (
          <>
            <CityFilter cities={cities} selectedCity={selectedCity} />

            <div className="py-8 pb-12 px-4 overflow-hidden">
              <div className="flex flex-wrap justify-center gap-6">
                {filteredCafes.map((cafe: Cafe) => {
                  if (!cafe.name || !cafe.city || !cafe.country || !cafe.address || !cafe.slug) {
                    return (
                      <div key={`cafe-missing-${cafe.slug || Math.random()}`} className="w-[320px] h-[427px] flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-xl shadow-lg text-red-700 dark:text-red-200">
                        <span>Datos faltantes para esta cafetería.</span>
                      </div>
                    );
                  }
                  return (
                    <CafeCard
                      key={`cafe-${cafe.slug}`}
                      name={cafe.name}
                      image={cafe.image || ''}
                      city={cafe.city}
                      country={cafe.country}
                      address={cafe.address}
                      rating={cafe.rating}
                      slug={cafe.slug}
                      googleMapsUrl={cafe.googleMapsUrl}
                      instagramUrl={cafe.instagramUrl}
                      websiteUrl={cafe.websiteUrl}
                      number={cafeNumbers[cafe.slug]}
                    />
                  );
                })}
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
  } catch (error) {
    console.error('CafeteriasPage: Error fetching cafes:', error);
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>
        <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h2 className="text-xl text-red-600 dark:text-red-400">
            Error al cargar las cafeterías
          </h2>
          <p className="mt-2 text-red-500 dark:text-red-500">
            {error instanceof Error ? error.message : 'Hubo un error al conectar con la base de datos'}
          </p>
        </div>
      </main>
    );
  }
}
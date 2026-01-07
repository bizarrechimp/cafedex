import CafeCard from '@/components/CafeCard';
import CityFilter from '@/components/CityFilter';
import ProvinceFilter from '@/components/ProvinceFilter';
import EnsureStateInUrl from '@/components/EnsureStateInUrl';
import { getAllCafes, getCafesByState } from '@/utils/cafeUtils';
import { Cafe } from '@/data/types';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default async function CafeteriasPage(props: {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}) {
  const searchParams = await props.searchParams;

  // For initial render we default to 'Alicante' but avoid server-side redirect so
  // the Loading component can appear during client-side navigation. A small
  // client component will ensure the URL contains `state=Alicante` if it's missing.
  const selectedCity = searchParams?.city || 'all';
  const selectedState = searchParams?.state || 'Alicante';

  // If a province is selected and it is Alicante (MVP hardcoded behavior),
  // fetch only those cafes; otherwise fetch all cafes.
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
      <h1 className="text-3xl font-bold mb-8">Cafeterías</h1>

      {allCafes.length > 0 ? (
        <>
          <div className="flex gap-4 flex-col md:flex-row md:items-end md:gap-8">
            <CityFilter cities={cities} selectedCity={selectedCity} />
            <ProvinceFilter selectedState={selectedState} />
          </div>
          {/* Client-side helper: ensure state is present in the URL and replaced without history */}
          <EnsureStateInUrl />

          <div className="py-8 pb-12 px-4 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-6">
              {filteredCafes.map((cafe: Cafe) => {
                if (
                  !cafe.name ||
                  !cafe.city ||
                  !cafe.state ||
                  !cafe.location?.address ||
                  !cafe.slug
                ) {
                  return (
                    <div
                      key={`cafe-missing-${cafe.slug || Math.random()}`}
                      className="w-[320px] h-[427px] flex items-center justify-center bg-red-100 dark:bg-red-900 rounded-xl shadow-lg text-red-700 dark:text-red-200"
                    >
                      <span>Datos faltantes para esta cafetería.</span>
                    </div>
                  );
                }
                return (
                  <CafeCard key={`cafe-${cafe.slug}`} cafe={cafe} number={cafeNumbers[cafe.slug]} hideMeta={true} />
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
}

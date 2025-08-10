import Image from 'next/image';
import Link from 'next/link';
import { getCafe } from '@/lib/db/cafeDb';
import { notFound } from 'next/navigation';

// Make this page dynamic
export const dynamic = 'force-dynamic';

export default async function CafePage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const cafe = await getCafe(slug);

    if (!cafe) {
      notFound();
    }

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={cafe.image}
              alt={cafe.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-4xl font-bold mb-4">{cafe.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            {cafe.rating && (
              <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 flex items-center shadow-md">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm font-medium">{cafe.rating.toFixed(1)}</span>
              </div>
            )}
            <p className="text-gray-600 dark:text-gray-400">{cafe.city}, {cafe.country}</p>
          </div>

          {cafe.description && (
            <p className="text-gray-700 dark:text-gray-300 mb-8">{cafe.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ubicación</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{cafe.address}</p>
              {cafe.googleMapsUrl && (
                <a
                  href={cafe.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Ver en Google Maps
                </a>
              )}
            </div>

            {cafe.openingHours && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Horario</h2>
                <div className="space-y-2">
                  {Object.entries(cafe.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{day}</span>
                      <span className="text-gray-700 dark:text-gray-300">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cafe.features && cafe.features.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Características</h2>
              <div className="flex flex-wrap gap-2">
                {cafe.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-8">
            {cafe.instagramUrl && (
              <a
                href={cafe.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Instagram
              </a>
            )}
            {cafe.websiteUrl && (
              <a
                href={cafe.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Sitio Web
              </a>
            )}
          </div>

          <Link
            href="/cafeterias"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Volver a la lista de cafeterías
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching cafe:', error);
    notFound();
  }
}
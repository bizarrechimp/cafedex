import Image from 'next/image';
import Link from 'next/link';
import { getCafeBySlug } from '@/lib/services/cafeService';
import { notFound } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';
import { logger } from '@/lib/logger';

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
          <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 px-12 text-center">
                <svg
                  className="w-24 h-24 text-amber-200 dark:text-gray-700 mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h2 className="text-amber-800/20 dark:text-white/10 font-black text-5xl uppercase tracking-tighter italic">
                  {name}
                </h2>
              </div>
            )}
          </div>

          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            {name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
            {rating !== undefined && (
              <div className="bg-white dark:bg-gray-800 rounded-full px-5 py-2.5 flex items-center shadow-md border border-gray-100 dark:border-gray-700">
                <StarRating rating={rating} />
              </div>
            )}
            <div className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {city}, {state}
            </div>
          </div>

          {description && (
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 italic border-l-4 border-amber-500 pl-6 py-2 bg-amber-50/30 dark:bg-amber-900/10 rounded-r-lg">
                {description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <section className="bg-gray-50 dark:bg-gray-800/40 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg flex items-center justify-center mr-3">
                  📍
                </span>
                Ubicación
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-snug">
                {address}
              </p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-amber-600 dark:text-amber-400 font-bold rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors w-full md:w-auto"
              >
                Abrir en Google Maps
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </section>

            {specialty_features?.opening_Hours && (
              <section className="bg-gray-50 dark:bg-gray-800/40 p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center mr-3">
                    🕒
                  </span>
                  Horario
                </h2>
                <div className="space-y-3">
                  {Object.entries(specialty_features.opening_Hours).map(([day, hours]) => (
                    <div
                      key={day}
                      className="flex justify-between items-center border-b border-gray-200/50 dark:border-gray-700/50 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{day}</span>
                      <span className="text-gray-900 dark:text-white font-bold">{hours}</span>
                    </div>
                  ))}
                </div>
              </section>
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
                  <span
                    key={feature}
                    className="bg-amber-100/50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400 px-4 py-2 rounded-xl text-sm font-bold border border-amber-200/30 dark:border-amber-800/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-4 mb-12">
            {rrss?.instagram && (
              <a
                href={rrss.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            )}
            {rrss?.website && (
              <a
                href={rrss.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-3.5 rounded-2xl font-black shadow-lg hover:scale-[1.02] transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H12.53V4.027zm-1.06 0v6.973H8.803c.2-3.193 1.592-5.61 2.627-6.973zM6.677 11H4.069a8.013 8.013 0 0 1 3.558-6.243A14.67 14.67 0 0 0 6.677 11zm0 2h2.754a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 6.677 13zm5.853 6.973V13h2.627c-.2 3.193-1.592 5.61-2.627 6.973zm-1.06 0c-1.035-1.364-2.427-3.78-2.627-6.973h2.627v6.973zm7.931-8.973h2.608a8.013 8.013 0 0 1-3.558 6.243 14.67 14.67 0 0 0 .95-6.243z" />
                </svg>
                Sitio Web
              </a>
            )}
            {rrss?.facebook && (
              <a
                href={rrss.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02] transition-all"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            )}
          </div>

          <Link
            href="/cafeterias"
            className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:underline mb-20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver a la lista de cafeterías
          </Link>
        </div>
      </main>
    );
  } catch (error) {
    logger.error('Error fetching cafe:', error);
    notFound();
  }
}

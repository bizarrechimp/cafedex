'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Cafe } from '@/data/types';
import StarRating from './StarRating';

interface CafeCardProps {
  cafe: Cafe;
  number?: number;
  hideMeta?: boolean; // when true, visually hide number and rating (used in listings)
}

export default function CafeCard({ cafe, number, hideMeta = false }: CafeCardProps) {
  const { name, image, city, state, location, rating, slug, rrss } = cafe;
  const hideMetaClass = hideMeta ? 'opacity-0 pointer-events-none' : '';
  const address = location?.address || '';
  const instagramUrl = rrss?.instagram;
  const websiteUrl = rrss?.website;

  // Use lat/lng if available for Google Maps, otherwise fall back to address
  const googleMapsUrl =
    location?.lat && location?.lng
      ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address || name)}`;

  // Get basePath from next.config.js (works in client and server)
  const basePath =
    (typeof window !== 'undefined' && window.__NEXT_DATA__?.runtimeConfig?.basePath) || '';
  let imageUrl: string | undefined = undefined;
  if (image && typeof image === 'string' && image.trim() !== '') {
    imageUrl = image.startsWith('http') ? image : `${basePath}${image}`;
  }

  return (
    <div className="w-[320px] h-[427px]">
      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group border border-gray-100 dark:border-gray-700">
        <div className="relative w-full h-[280px] bg-gray-100 dark:bg-gray-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Foto de ${name}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="320px"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900 px-6 text-center">
              <svg
                className="w-16 h-16 text-amber-200 dark:text-gray-700 mb-2"
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
              <h4 className="text-amber-800/40 dark:text-white/20 font-bold text-xl uppercase tracking-widest pointer-events-none select-none italic">
                {name}
              </h4>
              <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
          )}
          <div className={`absolute top-4 -left-2 bg-white dark:bg-gray-800 px-4 py-1 flex items-center shadow-lg rounded-r-lg z-20 ${hideMetaClass}`} aria-hidden={hideMeta ? 'true' : 'false'}>
            <div className="absolute -left-2 -top-2 w-2 h-2 bg-gray-600 dark:bg-gray-950"></div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">{number !== undefined ? `#${number}` : ''}</span>
          </div>
          <div className={`absolute top-3 right-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center shadow-lg border border-white/20 z-20 ${hideMetaClass}`} aria-hidden={hideMeta ? 'true' : 'false'}>
            {rating !== undefined ? <StarRating rating={rating} /> : <div style={{ width: 18, height: 18 }} />}
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:-translate-y-1/2">
            {googleMapsUrl && (
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-200"
                onClick={(e) => e.stopPropagation()}
                title="Google Maps"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z" />
                </svg>
              </a>
            )}
            {instagramUrl && (
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-purple-600/90 via-pink-600/90 to-orange-500/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:scale-110 hover:opacity-100 transition-all text-white"
                onClick={(e) => e.stopPropagation()}
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all text-gray-700 dark:text-gray-200"
                onClick={(e) => e.stopPropagation()}
                title="Sitio Web"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H12.53V4.027zm-1.06 0v6.973H8.803c.2-3.193 1.592-5.61 2.627-6.973zM6.677 11H4.069a8.013 8.013 0 0 1 3.558-6.243A14.67 14.67 0 0 0 6.677 11zm0 2h2.754a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 6.677 13zm5.853 6.973V13h2.627c-.2 3.193-1.592 5.61-2.627 6.973zm-1.06 0c-1.035-1.364-2.427-3.78-2.627-6.973h2.627v6.973zm7.931-8.973h2.608a8.013 8.013 0 0 1-3.558 6.243 14.67 14.67 0 0 0 .95-6.243z" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <Link href={`/cafe/${slug}`} className="block p-6 relative z-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {name}
          </h3>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1.5 text-amber-500"
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
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 ml-[22px] line-clamp-1">
              {address}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

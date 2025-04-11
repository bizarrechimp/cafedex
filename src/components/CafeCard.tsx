'use client';

import Image from 'next/image';
import Link from 'next/link';

interface CafeCardProps {
  name: string;
  image: string;
  location: string;
  rating?: number;
  slug: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  websiteUrl?: string;
  number?: number;
}

export default function CafeCard({
  name,
  image,
  location,
  rating,
  slug,
  googleMapsUrl,
  instagramUrl,
  websiteUrl,
  number
}: CafeCardProps) {
  return (
    <div className="w-[320px] h-[427px] flex-shrink-0">
      <Link href={`/cafe/${slug}`} className="block h-full group">
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative w-full h-[280px]">
            <Image
              src={image}
              alt={`Foto de ${name}`}
              fill
              className="object-cover"
              sizes="320px"
            />
            {number !== undefined && (
              <div className="absolute top-4 -left-2 bg-white dark:bg-gray-800 px-4 py-1 flex items-center shadow-lg rounded-r-lg">
                <div className="absolute -left-2 -top-2 w-2 h-2 bg-gray-600 dark:bg-gray-950"></div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">#{number}</span>
              </div>
            )}
            {rating && (
              <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full px-2 py-1 flex items-center shadow-md">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{rating.toFixed(1)}</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-colors duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  title="Ver en Google Maps"
                >
                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 7.469 16.812 12 24C16.531 16.812 20 11.8 20 7.602C20 3.403 16.199 0 12 0ZM12 11C10.343 11 9 9.657 9 8C9 6.343 10.343 5 12 5C13.657 5 15 6.343 15 8C15 9.657 13.657 11 12 11Z"/>
                  </svg>
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 transition-opacity duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  title="Seguir en Instagram"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 transition-colors duration-200 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  title="Visitar sitio web"
                >

                  <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H12.53V4.027zm-1.06 0v6.973H8.803c.2-3.193 1.592-5.61 2.627-6.973zM8.625 4.757A14.67 14.67 0 0 0 6.833 11H4.069a8.013 8.013 0 0 1 4.556-6.243zM4.069 13h2.764a14.67 14.67 0 0 0 1.792 6.243A8.013 8.013 0 0 1 4.069 13zm7.401 6.973V13h2.697c-.2 3.193-1.592 5.61-2.627 6.973zm1.06-6.973v6.973c-1.035-1.364-2.427-3.78-2.627-6.973h2.627zm3.855 6.243A14.67 14.67 0 0 0 17.167 13h2.764a8.013 8.013 0 0 1-4.556 6.243z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Button, Tooltip, Badge } from '@heroui/react';
import { MapPin, Instagram, Globe, Map } from 'lucide-react';
import { Cafe } from '@/types/cafe';
import StarRating from '@/components/ui/StarRating';

interface CafeCardProps {
  cafe: Cafe;
  number?: number;
  hideMeta?: boolean; // when true, visually hide number and rating (used in listings)
}

export default function CafeCard({ cafe, number, hideMeta = false }: CafeCardProps) {
  const { name, image, city, state, location, rating, slug, rrss } = cafe;
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
    <Card className="w-[320px] h-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-[280px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Foto de ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="320px"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full px-4 text-center">
            <svg
              className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-2"
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
            <h4 className="text-gray-400 dark:text-gray-600 font-bold text-sm uppercase tracking-widest pointer-events-none select-none italic">
              {name}
            </h4>
          </div>
        )}

        {/* Meta Badges */}
        {!hideMeta && (
          <>
            {number !== undefined && (
              <Badge
                content={`#${number}`}
                color="warning"
                placement="top-left"
                className="absolute top-2 left-2"
                size="lg"
              >
                <div />
              </Badge>
            )}

            {rating !== undefined && (
              <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-white/20 dark:border-slate-700/20">
                <StarRating rating={rating} showTooltip={true} />
              </div>
            )}
          </>
        )}

        {/* Hover Action Buttons */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-10">
          {googleMapsUrl && (
            <Tooltip content="Google Maps" color="foreground">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-700 rounded-full p-3 shadow-xl hover:scale-110 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <Map className="w-5 h-5 text-gray-700 dark:text-white" />
              </a>
            </Tooltip>
          )}
          {instagramUrl && (
            <Tooltip content="Instagram" color="foreground">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 rounded-full p-3 shadow-xl hover:scale-110 transition-transform text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <Instagram className="w-5 h-5" />
              </a>
            </Tooltip>
          )}
          {websiteUrl && (
            <Tooltip content="Sitio Web" color="foreground">
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-700 rounded-full p-3 shadow-xl hover:scale-110 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-5 h-5 text-gray-700 dark:text-white" />
              </a>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Content Section */}
      <CardBody className="flex-1 gap-3 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {name}
        </h3>
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              {city}, {state}
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 ml-[22px] line-clamp-2">
            {address}
          </p>
        </div>
      </CardBody>

      {/* Footer - Link to Detail Page */}
      <CardFooter className="p-4 pt-0">
        <Link href={`/cafe/${slug}`} className="w-full">
          <Button fullWidth color="warning" variant="flat" size="sm" className="font-semibold">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

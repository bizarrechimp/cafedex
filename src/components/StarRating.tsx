'use client';

import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export default function StarRating({ rating = 0, maxStars = 5 }: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(rating || 0, maxStars));

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Calificación: ${clampedRating} de ${maxStars} estrellas`}
    >
      {[...Array(maxStars)].map((_, i) => {
        const starIndex = i + 1;
        const isFull = starIndex <= Math.floor(clampedRating);
        const isHalf =
          !isFull && starIndex <= Math.ceil(clampedRating) && clampedRating % 1 >= 0.25;

        return (
          <div key={i} className="relative">
            {/* Base Star (Empty or Border) */}
            <Star
              size={18}
              strokeWidth={1}
              className="text-gray-900 dark:text-white fill-transparent opacity-20"
            />

            {/* Filled Star (Overlaid) */}
            {isFull ? (
              <div className="absolute inset-0">
                <Star size={18} strokeWidth={1.5} className="fill-yellow-400 text-yellow-500" />
              </div>
            ) : isHalf ? (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(clampedRating % 1) * 100}%` }}
              >
                <Star size={18} strokeWidth={1.5} className="fill-yellow-400 text-yellow-500" />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

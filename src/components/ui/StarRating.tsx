'use client';

import { Tooltip } from '@heroui/react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  showTooltip?: boolean;
}

export default function StarRating({
  rating = 0,
  maxStars = 5,
  showTooltip = true,
}: StarRatingProps) {
  const clampedRating = Math.max(0, Math.min(rating || 0, maxStars));

  const content = (
    <div
      className="flex items-center gap-0.5"
      aria-label={`Calificación: ${clampedRating.toFixed(1)} de ${maxStars} estrellas`}
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
              strokeWidth={1.5}
              className="text-gray-300 dark:text-gray-600 fill-gray-200 dark:fill-gray-700"
            />

            {/* Filled Star (Overlaid) */}
            {isFull ? (
              <div className="absolute inset-0">
                <Star size={18} strokeWidth={1.5} className="fill-amber-400 text-amber-500" />
              </div>
            ) : isHalf ? (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(clampedRating % 1) * 100}%` }}
              >
                <Star size={18} strokeWidth={1.5} className="fill-amber-400 text-amber-500" />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  if (showTooltip) {
    return (
      <Tooltip
        content={`${clampedRating.toFixed(1)} / ${maxStars} estrellas`}
        color="default"
        radius="sm"
      >
        {content}
      </Tooltip>
    );
  }

  return content;
}

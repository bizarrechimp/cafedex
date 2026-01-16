'use client';

import { Tooltip } from '@heroui/react';
import { Star } from 'lucide-react';
import { useI18n } from '@/lib/i18n/client';

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
  const { t } = useI18n();
  const clampedRating = Math.max(0, Math.min(rating || 0, maxStars));

  const content = (
    <div
      className="flex items-center gap-0.5"
      aria-label={t('rating.ariaLabel', {
        rating: clampedRating.toFixed(1),
        max: maxStars,
      })}
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
              className="text-brand-beige fill-brand-beige/60"
            />

            {/* Filled Star (Overlaid) */}
            {isFull ? (
              <div className="absolute inset-0">
                <Star
                  size={18}
                  strokeWidth={1.5}
                  className="fill-brand-secondary text-brand-secondary"
                />
              </div>
            ) : isHalf ? (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(clampedRating % 1) * 100}%` }}
              >
                <Star
                  size={18}
                  strokeWidth={1.5}
                  className="fill-brand-secondary text-brand-secondary"
                />
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
        content={t('rating.tooltip', {
          rating: clampedRating.toFixed(1),
          max: maxStars,
        })}
        color="default"
        radius="sm"
      >
        {content}
      </Tooltip>
    );
  }

  return content;
}

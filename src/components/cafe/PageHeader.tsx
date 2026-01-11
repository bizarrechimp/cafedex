'use client';

import StarRating from '@/components/ui/StarRating';

interface PageHeaderProps {
  title: string;
  location?: {
    city: string;
    state: string;
  };
  rating?: number;
}

export default function PageHeader({ title, location, rating }: PageHeaderProps) {
  return (
    <>
      <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
        {title}
      </h1>

      <div className="flex flex-wrap items-center gap-6 mb-8">
        {rating !== undefined && (
          <div className="bg-white dark:bg-gray-800 rounded-full px-5 py-2.5 flex items-center shadow-md border border-gray-100 dark:border-gray-700">
            <StarRating rating={rating} />
          </div>
        )}
        {location && (
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
            {location.city}, {location.state}
          </div>
        )}
      </div>
    </>
  );
}

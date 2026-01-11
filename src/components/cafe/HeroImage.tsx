'use client';

import Image from 'next/image';

interface HeroImageProps {
  src?: string;
  alt: string;
  title: string;
  priority?: boolean;
}

export default function HeroImage({ src, alt, title, priority = false }: HeroImageProps) {
  return (
    <div className="relative w-full h-[400px] mb-8 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" priority={priority} />
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
            {title}
          </h2>
        </div>
      )}
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import getConfig from 'next/config';

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  slug: string;
  author: string;
}

export default function BlogCard({
  title,
  excerpt,
  image,
  date,
  slug,
  author
}: BlogCardProps) {
  // Get basePath from next.config.js (works in client and server)
  const basePath = (typeof window !== 'undefined' && window.__NEXT_DATA__?.runtimeConfig?.basePath) || '/cafedex';
  let imageUrl: string | undefined = undefined;
  if (image && typeof image === 'string' && image.trim() !== '') {
    imageUrl = image.startsWith('http') ? image : `${basePath}${image}`;
  }
  return (
    <div className="w-full max-w-[400px] h-[500px] flex-shrink-0">
      <Link href={`/blog/${slug}`} className="block h-full group">
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative w-full h-[250px]">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`Imagen para ${title}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800">
                  <svg className="w-16 h-16 text-blue-200 dark:text-gray-700 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M14 4v4h4" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h8M8 16h4" />
                  </svg>
                  <span className="text-xs font-bold text-blue-800/30 dark:text-white/20 uppercase tracking-[0.2em]">Crónica de Café</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {date} • {author}
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
              {title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 line-clamp-4">
              {excerpt}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

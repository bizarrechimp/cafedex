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
  const imageUrl = image.startsWith('http') ? image : `${basePath}${image}`;
  return (
    <div className="w-full max-w-[400px] h-[500px] flex-shrink-0">
      <Link href={`/blog/${slug}`} className="block h-full group">
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative w-full h-[250px]">
            <Image
              src={imageUrl}
              alt={`Imagen para ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
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
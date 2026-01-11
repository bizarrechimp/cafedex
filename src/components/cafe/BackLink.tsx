'use client';

import Link from 'next/link';

interface BackLinkProps {
  href?: string;
  label?: string;
}

export default function BackLink({
  href = '/cafeterias',
  label = 'Volver a la lista de cafeterías',
}: BackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold hover:underline mb-20"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {label}
    </Link>
  );
}

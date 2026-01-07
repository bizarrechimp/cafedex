'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function EnsureStateInUrl() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (!searchParams) return;

    const state = searchParams.get('state');
    if (!state) {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set('state', 'Alicante');
      // Use replace to avoid creating history entry
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, router]);

  return null;
}

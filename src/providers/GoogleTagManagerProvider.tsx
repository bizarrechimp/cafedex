'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { env } from '@/env';

/**
 * Google Tag Manager Provider Component
 * 
 * Initializes GTM with the configured ID from environment variables.
 * Uses Next.js official third-parties package for optimal performance.
 * 
 * @security
 * - GTM ID is read from NEXT_PUBLIC_GTM_ID environment variable
 * - Only initializes if GTM ID is configured
 * - Uses official Next.js integration for security best practices
 */
export default function GoogleTagManagerProvider() {
  // Only render GTM if ID is configured
  if (!env.googleTagManager.id) {
    return null;
  }

  return <GoogleTagManager gtmId={env.googleTagManager.id} />;
}

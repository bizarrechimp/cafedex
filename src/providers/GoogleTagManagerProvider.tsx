'use client';

import { GoogleTagManager } from '@next/third-parties/google';

/**
 * Google Tag Manager Provider Component
 * Initializes GTM with the configured ID from environment variables.
 * Uses Next.js official third-parties package for optimal performance.
 * @security
 * - GTM ID is read from NEXT_PUBLIC_GTM_ID environment variable
 * - Only initializes if GTM ID is configured
 * - Uses official Next.js integration for security best practices
 */
export default function GoogleTagManagerProvider() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  // Only render GTM if ID is configured
  if (!gtmId) {
    return null;
  }

  return <GoogleTagManager gtmId={gtmId} />;
}

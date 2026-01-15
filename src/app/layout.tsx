import { ReactNode } from 'react';
import GoogleTagManagerProvider from '@/providers/GoogleTagManagerProvider';
import { getRequestLocale } from '@/lib/i18n/server';
import '@/styles/globals.css';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <GoogleTagManagerProvider />
      </head>
      <body>{children}</body>
    </html>
  );
}

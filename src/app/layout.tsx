import { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import GoogleTagManagerProvider from '@/providers/GoogleTagManagerProvider';
import { getRequestLocale } from '@/lib/i18n/server';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <GoogleTagManagerProvider />
      </head>
      <body>{children}</body>
    </html>
  );
}

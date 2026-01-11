// src/app/layout.tsx

import { ReactNode } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/providers/ThemeProvider';
import '@/styles/globals.css';

export const metadata = {
  title: 'Cafedex - Descubre las Mejores Cafeterías',
  description: 'Explora las mejores cafeterías independientes en España',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

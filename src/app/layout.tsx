// src/app/layout.tsx

import { ReactNode } from 'react';
import Header from '../components/Header';
import Footer from "../components/Footer";
import { Providers } from './providers';
import './globals.css';

export const metadata = {
  title: 'Cafedex - Descubre las Mejores Cafeterías',
  description: 'Explora las mejores cafeterías independientes en España',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
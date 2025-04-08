// src/app/layout.tsx

import { ReactNode } from 'react';
import Header from '../components/Header';  // Asegúrate de que la ruta es correcta
import './globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
  
}

// src/app/layout.tsx

import { ReactNode } from 'react';
import Header from '../components/Header';  // Asegúrate de que la ruta es correcta
import Footer from "../components/Footer"; // Import the Footer component
import './globals.css';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head />
      <body>
        <Header />
        {children}
        <Footer /> {/* The footer at the bottom */}
      </body>
    </html>
  );

}
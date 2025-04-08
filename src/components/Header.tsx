"use client";

import Link from 'next/link';
import { use, useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-red-800 rounded-xl shadow-md backdrop-blur-md bg-opacity-90 px-6 py-5 mx-4 mt-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold tracking-tight">Cafedex</h1>

        {/* Menú para pantallas grandes */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-rose-200 transition-colors duration-300">Inicio</Link>
          <Link href="/about" className="text-white hover:text-rose-200 transition-colors duration-300">Sobre Nosotros</Link>
          <Link href="/contact" className="text-white hover:text-rose-200 transition-colors duration-300">Contacto</Link>
        </nav>

        {/* Botón de menú para pantallas móviles */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menú desplegable para pantallas pequeñas */}
      {isMenuOpen && (
        <nav className="md:hidden bg-red-800 rounded-md mt-3 px-4 py-3 transition-all ease-in-out duration-300">
          <ul className="space-y-3">
            <li>
              <Link href="/" className="text-white block hover:text-rose-200 transition-colors">Inicio</Link>
            </li>
            <li>
              <Link href="/about" className="text-white block hover:text-rose-200 transition-colors">Sobre Nosotros</Link>
            </li>
            <li>
              <Link href="/contact" className="text-white block hover:text-rose-200 transition-colors">Contacto</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;

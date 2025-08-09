"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // iconos modernos
import Switch from './switch'; // Importa el nuevo Switch

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado del menú
  const [isDarkMode, setIsDarkMode] = useState(false); // Estado del modo oscuro


 // Cargar el modo oscuro desde localStorage si está almacenado
 useEffect(() => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'true') {
    setIsDarkMode(true);
    document.body.classList.add('dark');
  }
}, []);

  // Cambiar entre el modo claro y oscuro
  const toggleDarkMode = (isChecked: boolean) => {
    setIsDarkMode(isChecked);
    if (isChecked) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  // Alternar el menú móvil
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white dark:bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-black dark:text-white text-2xl font-semibold">Cafedex</h1>

        {/* Botón para cambiar el modo */}
        <Switch isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
      </div>

      {/* Icono hamburguesa para móviles */}
      <div className="md:hidden">
        <button onClick={toggleMenu} aria-label="Alternar menú">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú de escritorio (para pantallas grandes) */}
     <header className="header">
  <nav className="nav">
    <ul className="menu-list">
      <li><Link href="/">Inicio</Link></li>
      <li><Link href="/cafeterias">Cafeterías</Link></li>
      {/* <li><Link href="/blog">Blog</Link></li> */}
      <li><Link href="/contact">Contacto</Link></li>
    </ul>
  </nav>
</header>

      {/* Menú móvil (desplegable) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-black/80 text-white px-6 py-4 space-y-4 z-40 rounded-b-2xl backdrop-blur">
          <ul className="flex flex-col gap-4 text-lg font-medium">
            <li><Link href="/" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link href="/cafeterias" onClick={toggleMenu}>Cafeterías</Link></li>
            {/* <li><Link href="/blog" onClick={toggleMenu}>Blog</Link></li> */}
            <li><Link href="/contact" onClick={toggleMenu}>Contacto</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

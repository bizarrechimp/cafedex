"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Switch from './switch';

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Debug session state
  useEffect(() => {
    console.log('Auth Status:', status);
    console.log('Session:', session);
  }, [status, session]);


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

        <div className="flex items-center gap-4">
          {/* Auth Button */}
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Cerrar sesión
            </button>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Iniciar sesión
            </button>
          )}

          {/* Botón para cambiar el modo */}
          <Switch isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
        </div>
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
            <li>
              {session ? (
                <button
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  Cerrar sesión
                </button>
              ) : (
                <button
                  onClick={() => {
                    signIn('google');
                    toggleMenu();
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Iniciar sesión
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

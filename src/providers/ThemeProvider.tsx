'use client';

import { HeroUIProvider } from '@heroui/react';
import { useState, useEffect } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Cargar preferencia de tema al montar
  useEffect(() => {
    const savedMode = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedMode ? savedMode === 'dark' : prefersDark;

    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
    setIsMounted(true);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  const toggleTheme = (isDark: boolean) => {
    setIsDarkMode(isDark);
    applyTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  // Evitar hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <HeroUIProvider>
      {/* Inyectar el contexto del tema */}
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
    </HeroUIProvider>
  );
}

// Context para compartir el tema
import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Retornar valores por defecto si no está dentro del provider
    return {
      isDarkMode: false,
      toggleTheme: () => {},
    };
  }
  return context;
}

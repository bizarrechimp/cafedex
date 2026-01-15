'use client';

import { HeroUIProvider } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_PREFERENCES,
  PREFERENCES_COOKIE,
  UserPreferences,
  mergePreferences,
  parsePreferencesCookie,
  ThemePreference,
} from '@/lib/preferences';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return cookie.slice(name.length + 1);
    }
  }

  return null;
};

const readPreferences = () => {
  const raw = getCookieValue(PREFERENCES_COOKIE);
  return parsePreferencesCookie(raw);
};

const getSystemTheme = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return DEFAULT_PREFERENCES.theme ?? 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const writePreferences = (prefs: UserPreferences) => {
  if (typeof document === 'undefined') {
    return;
  }

  const payload = encodeURIComponent(JSON.stringify(prefs));
  let cookie = `${PREFERENCES_COOKIE}=${payload}; path=/; max-age=31536000; samesite=lax`;
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    cookie += '; secure';
  }
  document.cookie = cookie;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const preferencesRef = useRef<UserPreferences>(DEFAULT_PREFERENCES);

  // Cargar preferencia de tema al montar
  useEffect(() => {
    const { prefs, hasCookie } = readPreferences();
    const resolvedTheme = hasCookie ? (prefs.theme ?? 'light') : getSystemTheme();
    const shouldBeDark = resolvedTheme === 'dark';
    preferencesRef.current = mergePreferences(prefs, { theme: resolvedTheme });

    setIsDarkMode(shouldBeDark);
    applyTheme(shouldBeDark);
    setPreferences(preferencesRef.current);
    setIsMounted(true);

    writePreferences(preferencesRef.current);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  };

  const updatePreferences = (next: Partial<UserPreferences>) => {
    const nextPrefs = mergePreferences(preferencesRef.current, next);
    preferencesRef.current = nextPrefs;
    setPreferences(nextPrefs);
    if (next.theme) {
      const shouldBeDark = nextPrefs.theme === 'dark';
      setIsDarkMode(shouldBeDark);
      applyTheme(shouldBeDark);
    }
    writePreferences(nextPrefs);
  };

  const setThemePreference = (theme: ThemePreference) => {
    updatePreferences({ theme });
  };

  const setLanguagePreference = (language: UserPreferences['language']) => {
    updatePreferences({ language });
  };

  const setCookiePreferences = (cookies: NonNullable<UserPreferences['cookies']>) => {
    updatePreferences({ cookies });
  };

  const toggleTheme = (isDark: boolean) => {
    setThemePreference(isDark ? 'dark' : 'light');
  };

  // Evitar hydration mismatch
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <HeroUIProvider>
      {/* Inyectar el contexto del tema */}
      <ThemeContext.Provider
        value={{
          isDarkMode,
          toggleTheme,
          preferences,
          updatePreferences,
          setLanguagePreference,
          setCookiePreferences,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </HeroUIProvider>
  );
}

// Context para compartir el tema
import { createContext, useContext } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: (isDark: boolean) => void;
  preferences: UserPreferences;
  updatePreferences: (next: Partial<UserPreferences>) => void;
  setLanguagePreference: (language: UserPreferences['language']) => void;
  setCookiePreferences: (cookies: NonNullable<UserPreferences['cookies']>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Retornar valores por defecto si no está dentro del provider
    return {
      isDarkMode: false,
      toggleTheme: () => {},
      preferences: DEFAULT_PREFERENCES,
      updatePreferences: () => {},
      setLanguagePreference: () => {},
      setCookiePreferences: () => {},
    };
  }
  return context;
}

import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();
const THEME_PREFERENCE_KEY = 'kariv-theme-preference';
const THEME_RESOLVED_KEY = 'kariv-theme';
const VALID_PREFERENCES = new Set(['system', 'light', 'dark']);

const deviceTheme = () => (
  typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [themePreference, setThemePreferenceState] = useState('system');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem(THEME_PREFERENCE_KEY);
    const initialPreference = VALID_PREFERENCES.has(savedPreference) ? savedPreference : 'system';

    setThemePreferenceState(initialPreference);
    setTheme(initialPreference === 'system' ? deviceTheme() : initialPreference);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const resolveTheme = () => {
      const nextTheme = themePreference === 'system'
        ? (mediaQuery.matches ? 'dark' : 'light')
        : themePreference;
      setTheme(nextTheme);
    };

    resolveTheme();
    if (themePreference === 'system') mediaQuery.addEventListener('change', resolveTheme);
    localStorage.setItem(THEME_PREFERENCE_KEY, themePreference);

    return () => mediaQuery.removeEventListener('change', resolveTheme);
  }, [hydrated, themePreference]);

  useEffect(() => {
    if (!hydrated) return;

    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem(THEME_RESOLVED_KEY, theme);
  }, [hydrated, theme]);

  const setThemePreference = (preference) => {
    if (VALID_PREFERENCES.has(preference)) setThemePreferenceState(preference);
  };
  const setManualTheme = (nextTheme) => {
    if (nextTheme === 'light' || nextTheme === 'dark') setThemePreferenceState(nextTheme);
  };
  const toggleTheme = () => setThemePreferenceState(theme === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, themePreference, toggleTheme, setTheme: setManualTheme, setThemePreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'light',
      themePreference: 'system',
      toggleTheme: () => {},
      setTheme: () => {},
      setThemePreference: () => {},
    };
  }
  return context;
}

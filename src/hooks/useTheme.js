import { useState, useEffect, useCallback } from 'react';

/**
 * useTheme Hook
 *
 * Manages dark/light mode with localStorage persistence.
 * Default: 'dark' (per PRD requirement).
 *
 * Applies `.dark` class to <html> when dark is active,
 * matching Tailwind's darkMode: 'class' behavior.
 *
 * Falls back to 'dark' if localStorage is unavailable or corrupted.
 */

const STORAGE_KEY = 'shail-portfolio-theme';
const VALID_THEMES = ['dark', 'light'];

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_THEMES.includes(stored)) return stored;
  } catch {
    console.warn('localStorage unavailable, defaulting to dark theme.');
  }
  return 'dark';
}

export function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Sync .light-mode class to <html> whenever theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        console.warn('Failed to persist theme preference.');
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (VALID_THEMES.includes(newTheme)) setThemeState(newTheme);
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme, setTheme };
}

export default useTheme;

import { useState, useEffect, useCallback } from 'react';

/**
 * useTheme Hook
 *
 * Manages dark/light mode with localStorage persistence.
 * Default: 'dark' (per PRD requirement).
 *
 * Applies `.light-mode` class to <html> when light is active,
 * matching the tokens.css selector: html.light-mode { ... }
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
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      console.warn('Failed to persist theme preference.');
    }
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

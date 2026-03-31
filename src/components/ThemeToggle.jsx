/**
 * ThemeToggle — Placeholder Component
 * 
 * Logic: Calls toggleTheme from useTheme hook.
 * Can be used standalone or composed into Navbar.
 * Gemini will own: icon design, animation.
 */

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Currently: ${theme} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

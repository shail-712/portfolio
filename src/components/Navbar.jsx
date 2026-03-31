/**
 * Navbar — Fused UI (Gemini) + Logic (Claude)
 *
 * Logic:
 *  - React Router NavLink with active state management
 *  - Mobile menu toggle (useState)
 *  - Theme toggle integration
 *  - Scroll-state for backdrop blur intensity increase
 *
 * UI: Gemini's design from ui_components.md
 *  - Fixed top, full-width, backdrop-blur, border-bottom
 *  - Mobile hamburger menu
 *  - Mint accent on active/hover links
 */

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for enhanced navbar effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change (handled in Layout via useEffect)
  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 hover:text-[var(--color-accent-mint)] ${
      isActive
        ? 'text-[var(--color-accent-mint)]'
        : 'text-[var(--color-text-primary)]'
    }`;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-200
        backdrop-blur-md border-b border-[var(--color-bg-surface)]
        ${scrolled ? 'bg-[var(--color-bg-primary)]/90' : 'bg-[var(--color-bg-primary)]/80'}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          id="nav-logo"
          className="text-[var(--color-accent-mint)] font-heading font-bold text-xl tracking-wide"
          onClick={closeMenu}
        >
          S.S.
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center space-x-8 font-mono text-sm">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: theme toggle + mobile hamburger */}
        <div className="flex items-center gap-4">
          {/* Theme toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-gold)] transition-colors duration-200"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            ) : (
              /* Moon icon */
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="flex md:hidden flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--color-text-primary)] transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-[var(--color-bg-surface)]">
          <ul className="flex flex-col space-y-4 pt-4 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={linkClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

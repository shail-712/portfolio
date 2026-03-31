import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
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

  const closeMenu = () => setMenuOpen(false);

  const linkClassDesktop = ({ isActive }) =>
    `relative py-1 transition-all duration-200 hover:text-[var(--color-text-inverse)] ${
      isActive
        ? 'text-[var(--color-text-inverse)] font-bold after:content-[""] after:absolute after:-bottom-[2px] after:left-0 after:w-full after:h-[3px] after:tiki-taka-path after:shadow-[0_0_10px_var(--color-fcb-grana)]'
        : 'text-[var(--color-text-inverse)]/70'
    }`;

  const linkClassMobile = ({ isActive }) =>
    `block py-2 transition-all duration-200 hover:text-[var(--color-text-inverse)] ${
      isActive
        ? 'text-[var(--color-fcb-gold)] font-bold'
        : 'text-[var(--color-text-inverse)]/80'
    }`;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-200
        backdrop-blur-md border-b-2 border-slate-800 dark:border-slate-800 border-[var(--color-fcb-grana)]
        ${scrolled 
          ? (theme === 'dark' ? 'bg-[#0A1128]/95 shadow-md' : 'bg-[var(--color-fcb-blau)]/95 shadow-md') 
          : (theme === 'dark' ? 'bg-[#0A1128]/90' : 'bg-[var(--color-fcb-blau)]/90')}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink
          to="/"
          id="nav-logo"
          className="text-[var(--color-fcb-gold)] font-heading font-bold text-xl tracking-wide"
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
                className={linkClassDesktop}
                end={link.to === '/'}
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
            className="text-[var(--color-text-inverse)] hover:text-[var(--color-fcb-gold)] transition-colors duration-200"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg className="w-5 h-5 drop-shadow-[0_0_8px_var(--color-fcb-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <button
            id="mobile-menu-btn"
            className="flex md:hidden flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-6 bg-[var(--color-text-inverse)] transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--color-text-inverse)] transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-6 bg-[var(--color-text-inverse)] transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-[var(--color-fcb-grana)]/30">
          <ul className="flex flex-col space-y-2 pt-4 font-mono text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={linkClassMobile}
                  onClick={closeMenu}
                  end={link.to === '/'}
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

import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for enhanced navbar effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  // Active state: Bottom border Grana, white text. Inactive: white/70
  const linkClassDesktop = ({ isActive }) =>
    `transition-all duration-200 py-1 border-b-[3px] hover:text-[var(--color-text-inverse)] ${
      isActive
        ? 'border-[var(--color-fcb-grana)] text-[var(--color-text-inverse)]'
        : 'border-transparent text-[var(--color-text-inverse)]/70'
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
        backdrop-blur-md border-b-2 border-[var(--color-fcb-grana)]
        ${scrolled ? 'bg-[var(--color-fcb-blau)]/95 shadow-md' : 'bg-[var(--color-fcb-blau)]/90'}`}
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

        {/* Right side: mobile hamburger */}
        <div className="flex items-center gap-4">
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

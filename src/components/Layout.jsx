/**
 * Layout — Page shell with Navbar, main content, footer
 *
 * Logic:
 *  - Renders Navbar + Outlet (child page) + Footer
 *  - Scroll-to-top on every route change
 *  - Passes theme/toggleTheme down to Navbar
 *  - Closes mobile menu on route change (Navbar handles internally via NavLink)
 */

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import Navbar from './Navbar';

function PageLoader() {
  return (
    <div
      id="page-loader"
      role="status"
      aria-label="Loading page"
      className="flex items-center justify-center min-h-[60vh]"
    >
      <span className="font-mono text-sm text-[var(--color-text-muted)] animate-pulse">
        Loading…
      </span>
    </div>
  );
}

export default function Layout({ theme, toggleTheme }) {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div id="app-layout" className="min-h-screen flex flex-col bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300" style={{ backgroundImage: 'var(--bg-gradient)' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* pt-20 to clear the fixed navbar */}
      <main id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>

      <footer
        id="main-footer"
        className="py-8 text-center font-mono text-xs text-[var(--color-text-muted)] border-t border-[var(--color-bg-surface)]"
      >
        <p>
          Designed &amp; Built by{' '}
          <span className="text-[var(--color-fcb-gold)]">Shail Shaji</span>
          {' '}· {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

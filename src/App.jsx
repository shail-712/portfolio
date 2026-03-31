/**
 * App.jsx — Root Application Component
 *
 * Responsibilities:
 *  - React Router v6 BrowserRouter + nested routes via Layout
 *  - Theme state (useTheme) — passed to Layout → Navbar
 *  - Project modal state (useProjectModal) — passed to Home + Projects pages
 *  - Lazy loading: Projects, About, Contact (code-split for perf)
 *  - Home eager-loaded (critical path)
 *  - Global ProjectModal rendered outside Routes for overlay stacking
 *  - 404 catch-all route
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTheme, useProjectModal } from './hooks';
import Layout from './components/Layout';
import ProjectModal from './components/ProjectModal';

// Eager — first paint critical
import Home from './pages/Home';

// Lazy — code-split bundles
const Projects = lazy(() => import('./pages/Projects'));
const About    = lazy(() => import('./pages/About'));
const Contact  = lazy(() => import('./pages/Contact'));

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

function NotFound() {
  return (
    <div
      id="not-found-page"
      className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center"
    >
      <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-4">404</p>
      <h1 className="font-heading text-5xl font-bold text-[var(--color-fcb-blau)] mb-4">
        Page Not Found
      </h1>
      <p className="font-body text-[var(--color-text-muted)] mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-[var(--color-fcb-blau)] text-white font-mono text-sm rounded hover:bg-[var(--color-fcb-grana)] transition-colors duration-200 shadow-md"
      >
        Go Home
      </a>
    </div>
  );
}

export default function App() {
  const { theme, toggleTheme }                        = useTheme();
  const { isOpen, selectedProject, openModal, closeModal } = useProjectModal();

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index            element={<Home     onOpenModal={openModal} />} />
            <Route path="projects"  element={<Projects onOpenModal={openModal} />} />
            <Route path="about"     element={<About />} />
            <Route path="contact"   element={<Contact />} />
            <Route path="*"         element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>

      {/* Global modal — outside Routes so it renders above everything */}
      <ProjectModal project={selectedProject} isOpen={isOpen} onClose={closeModal} />
    </BrowserRouter>
  );
}

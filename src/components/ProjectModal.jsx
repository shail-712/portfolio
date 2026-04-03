/**
 * ProjectModal — Fused UI + Logic
 *
 * Logic (Claude):
 *  - Escape key closes modal
 *  - Backdrop click closes modal
 *  - Focus trap (auto-focus on open)
 *  - Body scroll lock handled by useProjectModal hook
 *  - Conditional link rendering
 *  - AnimatePresence for exit animations
 *
 * UI:
 *  - scale + fade backdrop (Framer Motion), 0.25s ease
 *  - Glassmorphic surface overlay
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectModal({ project, isOpen, onClose }) {
  const closeRef = useRef(null);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Auto-focus close button when modal opens
  useEffect(() => {
    if (isOpen) setTimeout(() => closeRef.current?.focus(), 50);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          id="project-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
        >
          <motion.div
            id="project-modal-content"
            className="relative bg-[var(--color-bg-surface)] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--color-border-subtle)]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeRef}
              id="modal-close-btn"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-[var(--color-fcb-grana)] transition-colors duration-200 text-xl leading-none p-1"
            >
              ✕
            </button>

            {/* Image / Fallback */}
            <div className="w-full h-52 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-subtle)] flex items-center justify-center rounded-t-xl overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <span className="font-heading text-4xl font-bold text-[var(--color-text-muted)] select-none" aria-hidden="true">
                  {project.title.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="font-mono text-[var(--color-fcb-grana)] font-bold text-xs uppercase tracking-wider mb-2 block">
                {project.category}
              </span>

              <h2 id="modal-title" className="font-heading text-2xl font-bold text-[var(--color-fcb-blau)] mb-4">
                {project.title}
              </h2>

              <p className="font-body text-[var(--color-text-muted)] mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="mb-6">
                <h4 className="font-mono text-sm text-[var(--color-fcb-blau)] font-bold mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] border border-[var(--color-border-subtle)] font-medium font-mono text-xs rounded-md transition-colors duration-200 hover:border-[var(--color-fcb-gold)] hover:text-[var(--color-text-primary)] cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="modal-github-link"
                    className="px-5 py-2.5 border border-[var(--color-fcb-blau)] text-[var(--color-fcb-blau)] font-mono text-sm rounded hover:bg-[var(--color-fcb-blau)]/10 transition-colors duration-200"
                  >
                    View on GitHub
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="modal-live-link"
                    className="px-5 py-2.5 bg-[var(--color-fcb-blau)] text-white font-mono text-sm rounded hover:bg-[var(--color-fcb-grana)] transition-all duration-200"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

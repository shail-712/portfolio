/**
 * ProjectCard — Fused UI (Gemini) + Logic (Claude)
 *
 * Logic:
 *  - Receives real project data as props
 *  - onClick / keyboard handler opens modal
 *  - Image error fallback → initials gradient
 *  - Links stop propagation to prevent modal trigger
 *  - Conditional rendering: links hidden when null
 *
 * UI: Gemini's card design (surface bg, hover scale+lift, Framer Motion)
 */

import { motion } from 'framer-motion';

// GitHub SVG icon
function GitHubIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// External link SVG icon
function ExternalLinkIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

export default function ProjectCard({ project, onOpenModal }) {
  const { id, title, description, techStack, githubLink, liveLink, image, category } = project;

  // Build initials for the fallback gradient block
  const initials = title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleActivate = () => onOpenModal(project);

  return (
    <motion.article
      id={`project-card-${id}`}
      className="bg-[var(--color-bg-surface)] rounded-lg overflow-hidden border border-[var(--color-bg-surface)] cursor-pointer group w-full h-full flex flex-col"
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Image / Fallback gradient */}
      <div className="w-full h-48 bg-gradient-to-tr from-[var(--color-bg-primary)] to-[var(--color-bg-surface)] flex items-center justify-center border-b border-[var(--color-bg-primary)] overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`${title} screenshot`}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <span
          className={`font-heading text-2xl font-bold text-[var(--color-text-muted)] select-none ${image ? 'hidden' : ''}`}
          aria-hidden="true"
        >
          {initials}
        </span>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Category + link icons */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[var(--color-accent-gold)] text-xs">{category}</span>

          {/* Link icons — stop propagation so clicking them doesn't open modal */}
          <div
            className="flex space-x-3 text-[var(--color-text-muted)]"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} GitHub repository`}
                className="hover:text-[var(--color-accent-mint)] transition-colors duration-200"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            )}
            {liveLink && (
              <a
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo`}
                className="hover:text-[var(--color-accent-mint)] transition-colors duration-200"
              >
                <ExternalLinkIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent-mint)] transition-colors duration-200">
          {title}
        </h3>

        <p className="font-body text-[var(--color-text-muted)] text-sm mb-5 line-clamp-3">
          {description}
        </p>

        {/* Tech stack */}
        <ul className="flex flex-wrap gap-3 font-mono text-xs text-[var(--color-text-muted)] mt-auto">
          {techStack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

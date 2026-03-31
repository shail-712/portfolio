/**
 * Hero — Fused UI (Gemini) + Logic (Claude)
 *
 * Logic:
 *  - Data pulled from personal.js data layer
 *  - CTA "View Projects" uses React Router Link
 *  - "Download Resume" conditionally rendered + opens in new tab
 *
 * UI: Gemini's staggered Framer Motion reveal animation
 *  - containerVariants stagger children by 0.1s
 *  - Each element fades in and slides up from y:20
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import personal from '../data/personal';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="min-h-[calc(100vh-5rem)] flex items-center px-6 md:px-12 max-w-7xl mx-auto"
    >
      <motion.div
        className="w-full py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="font-mono text-[var(--color-fcb-grana)] mb-4 text-sm md:text-base"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-5xl md:text-7xl font-bold text-[var(--color-fcb-blau)] mb-4 tracking-tight"
        >
          {personal.name}.
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="font-heading text-3xl md:text-5xl font-bold text-[var(--color-text-muted)] mb-6 tracking-tight"
        >
          {personal.tagline}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="max-w-xl text-[var(--color-text-muted)] font-body text-lg mb-10 leading-relaxed"
        >
          {personal.bio}
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          <Link
            to="/projects"
            id="cta-view-projects"
            className="px-6 py-3 border border-[var(--color-fcb-blau)] text-[var(--color-fcb-blau)] font-mono text-sm rounded hover:bg-[var(--color-fcb-blau)]/10 transition-colors duration-200"
          >
            View Projects
          </Link>
          {personal.resumeUrl && (
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-download-resume"
              className="px-6 py-3 bg-[var(--color-fcb-blau)] text-white font-mono text-sm rounded hover:bg-[var(--color-fcb-grana)] transition-colors duration-200 shadow-lg"
            >
              Download Resume
            </a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

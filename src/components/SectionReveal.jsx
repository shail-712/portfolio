/**
 * SectionReveal — Scroll-triggered fade+slide-up animation wrapper
 * Framer Motion pattern provided by Gemini (ui_components.md)
 * Used to wrap any section that should animate in on viewport entry.
 */

import { motion } from 'framer-motion';

export function SectionReveal({ children, className = '' }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}

export default SectionReveal;

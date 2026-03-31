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
      className="relative min-h-[calc(100vh-5rem)] flex items-center px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Fluid SVG Motion Paths (Tiki-Taka Background) */}
      <svg 
        className="absolute inset-0 w-full h-[120%] -z-10 pointer-events-none opacity-40 dark:opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="blauGranaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-fcb-blau)" />
            <stop offset="50%" stopColor="var(--color-fcb-grana)" />
            <stop offset="100%" stopColor="var(--color-fcb-blau)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M-200,200 C300,-100 800,600 1600,300"
          stroke="url(#blauGranaGradient)"
          strokeWidth="60"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDasharray: "2000", strokeDashoffset: "2000" }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "stroke-dashoffset" }}
          className="blur-[2px]"
        />
        <motion.path
          d="M1600,700 C1100,800 500,100 -200,500"
          stroke="url(#blauGranaGradient)"
          strokeWidth="80"
          fill="transparent"
          strokeLinecap="round"
          initial={{ strokeDasharray: "2500", strokeDashoffset: "2500" }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "stroke-dashoffset" }}
          className="blur-[3px]"
        />
      </svg>

      <div className="w-full py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col z-10"
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-[var(--color-fcb-grana)] mb-4 text-sm md:text-base tracking-widest uppercase"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl md:text-7xl font-bold mb-2 tracking-tight"
          >
            {personal.name.toUpperCase()}.
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 tracking-tight tiki-taka-text"
          >
            {personal.role.toUpperCase()}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl font-body font-bold text-[var(--color-text-primary)] mb-4 border-l-4 border-[var(--color-fcb-grana)] pl-4"
          >
            {personal.tagline}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="max-w-xl text-[var(--color-text-muted)] font-body text-lg mb-10 leading-relaxed drop-shadow-sm"
          >
            {personal.bio}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            <Link
              to="/projects"
              id="cta-view-projects"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-[var(--color-fcb-blau)] text-white font-mono text-sm font-bold rounded hover:bg-[var(--color-fcb-grana)] transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,77,152,0.39)] hover:shadow-[0_6px_20px_rgba(165,0,68,0.23)] hover:-translate-y-1"
            >
              <span>View Projects</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            {personal.resumeUrl ? (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-download-resume"
                className="group flex items-center justify-center gap-2 px-8 py-4 border-[2px] border-[var(--color-fcb-blau)] text-[var(--color-fcb-blau)] dark:text-white dark:border-[var(--color-border-subtle)] font-mono text-sm font-bold rounded hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-fcb-grana)] dark:hover:border-[var(--color-fcb-grana)] transition-all duration-300 hover:-translate-y-1 dark:hover:shadow-[0_4px_14px_rgba(255,255,255,0.05)]"
              >
                <span>Download Resume</span>
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ) : (
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 border-[2px] border-[var(--color-fcb-blau)] text-[var(--color-fcb-blau)] dark:text-white dark:border-[var(--color-border-subtle)] font-mono text-sm font-bold rounded hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-fcb-grana)] dark:hover:border-[var(--color-fcb-grana)] transition-all duration-300 hover:-translate-y-1 dark:hover:shadow-[0_4px_14px_rgba(255,255,255,0.05)]"
              >
                <span>Let's Talk</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Right Column: Aura Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex justify-center items-center lg:justify-end z-10"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-[3px] border-[var(--color-fcb-blau)] dark:border-[var(--color-fcb-grana)] bg-slate-800 animate-aura flex items-center justify-center shadow-2xl">
            {/* If you have a real image, swap out this placeholder text for an <img /> */}
            <span className="font-heading text-7xl font-bold text-[var(--color-fcb-gold)]">
              {personal.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

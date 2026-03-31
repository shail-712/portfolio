# UI Components
This document contains the visual shells for all requested components.
Logic, state, routing, and data are omitted as per rules.
Styling uses Tailwind CSS utility classes and `tokens.css` design system.
Animations use Framer Motion, following the strict budget.

## Navbar.jsx

```jsx
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 transition-all duration-200 backdrop-blur-md bg-[var(--color-bg-primary)]/80 border-b border-[var(--color-bg-surface)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-[var(--color-accent-mint)] font-heading font-bold text-xl tracking-wide">
          S.S.
        </div>
        
        <ul className="hidden md:flex items-center space-x-8 text-[var(--color-text-primary)] font-mono text-sm">
          <li className="hover:text-[var(--color-accent-mint)] transition-colors duration-200 cursor-pointer">About</li>
          <li className="hover:text-[var(--color-accent-mint)] transition-colors duration-200 cursor-pointer">Projects</li>
          <li className="hover:text-[var(--color-accent-mint)] transition-colors duration-200 cursor-pointer">Skills</li>
          <li className="hover:text-[var(--color-accent-mint)] transition-colors duration-200 cursor-pointer">Contact</li>
        </ul>
        
        {/* Theme Toggle Shell */}
        <button className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-gold)] transition-colors duration-200">
          {/* Icon placeholder */}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
        </button>
      </div>
    </nav>
  );
}
```

## Hero.jsx

```jsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div 
        className="w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className="font-mono text-[var(--color-accent-mint)] mb-4 text-sm md:text-base">
          Hi, my name is
        </motion.p>
        
        <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-4 tracking-tight">
          Shail Shaji.
        </motion.h1>
        
        <motion.h2 variants={itemVariants} className="font-heading text-4xl md:text-6xl font-bold text-[var(--color-text-muted)] mb-6 tracking-tight">
          I build until the output matches the vision.
        </motion.h2>
        
        <motion.p variants={itemVariants} className="max-w-xl text-[var(--color-text-muted)] font-body text-lg mb-10 leading-relaxed">
          I'm a Full-Stack Developer & ML Engineer based in Mumbai, India. 
          I specialize in building exceptional digital experiences that integrate powerful machine learning models with robust web architecture.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex gap-4">
          <button className="px-6 py-3 bg-[var(--color-bg-primary)] border border-[var(--color-accent-mint)] text-[var(--color-accent-mint)] font-mono text-sm rounded hover:bg-[var(--color-accent-mint)] hover:bg-opacity-10 transition-colors duration-200">
            View Projects
          </button>
          <button className="px-6 py-3 bg-[var(--color-accent-maroon)] text-white font-mono text-sm rounded hover:brightness-110 transition-all duration-200 shadow-lg">
            Download Resume
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
```

## ProjectCard.jsx

```jsx
import { motion } from 'framer-motion';

export default function ProjectCard() {
  return (
    <motion.div 
      className="bg-[var(--color-bg-surface)] rounded-lg overflow-hidden border border-[var(--color-bg-surface)] cursor-pointer"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-tr from-[var(--color-bg-primary)] to-[var(--color-bg-surface)] flex items-center justify-center border-b border-[var(--color-bg-primary)]">
        <span className="text-[var(--color-text-muted)] font-mono text-sm">Image Placeholder</span>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="font-mono text-[var(--color-accent-gold)] text-xs">Web</p>
          <div className="flex space-x-3 text-[var(--color-text-muted)]">
            {/* GitHub Icon */}
            <svg className="w-5 h-5 hover:text-[var(--color-accent-mint)] transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            {/* External Link Icon */}
            <svg className="w-5 h-5 hover:text-[var(--color-accent-mint)] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </div>
        </div>
        
        <h3 className="font-heading text-xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-accent-mint)] transition-colors">
          Project Name
        </h3>
        
        <p className="font-body text-[var(--color-text-muted)] text-sm mb-5 line-clamp-3">
          Project description goes here. It explains what the project does, why it was built, and what specific problem it solves in 2-3 sentences.
        </p>
        
        <ul className="flex flex-wrap gap-3 font-mono text-xs text-[var(--color-text-muted)]">
          <li>React</li>
          <li>Node.js</li>
          <li>MongoDB</li>
        </ul>
      </div>
    </motion.div>
  );
}
```

## SkillBadge.jsx

```jsx
export default function SkillBadge() {
  return (
    <div 
      className="inline-flex items-center px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] font-mono text-xs rounded-full border border-transparent hover:border-[var(--color-accent-maroon)] hover:bg-[var(--color-accent-maroon)] hover:text-white transition-all duration-150 ease-out cursor-default shadow-sm hover:shadow-md"
    >
      React
    </div>
  );
}
```

## ContactForm.jsx

```jsx
export default function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-[var(--color-bg-surface)] rounded-xl shadow-lg border border-[var(--color-bg-primary)]">
      <h2 className="font-heading text-3xl font-bold text-[var(--color-text-primary)] mb-6 text-center">Get In Touch</h2>
      <p className="font-body text-[var(--color-text-muted)] text-center mb-8">
        Have a question or want to work together? Drop me a message below.
      </p>
      
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-mono text-[var(--color-text-primary)] mb-2" htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            className="w-full bg-[var(--color-bg-primary)] border border-transparent focus:border-[var(--color-accent-mint)] text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-mono text-[var(--color-text-primary)] mb-2" htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full bg-[var(--color-bg-primary)] border border-[var(--color-accent-maroon)] focus:border-[var(--color-accent-mint)] text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body"
            placeholder="john@example.com"
          />
          {/* Example Error validation state shell */}
          <span className="text-[var(--color-accent-maroon)] text-xs font-mono mt-1 block">Please enter a valid email address.</span>
        </div>
        
        <div>
          <label className="block text-sm font-mono text-[var(--color-text-primary)] mb-2" htmlFor="message">Message</label>
          <textarea 
            id="message" 
            rows="5"
            className="w-full bg-[var(--color-bg-primary)] border border-transparent focus:border-[var(--color-accent-mint)] text-[var(--color-text-primary)] rounded px-4 py-3 outline-none transition-colors duration-200 font-body resize-y"
            placeholder="Hello Shail, I'd like to discuss..."
          />
        </div>
        
        <button 
          type="button" 
          className="w-full py-4 bg-transparent border border-[var(--color-accent-mint)] text-[var(--color-accent-mint)] hover:bg-[var(--color-accent-mint)] hover:bg-opacity-10 font-mono text-sm rounded transition-all duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
```

## Scroll Reveal Wrapper (Example pattern for Claude to use)

```jsx
import { motion } from 'framer-motion';

export function SectionReveal({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
```

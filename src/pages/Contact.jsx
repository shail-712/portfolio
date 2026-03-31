/**
 * Contact Page
 *
 * Sections:
 *  - Header with title + description
 *  - ContactForm (handles all validation + EmailJS logic internally)
 *  - Direct email fallback link
 */

import ContactForm from '../components/ContactForm';
import SectionReveal from '../components/SectionReveal';
import personal from '../data/personal';

export default function Contact() {
  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-6 md:px-12 py-24">
      <SectionReveal>
        <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-2 uppercase tracking-wide">Let's talk</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-fcb-blau)] mb-4">
          Get in Touch
        </h1>
        <p className="font-body text-[var(--color-text-muted)] text-lg mb-16 max-w-xl">
          Have an opportunity, idea, or just want to say hello?
          I&apos;m currently open to new roles and collaborations.
        </p>

        {/* Wired ContactForm component */}
        <ContactForm />

        {/* Direct email fallback */}
        <div
          id="contact-alternatives"
          className="mt-10 text-center font-mono text-sm text-[var(--color-text-muted)]"
        >
          Or reach me directly at{' '}
          <a
            href={`mailto:${personal.email}`}
            className="text-[var(--color-fcb-blau)] font-bold hover:text-[var(--color-fcb-grana)] transition-colors"
          >
            {personal.email}
          </a>
        </div>
      </SectionReveal>
    </div>
  );
}

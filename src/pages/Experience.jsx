/**
 * Experience Page
 *
 * Requirements:
 * - Role, Company, Duration, Description
 * - Resume button
 */

import personal from '../data/personal';
import { getExperience } from '../data/experience';
import SectionReveal from '../components/SectionReveal';

export default function Experience() {
  const experiences = getExperience();

  return (
    <div id="experience-page">
      <SectionReveal className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-2 uppercase tracking-wide">My Journey</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-fcb-blau)] dark:text-[var(--color-text-primary)] mb-12">
          Experience
        </h1>

        {/* Timeline structure */}
        <div className="space-y-10 pl-2">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative border-l-[3px] border-[var(--color-fcb-gold)] dark:border-[var(--color-border-subtle)] pl-8 pb-4"
            >
              {/* Timeline dot */}
              <div className="absolute w-5 h-5 bg-[var(--color-fcb-blau)] dark:bg-[var(--color-fcb-gold)] rounded-full -left-[11px] top-1 shadow-md"></div>
              
              <h3 className="font-heading text-2xl font-bold text-[var(--color-fcb-blau)] dark:text-[var(--color-text-primary)] mb-1">
                {exp.role}
              </h3>
              <p className="font-mono text-sm text-[var(--color-fcb-grana)] dark:text-[var(--color-text-muted)] font-bold mb-4">
                {exp.company} <span className="text-[var(--color-text-muted)] font-normal px-2">|</span> {exp.duration}
              </p>
              <p className="font-body text-[var(--color-text-muted)] leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        {/* Resume Button */}
        <div className="mt-20 flex justify-start pl-2">
          {personal.resumeUrl ? (
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--color-fcb-blau)] text-[var(--color-text-on-brand)] font-mono text-sm font-bold rounded hover:bg-[var(--color-fcb-grana)] transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,77,152,0.39)] hover:shadow-[0_6px_20px_rgba(165,0,68,0.23)] hover:-translate-y-1"
            >
              Download Resume
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          ) : (
            <p className="font-mono text-sm text-[var(--color-text-muted)] italic">
              Resume coming soon.
            </p>
          )}
        </div>
      </SectionReveal>
    </div>
  );
}

/**
 * About Page
 *
 * Sections:
 *  - Bio + location + social links + conditional resume download
 *  - Skills grouped by category using SkillBadge
 *
 * Logic:
 *  - Data from personal.js and skills.js
 *  - resumeUrl guards download button
 *  - Each section is scroll-reveal wrapped
 *
 * SEO: single h1, semantic sections
 */

import personal from '../data/personal';
import { getAllSkills, getSkillCategories } from '../data/skills';
import SkillBadge from '../components/SkillBadge';
import SectionReveal from '../components/SectionReveal';

export default function About() {
  const skillCategories = getSkillCategories();
  const allSkills = getAllSkills();

  return (
    <div id="about-page" className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

      {/* Bio section */}
      <SectionReveal className="mb-24">
        <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-2 uppercase tracking-wide">Get to know me</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-fcb-blau)] dark:text-white mb-8">
          About Me
        </h1>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-body text-[var(--color-text-muted)] text-lg leading-relaxed mb-6">
              {personal.bio}
            </p>
            <p className="font-mono text-sm text-[var(--color-text-muted)] mb-8">
              📍 {personal.location}
            </p>

            {/* Social links */}
            <div id="about-social-links" className="flex flex-wrap gap-4 mb-8">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="px-5 py-2.5 border border-[var(--color-border-subtle)] shadow-sm text-[var(--color-text-muted)] hover:border-[var(--color-fcb-blau)] hover:text-[var(--color-fcb-blau)] dark:hover:border-[var(--color-fcb-gold)] dark:hover:text-[var(--color-fcb-gold)] font-mono text-sm rounded transition-colors duration-200"
              >
                GitHub
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="px-5 py-2.5 border border-[var(--color-border-subtle)] shadow-sm text-[var(--color-text-muted)] hover:border-[var(--color-fcb-blau)] hover:text-[var(--color-fcb-blau)] dark:hover:border-[var(--color-fcb-gold)] dark:hover:text-[var(--color-fcb-gold)] font-mono text-sm rounded transition-colors duration-200"
              >
                LinkedIn
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Send email"
                className="px-5 py-2.5 border border-[var(--color-border-subtle)] shadow-sm text-[var(--color-text-muted)] hover:border-[var(--color-fcb-blau)] hover:text-[var(--color-fcb-blau)] dark:hover:border-[var(--color-fcb-gold)] dark:hover:text-[var(--color-fcb-gold)] font-mono text-sm rounded transition-colors duration-200"
              >
                Email
              </a>
            </div>

            {/* Resume download — only if URL provided */}
            {personal.resumeUrl ? (
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="resume-download-btn"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-fcb-blau)] text-white font-mono text-sm rounded hover:bg-[var(--color-fcb-grana)] transition-colors duration-200 shadow-lg"
              >
                Download Resume
              </a>
            ) : (
              <p className="font-mono text-xs text-[var(--color-text-muted)] italic">
                Resume coming soon.
              </p>
            )}
          </div>

          {/* Right column — decorative role label */}
          <div className="hidden md:flex flex-col justify-center items-center bg-[var(--color-bg-surface)] rounded-xl p-10 border border-[var(--color-border-subtle)]">
            <p className="font-heading text-5xl font-bold text-[var(--color-fcb-blau)] dark:text-[var(--color-fcb-gold)] mb-2">SS</p>
            <p className="font-mono text-sm text-[var(--color-text-muted)] text-center">{personal.role}</p>
          </div>
        </div>
      </SectionReveal>

      {/* Skills section */}
      <SectionReveal id="skills-section">
        <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-2 uppercase tracking-wide">What I work with</p>
        <h2 className="font-heading text-3xl font-bold text-[var(--color-fcb-blau)] dark:text-white mb-12">
          Skills &amp; Technologies
        </h2>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category}>
              <h3 className="font-mono text-sm text-[var(--color-text-muted)] mb-4 uppercase tracking-widest">
                {category}
              </h3>
              <div role="list" aria-label={`${category} skills`} className="flex flex-wrap gap-3">
                {allSkills[category].map((skill) => (
                  <SkillBadge key={skill} name={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionReveal>
    </div>
  );
}

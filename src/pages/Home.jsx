/**
 * Home Page
 *
 * Structure:
 *  - Hero section (animated, data from personal.js)
 *  - Featured Projects grid (from projects.js)
 *  - "View All" CTA link
 *
 * SEO: h1 inside Hero, h2 for featured section
 */

import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import SectionReveal from '../components/SectionReveal';
import { getFeaturedProjects } from '../data/projects';

export default function Home({ onOpenModal }) {
  const featuredProjects = getFeaturedProjects();

  return (
    <div id="home-page">
      {/* Hero: full viewport, staggered animation */}
      <Hero />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <SectionReveal
          id="featured-projects-section"
          className="max-w-7xl mx-auto px-6 md:px-12 py-24"
        >
          <p className="font-mono text-[var(--color-accent-mint)] text-sm mb-2">Selected work</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              id="view-all-projects-link"
              className="font-mono text-sm text-[var(--color-accent-mint)] hover:underline inline-flex items-center gap-2"
            >
              View All Projects
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </SectionReveal>
      )}
    </div>
  );
}

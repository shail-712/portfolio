/**
 * Projects Page
 *
 * Logic:
 *  - Category filter state: 'All' | 'Web' | 'ML' | 'Other'
 *  - Filtered project list from data layer
 *  - Opens modal on card click
 *  - Empty state when no projects match filter
 *
 * SEO: single h1, descriptive aria labels
 */

import { useState } from 'react';
import { getProjectsByCategory, getCategories } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SectionReveal from '../components/SectionReveal';

export default function Projects({ onOpenModal }) {
  const categories = getCategories();
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredProjects = getProjectsByCategory(activeCategory);

  return (
    <div id="projects-page">
      <SectionReveal className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <p className="font-mono text-[var(--color-fcb-grana)] font-bold text-sm mb-2 uppercase tracking-wide">My work</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-fcb-blau)] dark:text-[var(--color-text-primary)] mb-12">
          Projects
        </h1>

        {/* Category Filter Bar */}
        <div
          id="project-filter-bar"
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 font-mono text-sm rounded-full border transition-all duration-200
                ${activeCategory === cat
                  ? 'border-[var(--color-fcb-blau)] dark:border-[var(--color-fcb-gold)] text-white dark:text-[#1A1A1A] bg-[var(--color-fcb-blau)] dark:bg-[var(--color-fcb-gold)]'
                  : 'border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:border-[var(--color-fcb-blau)] hover:text-[var(--color-fcb-blau)] dark:hover:border-[var(--color-fcb-gold)] dark:hover:text-[var(--color-fcb-gold)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        {filteredProjects.length > 0 ? (
          <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={onOpenModal}
              />
            ))}
          </div>
        ) : (
          <p
            id="no-projects"
            className="text-center font-mono text-[var(--color-text-muted)] py-16"
          >
            No projects found in this category.
          </p>
        )}
      </SectionReveal>
    </div>
  );
}

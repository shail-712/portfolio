/**
 * SkillBadge — Fused UI (Gemini) + Logic (Claude)
 *
 * Logic: Receives skill name as prop, renders with full a11y label.
 * UI: Gemini's pill badge with hover maroon fill + transition.
 */

export default function SkillBadge({ name }) {
  return (
    <span
      role="listitem"
      aria-label={`Skill: ${name}`}
      className="inline-flex items-center px-4 py-2 bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] font-mono text-xs rounded-full border border-transparent hover:border-[var(--color-accent-maroon)] hover:bg-[var(--color-accent-maroon)] hover:text-white transition-all duration-150 ease-out cursor-default shadow-sm hover:shadow-md"
    >
      {name}
    </span>
  );
}

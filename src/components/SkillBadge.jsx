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
      className="inline-flex items-center px-4 py-2 bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] font-mono text-xs font-bold rounded-full border border-[var(--color-border-subtle)] hover:border-[var(--color-fcb-gold)] hover:text-[var(--color-text-primary)] transition-all duration-150 ease-out cursor-default shadow-sm hover:shadow-md"
    >
      {name}
    </span>
  );
}

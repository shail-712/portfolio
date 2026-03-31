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
      className="inline-flex items-center px-4 py-2 bg-[#F8F9FA] text-[var(--color-text-primary)] font-mono text-xs font-bold rounded-full border border-[var(--color-fcb-gold)] hover:border-[var(--color-fcb-grana)] hover:bg-[var(--color-fcb-grana)] hover:text-[var(--color-text-inverse)] transition-all duration-150 ease-out cursor-default shadow-sm hover:shadow-md"
    >
      {name}
    </span>
  );
}

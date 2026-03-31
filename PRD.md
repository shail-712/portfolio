________________________________________
================================================================
SHAIL PORTFOLIO — PRODUCT REQUIREMENTS DOCUMENT v2.0
Multi-Agent Build: Claude (Orchestrator) + Gemini (UI)
================================================================

----------------------------------------------------------------
WHAT CHANGED FROM v1
----------------------------------------------------------------
✓ Multi-agent workflow defined — Claude orchestrates, Gemini owns UI
✓ Content data section added — real info needed before building
✓ Animation budget scoped — specific list, no over-animating
✓ About/Resume added to core features — was missing, critical for recruiters
✗ Sound toggle REMOVED — unprofessional risk for recruiter-facing portfolio

----------------------------------------------------------------
PROJECT OVERVIEW
----------------------------------------------------------------
App Name       : Shail Portfolio
Goal           : Modern, recruiter-focused portfolio showcasing full-stack + ML projects
Target Users   : Recruiters, hiring managers, internship evaluators
Core Problem   : Recruiters need a fast, clean, interactive way to evaluate skills
Success Metric : Recruiter reaches contact form within 3 clicks from landing

----------------------------------------------------------------
PERSONAL BRANDING
----------------------------------------------------------------
Tagline        : "I build until the output matches the vision."
Role Identity  : Full-Stack Developer with Machine Learning experience
Tone           : Clean, confident, technical. Let the projects speak. Minimal copy.

----------------------------------------------------------------
CONTENT DATA — FILL THIS IN BEFORE BUILDING
----------------------------------------------------------------
(Agents will generate placeholder copy if this is left empty)

-- 01. Personal Info --
name          : "Shail Shaji”
tagline       : "I build until the output matches the vision."
role          : "Full-Stack Developer & ML Engineer"
bio           : "[2–3 sentence bio — who you are, what you build, what excites you (fill this for me)]"
location      : "Mumbai, India"
github        : "https://github.com/shail-712"
linkedin      : "https://linkedin.com/in/shail712”
email         : "shailshajim@gmail.com"
resumeUrl     : "[will provide later]"

-- 02. Projects (repeat block for each project) --
title         : "[Project name]"
description   : "[2–3 sentences: what it does, why you built it, what problem it solves]"
techStack     : ["React", "Node.js", "MongoDB", ...]
githubLink    : "https://github.com/..."
liveLink      : "https://..." (or null if no live demo)
image         : "[path to screenshot]" (or null for placeholder)
category      : "Web" OR "ML" OR "Other"
featured      : true OR false (true = show on home page)

-- 03. Skills --
Frontend      : ["React", "Next.js", "TypeScript", "Tailwind CSS", ...]
Backend       : ["Node.js", "Express", "Python", "FastAPI", "REST APIs", ...]
ML / AI       : ["PyTorch", "TensorFlow", "scikit-learn", "Pandas", ...]
Tools         : ["Git", "Docker", "Vercel", "AWS", "Figma", ...]

-- 04. Profile photo --
Provide a square or portrait photo, minimum 400×400px.
Used in Hero and About sections.
If unavailable, Gemini will design an illustrated avatar fallback.

----------------------------------------------------------------
MULTI-AGENT WORKFLOW
----------------------------------------------------------------

AGENT ROLES
-----------
Claude  → Orchestrator + Engineer
         - Project orchestration and planning
         - React component logic and state
         - React Router v6 routing
         - EmailJS integration
         - Form validation and error handling
         - Dark/light mode (localStorage persistence)
         - Data layer (projects.js, skills.js)
         - Performance and lazy loading
         - QA, review, and integration
         - Deployment config (Vite + Vercel)

Gemini  → UI Designer
         - Visual design decisions
         - Component layout and spacing
         - CSS / Tailwind styling
         - Color system implementation
         - Responsive breakpoints
         - Hover and micro-interaction styles
         - Animation CSS (Framer Motion specs)
         - Typography and icon choices
         - Dark mode CSS variables
         - Accessibility (ARIA, contrast ratios)

KEY PRINCIPLE
Claude never makes visual decisions alone.
Gemini never makes logic decisions alone.
When in doubt, Claude asks Gemini for a design spec before implementing.

HANDOFF SEQUENCE
----------------
Step 1 — Claude (Scaffold)
  Creates Vite+React project, installs dependencies
  (React Router, Framer Motion, EmailJS), builds file
  structure, writes data files with real content.

Step 2 — Gemini (Design System)
  Receives color palette + brief.
  Outputs: CSS variables file, typography scale,
  spacing tokens, dark mode variables.
  Returns output to Claude.

Step 3 — Gemini (Component Designs)
  For each component (Navbar, Hero, ProjectCard,
  SkillBadge, ContactForm), outputs styled JSX with
  Tailwind classes + Framer Motion animation specs.
  No logic — shells only.

Step 4 — Claude (Integration)
  Takes Gemini's styled components, wires in state,
  routing, data, EmailJS, validation.
  Flags any design/logic conflicts back to Gemini.

Step 5 — Gemini (Polish Pass)
  Reviews final integrated build.
  Fixes spacing/visual issues.
  Outputs revised CSS. Approves animations.

Step 6 — Claude (QA + Deploy)
  Tests all flows, validates form, checks responsiveness,
  runs Lighthouse. Builds for production. Deploys to Vercel.

CONFLICT RESOLUTION RULE
If Claude's logic requirements conflict with Gemini's visual
choices, Claude documents the constraint and Gemini redesigns
within those constraints. Claude never overrides design
choices unilaterally.

----------------------------------------------------------------
CORE FEATURES
----------------------------------------------------------------
Priority: P0 = must have / P1 = important / P2 = nice to have

[P0] Home / Hero section
     Owner  : Claude (logic) + Gemini (design)
     Details: Name, tagline, CTA buttons, animated intro

[P0] Projects showcase
     Owner  : Claude (filter logic) + Gemini (card design)
     Details: Filter by category, modal or detail page,
              GitHub + live demo links per project

[P0] Skills section
     Owner  : Claude (data) + Gemini (badge design)
     Details: Frontend / Backend / ML / Tools categories

[P0] About + Resume          ← NEW (was missing in v1)
     Owner  : Claude (content) + Gemini (layout)
     Details: Short bio, resume PDF download button

[P0] Contact form
     Owner  : Claude
     Details: EmailJS, validation, success/error states

[P1] Dark / light mode toggle
     Owner  : Gemini (CSS vars) + Claude (localStorage)
     Details: Default dark. Preference saved locally.

[P1] Smooth page transitions
     Owner  : Gemini
     Details: Framer Motion. See animation budget below.

[P2] Navbar active state + scroll behavior
     Owner  : Claude + Gemini
     Details: Highlight current section, blur backdrop on scroll

REMOVED: Sound toggle (unprofessional for recruiter audience)

----------------------------------------------------------------
DESIGN SYSTEM
----------------------------------------------------------------

COLOR PALETTE
#0A192F  — Dark Navy (primary background)
#112240  — Slightly lighter navy (surface/cards)
#8B0000  — Maroon (accent, hover states)
#FFD700  — Accent Gold (highlights, CTAs)
#64FFDA  — Mint/Teal (optional highlight color)
#CCD6F6  — Light blue-white (primary text)
#8892B0  — Slate (muted text)

TYPOGRAPHY (Gemini owns final selection — these are suggestions)
Display/Heading : Clash Display or Space Grotesk — bold, strong
Body            : DM Sans — 16px, 1.7 line-height
Code/Tech tags  : DM Mono — 12px, used in skill badges

STYLE NOTES
- Minimal, modern, clean with subtle character
- Apple-style spacing — generous whitespace
- Dark mode default
- No gradients on backgrounds, no parallax, no particles

----------------------------------------------------------------
ANIMATIONS BUDGET
----------------------------------------------------------------
(Framer Motion approved. ONLY these animations are in scope.)

Page transitions       : fadeIn + slideUp, 0.35s ease
Hero text reveal       : staggered fadeIn, 0.6s, 0.1s stagger
Project card hover     : scale(1.02) + shadow lift, 0.2s ease
Skill badge hover      : background color shift, 0.15s ease
Section scroll reveal  : fadeIn + slideUp on viewport enter, 0.5s, once
Project modal open     : scale + fade backdrop, 0.25s ease
Navbar scroll effect   : blur backdrop on scroll, CSS 0.2s

NO looping animations.
NO typewriter effects.
NO particle backgrounds.
NO parallax.
These hurt performance and distract on recruiter-facing sites.

----------------------------------------------------------------
TECH STACK
----------------------------------------------------------------
Framework   : React 18 + Vite
Routing     : React Router v6
Styling     : Tailwind CSS
Animations  : Framer Motion
Contact     : EmailJS (no backend needed)
Deployment  : Vercel
Repo        : GitHub

FILE STRUCTURE
src/
├── assets/          — images, icons, resume PDF
├── components/      — reusable UI (Gemini owns styling)
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── SkillBadge.jsx
│   ├── ContactForm.jsx
│   └── ThemeToggle.jsx
├── pages/           — one file per route (Claude owns routing)
│   ├── Home.jsx
│   ├── Projects.jsx
│   ├── About.jsx
│   └── Contact.jsx
├── data/            — Claude owns these
│   ├── projects.js
│   └── skills.js
├── hooks/           — useTheme.js, useEmailJS.js
├── styles/          — Gemini owns CSS vars, tokens
│   └── tokens.css
└── App.jsx

----------------------------------------------------------------
DATA SCHEMA
----------------------------------------------------------------

Project object:
{
  id          : string           // unique slug e.g. "ml-sentiment-app"
  title       : string
  description : string
  techStack   : string[]
  githubLink  : string | null
  liveLink    : string | null
  image       : string | null    // path or URL
  category    : "Web" | "ML" | "Other"
  featured    : boolean          // true = show on home page
}

UserPreferences object:
{
  theme        : "dark" | "light"   // default: "dark"
  soundEnabled : false              // removed from scope, always false
}

----------------------------------------------------------------
USER FLOW
----------------------------------------------------------------
1. User lands on Home page
   → Hero: name, tagline, CTA buttons ("View Projects", "Download Resume")
   → Featured projects visible below fold

2. User navigates to Projects
   → Filter bar: All / Web / ML / Other
   → Cards: title, tech stack tags, GitHub + live demo icons

3. User clicks a project card
   → Modal or detail page
   → Full description, screenshot, tech stack, external links

4. User checks About + Skills
   → Short bio, skill badges by category, resume PDF download

5. User goes to Contact
   → Validated form: name, email, message fields
   → Submit via EmailJS
   → Success or error state shown

6. User leaves with clear picture of the candidate

----------------------------------------------------------------
EDGE CASES + VALIDATION
----------------------------------------------------------------
Empty form fields      → Inline validation, submit disabled until valid
Invalid email          → Regex check, red border on field
Broken project links   → Open in new tab; if null, button is hidden
Image loading failure  → Fallback gradient placeholder with initials
Theme preference lost  → Catch localStorage error, fall back to "dark"
Mobile responsiveness  → Test at 375px, 768px, 1280px
EmailJS failure        → Red error banner, log to console

----------------------------------------------------------------
BUILD PHASES
----------------------------------------------------------------
Phase 1 — Claude scaffolds         (Day 1)
  Vite + React setup, routing, data files with real content,
  EmailJS hook, theme hook, folder structure.

Phase 2 — Gemini designs           (Day 1–2)
  CSS tokens, styled component shells (no logic),
  dark/light mode variables, responsive layouts,
  animation specs.

Phase 3 — Claude integrates        (Day 2–3)
  Wire logic into Gemini's components.
  Filter state, form validation, EmailJS, localStorage, modals.

Phase 4 — Gemini polishes          (Day 3)
  Visual QA. Fix spacing/color issues from integration.
  Final animation review and approval.

Phase 5 — Claude deploys           (Day 3–4)
  Lighthouse audit, fix perf issues, vite build,
  deploy to Vercel, configure domain (optional).

================================================================
END OF PRD v2.0
================================================================
----------------------------------------------------------------
FINAL BUILD CONSTRAINT
----------------------------------------------------------------
- Site must load under 2.5 seconds
- Lighthouse score > 90
- Mobile-first responsiveness
- No unnecessary dependencies

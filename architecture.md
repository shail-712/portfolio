# Architecture — Shail Portfolio

> Agent: Claude (Logic Engineer)  
> PRD Version: 2.0  
> Build Phase: Phase 1 (Scaffold + Logic) → Phase 3 (Integration)  
> Status: ✅ Build passing — 463 modules, 0 errors

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React | 19 |
| Build Tool | Vite | 8 |
| Routing | React Router | v7 (v6 API) |
| Animations | Framer Motion | 12 |
| Contact | @emailjs/browser | 4 |
| Styling | Tailwind CSS (v4 via @tailwindcss/vite) | 4 |
| Deployment | Vercel | — |

---

## Full Project Structure

```
portfolio/
├── .env.example              ← EmailJS env var template
├── .gitignore
├── index.html                ← Entry HTML (SEO meta, dark-mode default)
├── vite.config.js            ← Vite + React + Tailwind plugins
├── package.json
├── PRD.md
├── tokens.css                ← Root-level copy (reference only)
├── ui_components.md          ← Gemini's visual shells (reference only)
│
└── src/
    ├── main.jsx              ← React root, imports styles/tokens.css
    ├── App.jsx               ← Router root, theme + modal state owners
    ├── index.css             ← Intentionally empty (legacy placeholder)
    │
    ├── styles/
    │   └── tokens.css        ← Design system: Tailwind @import, CSS vars,
    │                            fonts, base resets, .light-mode overrides
    │
    ├── data/                 ← Pure data layer (no React, no side effects)
    │   ├── personal.js       ← Name, bio, role, social links, resumeUrl
    │   ├── projects.js       ← Project array + query helpers
    │   └── skills.js         ← Skills by category + query helpers
    │
    ├── hooks/                ← Custom React hooks (logic only)
    │   ├── index.js          ← Barrel export
    │   ├── useTheme.js       ← Dark/light toggle + localStorage + .light-mode class
    │   ├── useEmailJS.js     ← EmailJS send + status state machine
    │   ├── useFormValidation.js ← Generic field validation + validators
    │   └── useProjectModal.js   ← Modal open/close + scroll lock
    │
    ├── components/           ← Reusable UI components
    │   ├── Layout.jsx        ← Navbar + Outlet + Footer + scroll-to-top
    │   ├── Navbar.jsx        ← Fixed nav, NavLink active state, mobile menu
    │   ├── Hero.jsx          ← Animated hero (Framer Motion stagger)
    │   ├── ProjectCard.jsx   ← Card with modal trigger, image fallback
    │   ├── ProjectModal.jsx  ← Animated overlay modal (AnimatePresence)
    │   ├── SkillBadge.jsx    ← Pill badge with hover animation
    │   ├── ContactForm.jsx   ← Wired form: validation + EmailJS
    │   ├── SectionReveal.jsx ← Scroll-triggered fade+slide wrapper
    │   └── ThemeToggle.jsx   ← Standalone toggle (also in Navbar)
    │
    └── pages/                ← Route-level components (one per route)
        ├── Home.jsx          ← / → Hero + Featured Projects
        ├── Projects.jsx      ← /projects → Filter + All Projects grid
        ├── About.jsx         ← /about → Bio + Skills
        └── Contact.jsx       ← /contact → ContactForm
```

---

## Routing

Built with **React Router v6 API** (react-router-dom v7).

```
BrowserRouter
└── Routes
    └── Route element={<Layout>}             ← Shared shell (Navbar + Footer)
        ├── Route index → <Home />           ← /
        ├── Route "projects" → <Projects />  ← /projects
        ├── Route "about" → <About />        ← /about
        ├── Route "contact" → <Contact />    ← /contact
        └── Route "*" → <NotFound />         ← 404 catch-all
```

### Route Details

| Path | Component | Load Strategy | Description |
|---|---|---|---|
| `/` | `Home` | Eager | Hero + featured projects. Critical path. |
| `/projects` | `Projects` | Lazy | Filter bar + full project grid |
| `/about` | `About` | Lazy | Bio + skills by category |
| `/contact` | `Contact` | Lazy | Contact form + email fallback |
| `*` | `NotFound` | Inline | Styled 404 with home link |

> **Lazy loading** — `Projects`, `About`, and `Contact` are code-split via `React.lazy()` + `Suspense`. Each generates a separate `.js` chunk in the build output. `Home` is eager since it's the critical first render.

---

## Component Map

### Layout Components

| Component | Props | Description |
|---|---|---|
| `Layout` | `theme`, `toggleTheme` | Route shell — renders Navbar + `<Outlet>` + Footer |
| `Navbar` | `theme`, `toggleTheme` | Fixed nav with RouterLinks, mobile menu, theme toggle |
| `SectionReveal` | `children`, `className?` | `motion.section` fade+slideUp on viewport enter |

### Page Components

| Component | Route | Key Logic |
|---|---|---|
| `Home` | `/` | `getFeaturedProjects()` → passes `onOpenModal` to cards |
| `Projects` | `/projects` | `useState(activeCategory)` → `getProjectsByCategory()` |
| `About` | `/about` | `personal` + `getAllSkills()` + `getSkillCategories()` |
| `Contact` | `/contact` | Wraps `ContactForm`, renders direct email fallback |

### Feature Components

| Component | Description |
|---|---|
| `Hero` | Staggered Framer Motion reveal, data from `personal.js` |
| `ProjectCard` | `motion.article` hover scale, real data, modal trigger |
| `ProjectModal` | `AnimatePresence` scale+fade, Escape key, backdrop click |
| `SkillBadge` | Pill with maroon hover fill |
| `ContactForm` | Full validation + EmailJS, all states handled internally |

---

## Theme System

```
useTheme hook
  ├── Reads localStorage on init → defaults to 'dark'
  ├── Sets/removes .light-mode class on <html>
  │     dark:  :root { --color-bg-primary: #0A192F … }
  │     light: html.light-mode { --color-bg-primary: #F8FAFC … }
  ├── Persists preference to localStorage
  └── Falls back to 'dark' on localStorage error
```

CSS variables are defined in `src/styles/tokens.css` and consumed via Tailwind arbitrary syntax: `bg-[var(--color-bg-surface)]`.

---

## Data Flow

```
src/data/
  personal.js ──► Hero, About
  projects.js ──► Home (featured), Projects (filtered), ProjectCard, ProjectModal
  skills.js   ──► About (by category → SkillBadge)

State owners:
  App.jsx
    ├── theme + toggleTheme  (useTheme)      → Layout → Navbar
    ├── isOpen + selectedProject (useProjectModal) → ProjectModal (global)
    └── openModal                            → Home, Projects → ProjectCard

ContactForm is self-contained:
    ├── useFormValidation  (values, errors, touched)
    └── useEmailJS         (status: idle|sending|success|error)
```

---

## Performance

| Metric | Value |
|---|---|
| Build time | 444ms |
| Total JS (gzip) | ~124 KB |
| CSS (gzip) | 5.5 KB |
| Modules transformed | 463 |
| Build errors | 0 |

- Images use `loading="lazy"`
- Framer Motion: `viewport: { once: true }` — no re-trigger on scroll
- Navbar scroll listener: `{ passive: true }`
- No looping animations, particles, or parallax (per PRD constraint)

---

## Environment Variables

Create `.env` in project root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get values from [emailjs.com](https://emailjs.com). Missing vars trigger an error state in the form.

---

## Deployment (Vercel)

Build command: `npm run build` | Output: `dist` | Preset: Vite

Create `vercel.json` for SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

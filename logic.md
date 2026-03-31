# Logic Implementation — Shail Portfolio

> Agent: Claude (Logic Engineer)
> Covers: All hooks, data layer query functions, form logic, modal logic, theme logic

---

## 1. Data Layer

### `src/data/personal.js`

Single source of truth for all personal/branding content. Consumed by `Hero`, `About`, `Contact`, `Layout` (footer).

```js
const personal = {
  name: 'Shail Shaji',
  tagline: 'I build until the output matches the vision.',
  role: 'Full-Stack Developer & ML Engineer',
  bio: '...',
  location: 'Mumbai, India',
  github: 'https://github.com/shail-712',
  linkedin: 'https://linkedin.com/in/shail712',
  email: 'shailshajim@gmail.com',
  resumeUrl: null,   // Set to PDF URL when ready
};
```

> **Resume gate:** Every component that renders the resume download button checks `if (personal.resumeUrl)` before rendering. When a URL is provided, the button appears automatically everywhere.

---

### `src/data/projects.js`

Project schema (per PRD v2.0):

```js
{
  id: string,          // URL-safe slug
  title: string,
  description: string,
  techStack: string[],
  githubLink: string | null,
  liveLink: string | null,
  image: string | null,  // Falls back to initials gradient if null
  category: 'Web' | 'ML' | 'Other',
  featured: boolean      // true = shown on Home page
}
```

**Query helpers exported:**

| Function | Returns |
|---|---|
| `getAllProjects()` | All projects |
| `getProjectsByCategory(cat)` | Filtered; `'All'` returns all |
| `getFeaturedProjects()` | Projects where `featured === true` |
| `getProjectById(id)` | Single project or `undefined` |
| `getCategories()` | `['All', ...unique categories]` |

---

### `src/data/skills.js`

Skills organized by category object. Query helpers:

| Function | Returns |
|---|---|
| `getAllSkills()` | `{ category: string[] }` object |
| `getSkillsByCategory(cat)` | `string[]` for one category |
| `getSkillCategories()` | Array of category name strings |

---

## 2. Hooks

### `useTheme` — `src/hooks/useTheme.js`

**Purpose:** Dark/light mode with localStorage persistence.

**State:** `theme: 'dark' | 'light'` (default: `'dark'`)

**DOM effect:** Toggles `.light-mode` class on `<html>` element — matches Gemini's CSS selector `html.light-mode { ... }` in `tokens.css`.

**localStorage:** Reads on mount. Falls back to `'dark'` if unavailable (private browsing, storage errors).

**Returns:**
```js
{
  theme,        // 'dark' | 'light'
  isDark,       // boolean
  toggleTheme,  // () => void
  setTheme,     // (theme: string) => void
}
```

**Flow:**
```
mount → getInitialTheme() → read localStorage → validate → setState
theme change → useEffect → classList.add/remove → localStorage.setItem
Navbar button click → toggleTheme() → flips 'dark' ↔ 'light'
```

---

### `useEmailJS` — `src/hooks/useEmailJS.js`

**Purpose:** Encapsulates EmailJS form send with status tracking.

**Status machine:**
```
idle ──► sending ──► success
                └──► error
success/error ──► idle  (via resetStatus())
```

**Config:** Reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` from `import.meta.env`. Fails gracefully with error state if any are missing.

**Usage:**
```js
const { sendEmail, isSending, isSuccess, isError, error, resetStatus } = useEmailJS();

// In form submit handler:
const ok = await sendEmail(formRef);  // formRef = useRef(null) on <form>
if (ok) { resetForm(); setTimeout(resetStatus, 5000); }
```

**Returns:**
```js
{
  sendEmail,   // async (formRef) => boolean
  status,      // 'idle' | 'sending' | 'success' | 'error'
  error,       // string | null
  isSending,   // boolean
  isSuccess,   // boolean
  isError,     // boolean
  resetStatus, // () => void
}
```

---

### `useFormValidation` — `src/hooks/useFormValidation.js`

**Purpose:** Generic per-field form validation with composable rules.

**Validation rules pattern:**
```js
const validationRules = {
  fieldName: (value: string) => errorString | null
};
```

**Built-in validators (exported as `validators`):**

| Validator | Usage |
|---|---|
| `validators.required(label)` | Returns error if empty |
| `validators.email()` | Regex check + required |
| `validators.minLength(n, label)` | Min character count |
| `validators.compose(...fns)` | Run multiple rules in sequence, first error wins |

**ContactForm rules:**
```js
{
  user_name:  validators.required('Name'),
  user_email: validators.email(),
  message:    validators.compose(
                validators.required('Message'),
                validators.minLength(10, 'Message')
              ),
}
```

**Validation behaviour:**
- `handleBlur` → marks field as `touched`, validates immediately
- `handleChange` → re-validates on every keystroke **only if** field was already touched (prevents errors flashing on first type)
- `validate()` → validates all fields at once (called on submit), marks all as touched

**Returns:**
```js
{
  values,       // { [name]: string }
  errors,       // { [name]: string | null }
  touched,      // { [name]: boolean }
  isValid,      // boolean (useMemo — no error + all rules touched)
  handleChange, // (e: Event) => void
  handleBlur,   // (e: Event) => void
  validate,     // () => boolean
  resetForm,    // () => void
}
```

---

### `useProjectModal` — `src/hooks/useProjectModal.js`

**Purpose:** Open/close modal state with scroll-lock side effect.

**Body scroll lock:** Sets `document.body.style.overflow = 'hidden'` on open; restores `''` on close.

**Delayed data clear:** `selectedProject` is cleared 300ms after `isOpen = false` — allows exit animation to complete before unmounting project data.

**Returns:**
```js
{
  isOpen,          // boolean
  selectedProject, // Project | null
  openModal,       // (project: Project) => void
  closeModal,      // () => void
}
```

---

## 3. Component Logic Details

### Navbar

| Logic | Implementation |
|---|---|
| Active link state | `NavLink className={({ isActive }) => …}` |
| Scroll detection | `useEffect` with `window.addEventListener('scroll', …, { passive: true })` |
| Mobile menu | `useState(menuOpen)` — toggled by hamburger, closed on link click |
| Theme toggle | Calls `toggleTheme` prop, renders Sun/Moon SVG based on `theme` prop |
| Route change cleanup | `NavLink onClick={closeMenu}` — all mobile links close the menu |

### Hero

| Logic | Implementation |
|---|---|
| Data binding | All text from `personal.js` — name, tagline, bio, resumeUrl |
| CTA "View Projects" | `<Link to="/projects">` — React Router client navigation |
| CTA "Download Resume" | `<a target="_blank">` — only rendered if `personal.resumeUrl !== null` |
| Animation | Framer Motion `containerVariants` (stagger 0.1s) + `itemVariants` (fadeIn+slideUp, 0.6s) |

### ProjectCard

| Logic | Implementation |
|---|---|
| Modal trigger | `onClick` + `onKeyDown` (Enter/Space) calls `onOpenModal(project)` |
| Image fallback | `onError` hides `<img>`, shows initials span (first letter of each word) |
| Link propagation | Link `<a>` tags wrapped in `onClick={(e) => e.stopPropagation()}` div |
| Accessibility | `role="button"`, `tabIndex={0}`, `aria-label` with project title |

### ProjectModal

| Logic | Implementation |
|---|---|
| Close: Escape | `useEffect` adds `keydown` listener when `isOpen`; removed on cleanup |
| Close: backdrop | `onClick={onClose}` on outer div; `e.stopPropagation()` on inner card |
| Focus management | `useEffect` focuses close button (via `closeRef`) 50ms after open |
| Exit animation | `AnimatePresence` wraps modal; scale+fade on both enter and exit |
| Scroll lock | Managed by `useProjectModal` hook (not the component) |

### ContactForm

| Flow | Implementation |
|---|---|
| Field change | `handleChange` → updates value, re-validates if touched |
| Field blur | `handleBlur` → marks touched, validates field |
| Submit | `handleSubmit` → calls `validate()`, then `sendEmail(formRef)` |
| Success | Banner shown, form reset, banner auto-dismissed after 5s |
| Error | Banner shows `emailError` or fallback message |
| Sending state | Submit button disabled + shows "Sending…" text |
| Error styling | Invalid fields get `border-[var(--color-accent-maroon)]` via computed class |

---

## 4. Edge Cases Handled

| Case | Handling |
|---|---|
| Empty form submit | `validate()` blocks send, marks all fields touched, shows inline errors |
| Invalid email | Regex `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` |
| EmailJS config missing | Error state shown immediately with descriptive message |
| EmailJS API failure | Caught in try/catch, `err.text || err.message` shown |
| Null project links | All link renders guarded: `{githubLink && <a>…</a>}` |
| Broken project image | `onError` hides image, shows initials gradient fallback |
| localStorage unavailable | `try/catch` in `getInitialTheme`, falls back to `'dark'` |
| Theme persistence error | `try/catch` in `useEffect`, warns to console but doesn't crash |
| Modal Escape key leak | Listener registered only when `isOpen`, removed on cleanup |
| Body scroll stuck | `useProjectModal.closeModal` always restores `''` on close |
| 404 routes | React Router `path="*"` catch-all renders `NotFound` component |
| Mobile menu on navigate | `NavLink onClick={closeMenu}` on all mobile links |

---

## 5. State Ownership Summary

```
App.jsx (root state owner)
├── theme, isDark, toggleTheme     ← useTheme()
│   └── → Layout → Navbar (display + toggle button)
│
├── isOpen, selectedProject        ← useProjectModal()
│   openModal, closeModal
│   └── → ProjectModal (global overlay)
│   └── → Home, Projects → ProjectCard (openModal passed down)
│
ContactForm.jsx (self-contained)
├── values, errors, touched        ← useFormValidation()
└── status, error                  ← useEmailJS()
```

No global state library (Redux, Zustand) needed — prop drilling is shallow (max 2 levels).

---

## 6. Handoff Notes for Gemini (Phase 4 Polish)

- **All IDs are set** — every interactive element has a unique `id` for targeting: `contact-form`, `contact-submit-btn`, `modal-close-btn`, `nav-logo`, `filter-all`, etc.
- **No inline styles** — all layout/color uses Tailwind utility classes with CSS variables. Safe to override by changing `tokens.css` values.
- **`.light-mode` hook** — Change light theme colors only in `src/styles/tokens.css` under `html.light-mode { }`.
- **Animation budget** — All Framer Motion animations match PRD spec exactly. Do not add animations outside the approved list.
- **Component boundaries** — Visual changes belong in component JSX (className). State/logic changes belong in hooks. This boundary is clean.

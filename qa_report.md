# QA Report – Portfolio Project (Based on PRD v2.0)

## 1. Performance Issues

| Area | Potential Issue | Impact | Suggested Fix |
|------|----------------|--------|--------------|
| **Bundle Size** | No explicit code‑splitting / lazy‑loading strategy mentioned. Tailwind + Framer Motion can increase bundle weight. | Longer initial load, may breach <2.5 s target. | Enable Vite’s dynamic `import()` for route‑level code splitting. Use Tailwind’s `purge` (or `content`) configuration to strip unused classes. |
| **Images** | Project screenshots are referenced but no optimisation strategy (compression, responsive sizes). | Large network payload, slower paint. | Store images in WebP/AVIF, generate multiple resolutions, use `<picture>` with `srcset`. Add lazy‑load (`loading="lazy"`). |
| **Animations** | Multiple Framer Motion animations (page transitions, hover, scroll reveal). | Excessive layout/paint work on low‑end devices. | Keep animation duration ≤ 0.35 s (already defined) and use `will-change` where appropriate. Disable animations on `prefers-reduced-motion`. |
| **Data Loading** | Projects/skills data loaded from static JS files; no async fetching. | May block main thread if data grows. | Convert `projects.js` & `skills.js` to JSON and fetch lazily after initial render. |
| **Theme Toggle** | Theme persisted via `localStorage` without debounce. | Frequent writes could affect performance on low‑end browsers. | Debounce writes (e.g., 300 ms) and read once on app start. |

## 2. UX Problems

| Issue | Description | Fix Suggestion |
|-------|-------------|----------------|
| **Missing ARIA / Accessibility** | No explicit ARIA labels for navigation, buttons, or form fields. | Add `aria-label`, `role`, and ensure focus order. Use semantic HTML (`<nav>`, `<header>`, `<main>`, `<footer>`). |
| **Focus Management** | Modal or detail page not described; focus may remain on background. | Trap focus inside modal, return focus to triggering element on close. |
| **Keyboard Navigation** | No mention of keyboard shortcuts or tab navigation for interactive elements. | Ensure all interactive components are reachable via `Tab` and have visible focus outlines. |
| **Contrast Ratio** | Dark navy background with light text; need to verify WCAG AA/AAA. | Run Lighthouse contrast audit; adjust text color if <4.5:1. |
| **Responsive Breakpoints** | Only three breakpoints listed; no testing guidance for very small screens (<320 px). | Add fluid typography (clamp) and test at 320 px width. |
| **Missing Loading States** | Image placeholders mentioned, but no skeleton loaders for data fetches. | Add skeleton UI for project cards while data loads. |

## 3. Missing Features

| Feature | Why It Matters | Suggested Implementation |
|---------|----------------|--------------------------|
| **Search / Filter** | Recruiters may want to find a specific project quickly. | Add a client‑side search input that filters `projects` by title/tech stack. |
| **Pagination / Lazy Load Project List** | Large project list could degrade performance. | Implement infinite scroll or “Load More” button with lazy loading of cards. |
| **Resume PDF** | `resumeUrl` placeholder; no actual resume provided. | Upload resume PDF to `assets/` and link it in About section. |
| **Profile Photo** | Placeholder avatar may look generic. | Use `generate_image` to create a stylised avatar or request the user’s photo. |
| **Dark/Light Mode Toggle UI** | Theme toggle component exists but UI spec not defined. | Design a toggle button with clear icons (sun/moon) and visible focus state. |
| **Error Reporting** | EmailJS failure handling only logs to console. | Show a user‑friendly toast notification and optionally retry. |

## 4. Edge Cases & Validation

| Edge Case | Current Handling (per PRD) | Recommended Improvement |
|-----------|---------------------------|--------------------------|
| **Empty Form Fields** | Inline validation, submit disabled. | Ensure error messages are announced to screen readers (`aria-live`). |
| **Invalid Email** | Regex check, red border. | Provide descriptive error text and `aria-describedby`. |
| **Broken Project Links** | Hide button if `null`. | Add fallback that opens a modal explaining “Link not available”. |
| **Image Loading Failure** | Gradient placeholder with initials. | Also set `onError` to replace with a default fallback image. |
| **Theme Preference Lost** | Catch `localStorage` error, fallback to `dark`. | Store preference in `sessionStorage` as secondary fallback. |
| **Mobile Responsiveness** | Test at 375 px, 768 px, 1280 px. | Add tests for 320 px (small phones) and landscape orientations. |
| **EmailJS Failure** | Red error banner, console log. | Implement exponential back‑off retry and fallback to `mailto:` link. |

## 5. Compliance Checklist

- **Load Time < 2.5 s**: Implement code‑splitting, image optimisation, Tailwind purge, lazy loading of data and images.
- **Lighthouse > 90**: Address performance (above), accessibility (ARIA, contrast, focus), best practices (HTTPS, modern JS), SEO (meta tags, headings). |

## 6. Overall Fix Recommendations (Prioritized)

1. **Performance Optimisation** – Enable Vite code‑splitting, purge Tailwind, optimise images, lazy‑load data.
2. **Accessibility Audit** – Add ARIA, focus management, contrast fixes.
3. **Feature Gaps** – Implement search/filter, pagination, resume upload, profile photo.
4. **Robust Edge‑Case Handling** – Enhance error UI, retry logic, fallback assets.
5. **Testing** – Add automated Lighthouse CI step; run on PRs to enforce > 90 score.

---
*Generated by Antigravity (QA Engineer role) on 2026‑03‑30.*

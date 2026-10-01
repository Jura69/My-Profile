# Codebase Summary

**Project:** Personal Portfolio Website
**Last Updated:** 2026-07-30
**Build Tool:** Vite 6 (SPA)
**Framework:** React 19 + React Router 7
**Styling:** Tailwind CSS 4
**Animation:** Motion 12 + GSAP 3.15 + Lenis
**Code Files:** 69 TS/TSX (`components/` 42, `src/` 23, `lib/` 2, `providers/` 2) + 2 build scripts
**Public Assets:** ~4.3MB (1.5MB Draco GLB, ~2.5MB WebP images, 168K CV.pdf)

---

## Executive Overview

Vite 6 SPA portfolio using React 19, client-side routing (React Router 7), Tailwind CSS 4, and Motion 12 + GSAP for animations. Rebuilt from Next.js to Vite (v2, 2026-07). All content is hardcoded TypeScript data — no backend, no CMS. Architecture emphasizes performance through route-level lazy loading, vendor chunk isolation, scroll work confined to GSAP scene components (zero React re-renders on scroll), and build-time sitemap generation from the same data the pages render.

**Key Characteristics:**
- 100% functional components, strict TypeScript
- Every route except the homepage lazy-loads its own chunk (~2KB each); app chunk ~52KB
- Scroll animations isolated to `components/scene/` (GSAP writes CSS vars/transforms directly)
- SEO: static OG fallback in `index.html` for no-JS crawlers + per-page React 19 hoisted meta + JSON-LD + build-time sitemap
- Lint gate: 0 errors / 0 warnings across `src components lib providers scripts vite.config.ts`
- 96.7% 3D model compression (Draco, 44MB → 1.5MB)

---

## Directory Structure

```
My-Profile/
├── src/
│   ├── main.tsx              # Vite entry (createRoot + StrictMode)
│   ├── app.tsx               # BrowserRouter, lazy routes, Suspense, RouteErrorBoundary
│   ├── pages/                # Route components (all lazy except index.tsx)
│   │   ├── index.tsx         # Homepage (eager — LCP route)
│   │   ├── works.tsx         # Projects listing, tabbed (+ works/ 11 detail pages)
│   │   ├── activities.tsx    # Activities listing (+ activities/ytc.tsx)
│   │   └── audiophile.tsx    # Audio listing (+ audiophile/ 4 detail pages)
│   ├── styles/global.css     # Tailwind 4 @theme tokens + scene keyframes
│   └── three-modules.d.ts    # Ambient types for three example modules
├── components/               # (repo root, NOT src/)
│   ├── ui/                   # Primitives: badge, button(+styles), card, container,
│   │                         #   icon-button, page-banner, reveal, section-heading
│   ├── layout/               # main (app shell), navbar, footer, detail-page,
│   │                         #   not-found, route-error-boundary, theme-toggle
│   ├── home/                 # hero-dawn, about-morning, skills-bento,
│   │                         #   experience-dusk, night-contact + home-data.ts
│   ├── works/                # project-card, featured-project-card, works-tabs
│   │                         #   + works-data.ts
│   ├── scene/                # ambient-scene, celestial-arc, parallax-hills, stars,
│   │                         #   zone-particles, zone-data, scene-provider,
│   │                         #   use-scene, use-pinned-intro, svg/{hills,moon}
│   ├── icons/                # kit-icon-base (IconComponent type), kit-icons-interface,
│   │                         #   kit-icons-topics, kit-ornaments, kit-dividers (inline SVG)
│   │                         #   totoro.tsx = navbar logo (kept by user decision)
│   ├── seo.tsx               # Per-page meta (React 19 hoists to <head>)
│   ├── json-ld.tsx           # Person/Website/ProfilePage/Project/Breadcrumb schemas
│   ├── totoro.tsx            # Three.js viewer (lazy-loaded from hero-dawn)
│   └── totoro-loader.tsx     # Spinner + container while GLB streams
├── lib/
│   ├── cn.ts                 # clsx + tailwind-merge helper
│   └── model.ts              # GLTF/Draco loader, Promise<Group>, isMesh() guard
├── providers/
│   ├── theme.tsx             # ThemeProvider (persists only explicit choices)
│   └── use-theme.ts          # ThemeContext + useTheme() (react-refresh split)
├── scripts/
│   ├── vite-plugin-sitemap.ts  # Emits dist/sitemap.xml from works-data
│   └── optimize-images.mjs     # One-off sharp-based image pipeline
├── public/                   # apple-touch-icon.png, cv.html, favicon.ico,
│   │                         #   robots.txt, totoro-compressed.glb, files/CV.pdf
│   └── images/               # WebP (exceptions: og-image-forest.jpg, apple-touch-icon.png)
│       ├── ui/               # Kit materials (paper grain, button wash, brush mask, wreath)
│       ├── banners/          # <page>-<day|night>-{800,1600,2400}.webp
│       └── works/            # <id>-cover-{480,640,1280}.webp
├── index.html                # Static OG/description fallback + pre-paint theme script
├── vite.config.ts            # Plugins + function-form manualChunks
├── vercel.json               # SPA rewrite /(.*) → /index.html, framework vite
├── tsconfig.json             # Project references → tsconfig.app + tsconfig.node
├── .eslintrc.cjs             # TS + react-hooks + react-refresh (0/0 gate)
├── prettier.config.js        # No semicolons, single quotes, LF
└── .gitattributes            # * text=auto eol=lf + binary rules
```

Notable absences (deleted as cruft, do not reference): `components/layouts/`
(merged into `layout/`), `jest.config.js`, `jsconfig.json`, `package-lock.json`,
`.eslintrc.json`, `lib/performance.ts`, `public/sitemap.xml` (now build-generated),
`tailwind.config.ts` (Tailwind 4 configures via `@theme` in global.css).

---

## Data Model (single sources of truth)

**`components/works/works-data.ts`** — drives listings, detail hrefs, AND the sitemap:
- `projects: Project[]` — 16 projects, each with `thumbnail` (640w cover) and `cover` (base path; `coverSrcSet()` builds the 640/1280 srcset) (4 personal, of which 3 `featured`; 12 enterprise `@ Creasia`, of which 2 `featured` AI flagships)
- `activities: CardItem[]` — 1 activity (YTC NTU)
- `audioGear: CardItem[]` — 4 devices (`ea1000`, `moondrop-ssp`, `onix`, `fiioka11`)
- Derived exports: `featuredProjects`, `otherPersonalProjects`, `enterpriseProjects`

**`components/home/home-data.ts`** — homepage content:
- `skillGroups` — 28 skills in 4 groups, AI-first order (AI & Agent Engineering 6, Frontend 8, Backend 8, DevOps 6)
- `experiences` — 4 timeline entries (CREASIA, Infodation, VNPT, university)
- `socialLinks` — 5 links (GitHub, LinkedIn, Facebook, Instagram, Email)
- `techIconMap` — tech-name → icon/color for experience badges

Adding a project/device: append to the array — listing card, route href, and
sitemap entry all follow. The page component in `src/pages/<section>/` and its
`<Route>` in `src/app.tsx` are still created by hand.

---

## Entry & Code Flow

### Initial Load

```
index.html (static OG meta + pre-paint theme script sets .dark before first paint)
  → src/main.tsx: createRoot(#root)
    → App (src/app.tsx): BrowserRouter
      → ThemeProvider (providers/theme.tsx)
        → SceneProvider (Lenis + ScrollTrigger sync, reduced-motion state)
          → MainLayout (AmbientScene + Navbar + children + Footer, MotionConfig reducedMotion="user")
            → RouteErrorBoundary (catches stale-chunk import rejections)
              → AnimatedRoutes (Suspense above keyed fade wrapper)
      → Vercel Analytics + Speed Insights
```

### Navigation

React Router 7 runs navigations inside `startTransition`, so when a lazy chunk
streams in, the previous page stays visible (the Suspense boundary sits ABOVE the
`key={pathname}` motion wrapper and never remounts). SceneProvider scrolls to top
and refreshes ScrollTrigger on pathname change. Legacy URL
`/audiophile/moondropSSP` has a `<Navigate replace>` redirect to
`/audiophile/moondrop-ssp`.

`/works` splits its listing into two tabs (`components/works/works-tabs.tsx`).
The active tab is a search param — `/works` (no param, or an unknown value) opens
Enterprise, `/works?tab=personal` opens Personal — so tabs are linkable and Back
steps between them. Both panels stay mounted; the inactive one is only `hidden`,
which keeps all 16 projects in the DOM for crawlers on this CSR-only SPA while
lazy cover images inside it skip their fetch until shown.

### Failure path (deploy invalidates chunks)

A long-lived tab requesting a deleted hashed chunk gets `index.html` back
(SPA rewrite) → dynamic import rejects → `RouteErrorBoundary` auto-reloads once
(sessionStorage-guarded), else renders a manual reload prompt.

### 3D scene

`hero-dawn.tsx` lazy-loads `components/totoro.tsx` (spinner from
`totoro-loader.tsx`); `lib/model.ts` loads `/totoro-compressed.glb` through
GLTFLoader + DRACOLoader (decoder from Google CDN), returns `Promise<Group>`.
Renderer: pixel ratio ≤ 2, `precision: 'mediump'`, conditional antialias,
shadows off, stencil off. 100-frame eased intro orbit, then OrbitControls.

---

## Theme System

New visitors follow the OS `prefers-color-scheme`; a stored choice always wins.
Two implementations MUST stay logic-identical (else FOUC):

1. Pre-paint inline script in `index.html` — sets `.dark` on `<html>` before paint
2. `readInitialMode()` in `providers/theme.tsx`

`ThemeProvider` persists to `localStorage.theme` ONLY on explicit choice (an
existing stored key, incl. legacy `chakra-ui-color-mode` migration, or a toggle
click) — never auto-writes the OS-derived value, so OS-following visitors keep
following the OS on later visits. `useTheme()` lives in `providers/use-theme.ts`
(context split from the provider file so react-refresh sees component-only exports).

---

## Build Pipeline

`yarn build` = `tsc -b && vite build`:
- `tsc -b` — project references (`tsconfig.app.json` for src/components,
  `tsconfig.node.json` for vite.config + sitemap plugin). Type errors halt build.
- Vite/Rollup — SWC transpile, tree-shake, function-form `manualChunks` matches
  the path segment AFTER the package directory: `vendor-three` (~590KB, loaded
  only with the lazy Totoro), `vendor-gsap` (~136KB incl. ScrollTrigger + Lenis),
  `motion` (~129KB), `vendor-icons` (~48KB, now only `si`/`di` brand logos + `IoLogo*`; kit icons live in app code), everything else (react, react-dom,
  router, glue) → `vendor-react` (~342KB). Glue libs share the react chunk on
  purpose — a separate misc chunk caused a circular-init TypeError that silently
  prevented mount.
- `scripts/vite-plugin-sitemap.ts` — `generateBundle` + `this.emitFile` writes
  `dist/sitemap.xml` (20 URLs) from works-data. No `node:fs`, no extra deps.

Deploy: push to `master` → Vercel builds (`vercel.json`: framework vite, dist
output, SPA rewrite). Hashed `/assets/*` get Vercel's default immutable caching;
there is no custom header config.

---

## Quality Gates

- `yarn lint` — ESLint over `src components lib providers scripts vite.config.ts`,
  expected 0 errors / 0 warnings (react-refresh rule enforced via hook-file splits)
- `yarn build` — tsc strict + Vite build must both pass
- No automated test suite — manual checklist + Lighthouse (see roadmap)
- Line endings: `.gitattributes` normalizes all text to LF

---

## Known Technical Debt

See `docs/project-roadmap.md` → "Known Issues & Technical Debt" (single source;
duplicated lists here kept drifting).

---

## Security Posture

- Static SPA: no API routes, no secrets in client code, CV.pdf intentionally public
- HTTPS + HSTS via Vercel defaults; no custom CSP headers configured
- Draco decoder and Google Fonts are the only external runtime origins

---

## Browser Support

Modern evergreen browsers (ES2020 + WebGL). No IE11. Reduced-motion users get a
static scene composition (`SceneProvider` gates Lenis/ScrollTrigger) and
instant page swaps; `MotionConfig reducedMotion="user"` covers Motion animations.

---

**Maintained By:** Trương Tuấn Lộc
**Regenerate hint:** verify counts against `works-data.ts` / `home-data.ts` and
the real file tree before editing this file.

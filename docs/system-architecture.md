# System Architecture Documentation

**Project:** Personal Portfolio Website
**Architecture Style:** Vite SPA (static, client-rendered)
**Last Updated:** 2026-07-30
**Build Tool:** Vite 6
**Runtime:** React 19 + React Router 7 (client-side routing)

---

## Table of Contents

1. [High-Level Architecture](#high-level-architecture)
2. [Technology Stack](#technology-stack)
3. [Component Hierarchy](#component-hierarchy)
4. [Data & State](#data--state)
5. [Rendering Strategy](#rendering-strategy)
6. [Build & Deployment Pipeline](#build--deployment-pipeline)
7. [Performance Architecture](#performance-architecture)
8. [SEO Architecture](#seo-architecture)
9. [3D Graphics Implementation](#3d-graphics-implementation)
10. [Security Posture](#security-posture)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   React 19   │  │ Three.js 3D  │  │  Motion 12   │       │
│  │  Components  │  │  (lazy GLB)  │  │ + GSAP Scroll│       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         └──────────────────┴─────────────────┘              │
│                            │                                │
│                ┌───────────▼───────────┐                    │
│                │  Tailwind CSS 4       │                    │
│                │  @theme tokens +      │                    │
│                │  .dark class          │                    │
│                └───────────┬───────────┘                    │
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  Vercel CDN     │
                    │  static dist/   │
                    │  SPA rewrite    │
                    │  (vercel.json)  │
                    └─────────────────┘
```

**Key decisions:**

1. **Pure static SPA** — no server, no API; all content is TypeScript data.
   React Router 7 handles navigation client-side; Vercel rewrites every path
   to `index.html` (`vercel.json`).
2. **TypeScript + Tailwind 4** — strict TS everywhere; design tokens live in
   `src/styles/global.css` under `@theme` (Tailwind 4 has no config file here).
3. **Two-tier animation system** — Motion 12 for component-level
   transitions/reveals; GSAP ScrollTrigger + Lenis EXCLUSIVELY inside
   `components/scene/` writing CSS vars/data-attrs directly (zero React
   re-renders on scroll).
4. **Route-level code splitting** — every page except the homepage is a lazy
   chunk; heavy vendors isolated into stable cacheable chunks.

---

## Technology Stack

| Layer | Choice | Why / Notes |
|---|---|---|
| Build | Vite 6 (SWC transpile, esbuild minify, Rollup bundle) | Instant HMR; `tsc -b` runs first for strict type gate |
| UI | React 19 | Native metadata hoisting (`<title>`/`<meta>` from components), Suspense-driven lazy routes |
| Routing | React Router 7 (`BrowserRouter`) | Navigations run in `startTransition` → old page stays visible while lazy chunks stream |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` | `@theme` tokens; semantic vars (`--surface`, `--ink`, `--accent`, `--line`) flipped by `.dark` |
| Component animation | Motion 12 | Reveals, hovers, page fade; honors `MotionConfig reducedMotion="user"` |
| Scroll animation | GSAP 3.15 + ScrollTrigger + Lenis | One rAF loop (Lenis driven by GSAP ticker); confined to `components/scene/` |
| 3D | Three.js 0.172 + GLTFLoader/DRACOLoader | Hand-rolled setup, no react-three-fiber (avoids abstraction cost for one model) |
| UI primitive | @radix-ui/react-dropdown-menu | Mobile nav menu only |
| Icons | react-icons (tree-shaken per-icon) | ~44 icons used → own `vendor-icons` chunk |
| Analytics | @vercel/analytics + @vercel/speed-insights | Core Web Vitals field data |
| Hosting | Vercel | `vercel.json`: framework vite, `dist` output, SPA rewrite; default immutable caching for hashed assets |

---

## Component Hierarchy

```
App (src/app.tsx — BrowserRouter)
├── ThemeProvider (providers/theme.tsx; context in providers/use-theme.ts)
│   └── SceneProvider (components/scene/scene-provider.tsx — Lenis instance,
│       │              ScrollTrigger sync, reducedMotion state, scroll reset per route)
│       └── MainLayout (components/layout/main.tsx, memoized,
│           │           <MotionConfig reducedMotion="user">)
│           ├── AmbientScene (fixed background: sky gradient, moon arc,
│           │                 parallax hills, stars, zone particles — GSAP-driven)
│           ├── Navbar (fixed; desktop links + Radix dropdown mobile menu;
│           │           NAV_LINKS = Works, Audiophile — Activities off-nav by design)
│           ├── RouteErrorBoundary (stale-chunk auto-reload guard)
│           │   └── AnimatedRoutes
│           │       └── Suspense fallback={null}        ← ABOVE the keyed wrapper
│           │           └── motion.div key={pathname}   (0.25s entrance fade)
│           │               └── Routes (all static paths, no URL params)
│           │                   ├── /                    HomePage (EAGER — LCP route)
│           │                   ├── /works               + 11 detail routes (lazy)
│           │                   ├── /activities          + /activities/ytc (lazy)
│           │                   ├── /audiophile          + 4 detail routes (lazy)
│           │                   ├── /audiophile/moondropSSP → Navigate replace
│           │                   │                          → /audiophile/moondrop-ssp
│           │                   └── *                    NotFound
│           └── Footer
├── Vercel Analytics
└── Vercel Speed Insights
```

Homepage composition (day→night scroll narrative): `HeroDawn` (lazy-loads the
Three.js `Totoro`), `AboutMorning`, `SkillsBento`, `ExperienceDusk`,
`NightContact` — each owns an inner `max-w-[1100px]` column; the fixed
`AmbientScene` runs behind all of them.

**Single layout rule:** `MainLayout` wraps once at the app root. Pages return
fragments — there is no per-page layout wrapper (the old `layouts/article` shim
was a no-op and was deleted).

---

## Data & State

### Content (all hardcoded TypeScript)

- `components/works/works-data.ts` — 11 projects, 1 activity, 4 audio devices;
  single source for listing cards, detail hrefs AND the build-time sitemap
- `components/home/home-data.ts` — 23 skills / 4 groups, 4 experience entries,
  5 social links, tech-icon map

### Runtime state (deliberately minimal)

| State | Owner | Mechanism |
|---|---|---|
| Theme mode | `ThemeProvider` | React context + localStorage (`theme` key; legacy `chakra-ui-color-mode` migrated). Persists ONLY explicit choices — OS-derived mode is never auto-written |
| Reduced motion | `SceneProvider` | `matchMedia('(prefers-reduced-motion: reduce)')` + change listener |
| Scroll progress | GSAP ScrollTrigger | CSS custom properties + data-attrs on the scene root — never React state |
| 3D loading | `Totoro` component | Local `useState` spinner |

No Redux/Zustand — nothing crosses more than one context boundary.

---

## Rendering Strategy

**Everything is CSR.** `src/main.tsx` calls `createRoot` (mount, not
hydration — there is no SSR HTML to hydrate). Implications, and how each is
mitigated:

1. **No-JS crawlers see only `index.html`** → static description/OG/Twitter
   fallback block is maintained in `index.html`, kept in sync with the homepage
   SEO props. JS-capable bots get per-page tags which React 19 hoists AHEAD of
   the static copies (first-occurrence wins; verified in DOM).
2. **First paint could flash the wrong theme** → inline pre-paint script in
   `<head>` applies `.dark` before render; MUST stay logic-identical with
   `readInitialMode()` (`providers/theme.tsx`):

```javascript
var stored = localStorage.getItem('theme') || localStorage.getItem('chakra-ui-color-mode');
var color = stored === 'light' ? 'light' : stored === 'dark' ? 'dark'
  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.classList.toggle('dark', color === 'dark');
```

3. **Deep links must resolve** → Vercel SPA rewrite serves `index.html` for any
   path; React Router renders the matching route (or NotFound).

---

## Build & Deployment Pipeline

### `yarn build` = `tsc -b && vite build`

```
1. tsc -b                    project references: tsconfig.app.json (src/components/
                             lib/providers) + tsconfig.node.json (vite.config.ts,
                             which pulls scripts/vite-plugin-sitemap.ts + works-data)
2. vite build                SWC transpile → tree-shake → Rollup chunks →
                             esbuild minify → content-hash filenames
3. manualChunks              function form, matches path segment AFTER the
                             package dir (checkout-path-proof):
                               three→vendor-three · gsap/lenis→vendor-gsap ·
                               motion*→motion · react-icons→vendor-icons ·
                               everything else→vendor-react
4. sitemap plugin            generateBundle + emitFile → dist/sitemap.xml
                             (20 URLs from works-data; redirects/404 excluded)
```

Chunk profile (2026-07-30 build): app `index.js` ~52KB · vendor-react ~342KB ·
vendor-gsap ~136KB · motion ~129KB · vendor-icons ~48KB · vendor-three ~590KB
(loads only with the lazy Totoro) · per-page chunks ~2KB.

**Hard-won constraint:** react + small glue libs MUST share one chunk. A
separate misc chunk produced `TypeError: Cannot read properties of undefined
(reading 'useLayoutEffect')` at module-eval and the app silently failed to
mount — zero console errors on load. The dev server ignores `manualChunks`, so
any chunking change requires a `yarn preview` smoke test of the real build.

### Deployment

```
git push master → Vercel builds (yarn build) → atomic deploy to CDN
```

- `vercel.json`: `framework: vite`, `outputDirectory: dist`, SPA rewrite
  `/(.*) → /index.html`. No custom cache headers are configured — hashed
  `/assets/*` files rely on Vercel's default immutable caching; `public/`
  files are etag-cached.
- Deploy-time failure mode: a redeploy deletes old hashed chunks; a long-lived
  tab's next lazy import gets `index.html` (rewrite) and rejects →
  `RouteErrorBoundary` auto-reloads once (sessionStorage-guarded), else shows
  a manual reload prompt.

---

## Performance Architecture

```
Network   Vercel CDN · HTTP/2+ · brotli · immutable hashed assets
Build     route-level lazy chunks · vendor isolation · tree-shaking ·
          Tailwind JIT (~31KB CSS) · WebP images (max 1200px, q~80)
Runtime   startTransition navigations (old page visible during chunk load) ·
          React.memo on shell components · GSAP writes DOM directly (no
          re-render on scroll) · one rAF loop for Lenis + ScrollTrigger ·
          display:none for fully-hidden particle groups
Assets    Draco GLB 44MB→1.5MB (96.7%) · GLB + three chunk load only when
          HeroDawn mounts its lazy Totoro · loading="lazy" images
```

Reduced motion: `SceneProvider` skips Lenis/ScrollTrigger and renders a static
mid-morning composition; `MotionConfig reducedMotion="user"` disables Motion
transforms; CSS keyframes are `motion-safe:`-gated.

---

## SEO Architecture

```
Layer 1  index.html          static description/OG/Twitter fallback (no-JS
                             crawlers: FB/Zalo/LinkedIn) + canonical head setup
Layer 2  <SEO> per page      React 19 hoists title/meta ahead of static copies;
                             unique title/description/keywords/canonical per route
Layer 3  JSON-LD             PersonSchema · WebsiteSchema · ProfilePageSchema
                             (homepage) · ProjectSchema + BreadcrumbSchema (details)
Layer 4  crawl surface       robots.txt (allow all + sitemap URL) ·
                             dist/sitemap.xml generated at build from works-data
                             (cannot drift from real routes)
```

Route hygiene: kebab-case slugs; renames ship with a `<Navigate replace>`
redirect (`/audiophile/moondropSSP` → `/audiophile/moondrop-ssp`).

---

## 3D Graphics Implementation

```
HeroDawn (components/home/hero-dawn.tsx)
  └── React.lazy(import components/totoro.tsx)  + TotoroLoader spinner
        └── useEffect mount:
              Scene + OrthographicCamera (scale from container height)
              WebGLRenderer { antialias: devicePixelRatio < 2, alpha: true,
                              powerPreference: 'high-performance',
                              precision: 'mediump', stencil: false }
              renderer.shadowMap.enabled = false
              AmbientLight
              loadGLTFModel(scene, '/totoro-compressed.glb')   // lib/model.ts
                → GLTFLoader + DRACOLoader (decoder: www.gstatic.com CDN)
                → Promise<Group>; isMesh() type-guard traverse
              rAF loop: frames 1–100 eased circular intro (easeOutCirc),
                        then OrbitControls (autoRotate)
              cleanup: cancelAnimationFrame + renderer.dispose()
```

The `vendor-three` chunk (~590KB) is reachable ONLY through this lazy import —
it never blocks initial paint.

---

## Security Posture

- Static site: no API surface, no secrets in client code; `files/CV.pdf` and
  `cv.html` intentionally public
- HTTPS + HSTS: Vercel platform defaults
- No custom CSP headers configured (future hardening option; would go in
  `vercel.json` `headers`)
- External runtime origins: Google Fonts (stylesheet) and Google CDN (Draco
  decoder) only
- Dependency hygiene: `yarn audit` ad hoc; single lockfile (`yarn.lock`)

---

## Future Architectural Notes

Kept in `docs/project-roadmap.md` (single source). Architecture-relevant
candidates there: contact form (first server-side surface — Vercel function),
PWA/service worker (interacts with the stale-chunk reload strategy — design
together), custom CSP headers, and an assertion-level test for
sitemap ⟷ route-table parity.

---

**Maintained By:** Trương Tuấn Lộc
**Verify against:** `src/app.tsx`, `vite.config.ts`, `vercel.json`,
`providers/theme.tsx`, `components/scene/*` before editing claims here.

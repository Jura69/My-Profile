# Codebase Summary

**Project:** Personal Portfolio Website
**Last Updated:** 2026-10-08
**Build Tool:** Vite 6 (SPA, prerendered to static HTML at build)
**Framework:** React 19 + React Router 7
**Styling:** Tailwind CSS 4
**Animation:** Motion 12 + GSAP 3.15 + Lenis
**Code Files:** TS/TSX under `components/`, `src/`, `lib/`, `providers/` + build scripts in `scripts/` (count with the filesystem, not here)
**Public Assets:** WebP images + CV.pdf; no 3D model file

---

## Executive Overview

Vite 6 SPA portfolio using React 19, client-side routing (React Router 7), Tailwind CSS 4, and Motion 12 + GSAP for animations. Rebuilt from Next.js to Vite (v2, 2026-07). All content is hardcoded TypeScript data — no backend, no CMS. Architecture emphasizes performance through route-level lazy loading, vendor chunk isolation, scroll work confined to GSAP scene components (zero React re-renders on scroll), and a build-time prerender that turns every route into real HTML (hydrated in the browser) plus sitemap, markdown twins and `llms.txt`, all derived from the same data the pages render.

**Key Characteristics:**
- 100% functional components, strict TypeScript
- Every route except the homepage lazy-loads its own chunk (~2KB each); app chunk ~52KB
- Scroll animations isolated to `components/scene/` (GSAP writes CSS vars/transforms directly)
- SEO/AX: prerendered HTML with per-page `<head>` + JSON-LD + per-project social cards + sitemap (truthful `lastmod`) + markdown twins + `llms.txt`/`llms-full.txt`
- Lint gate: 0 errors / 0 warnings across `src components lib providers scripts vite.config.ts`
- Hero 3D spirit is procedural raw three (no GLB, no Draco), lazy-loaded with a 2D fallback

---

## Directory Structure

```
My-Profile/
├── src/
│   ├── main.tsx              # Browser entry: hydrateRoot on prerendered HTML, createRoot in dev
│   ├── entry-server.tsx      # Build-time SSR entry: render(url) via react-dom/static prerender
│   ├── app.tsx               # AppShell (shared by both entries) + App (BrowserRouter), lazy routes
│   ├── pages/                # Route components (all lazy except index.tsx)
│   │   ├── index.tsx         # Homepage (eager — LCP route)
│   │   ├── works.tsx         # Projects listing, tabbed (+ works/ detail pages)
│   │   ├── activities.tsx    # Activities listing (+ activities/ytc.tsx)
│   │   └── audiophile.tsx    # Audio listing (+ audiophile/ detail pages)
│   └── styles/global.css     # Tailwind 4 @theme tokens, html ground, scene + .hero-rise keyframes
├── components/               # (repo root, NOT src/)
│   ├── ui/                   # Primitives: badge, button(+styles), card, container,
│   │                         #   icon-button, page-banner, reveal, section-heading
│   ├── layout/               # main (app shell), navbar, footer, detail-page,
│   │                         #   not-found, route-error-boundary, theme-toggle
│   ├── home/                 # hero-dawn, about-morning, skills-bento,
│   │                         #   experience-dusk (+ journey-trail, journey-card),
│   │                         #   night-contact + home-data.ts
│   ├── works/                # project-card, featured-project-card, works-tabs
│   │                         #   + works-data.ts
│   ├── scene/                # ambient-scene, celestial-arc, drifting-clouds,
│   │                         #   parallax-hills, stars, zone-particles, zone-data,
│   │                         #   cloud-sprite, scene-provider, use-scene,
│   │                         #   use-scroll-progress, svg/{hills,moon}
│   ├── icons/                # kit-icon-base (IconComponent type), kit-icons-interface,
│   │                         #   kit-icons-topics, kit-ornaments, kit-dividers (inline SVG),
│   │                         #   spirit-mam-den (SpiritIcon navbar logo + SpiritIllustration)
│   ├── spirit/               # Hero 3D (raw three): spirit-canvas (React mount),
│   │                         #   spirit-stage (renderer/loop), spirit-scene (content), forest-spirit,
│   │                         #   seed-lantern, moss-island, fireflies, painted-material, spirit-lighting,
│   │                         #   kit-geometry, hero-camera, compile-settle, spirit-eyes,
│   │                         #   spirit-expression (theme reaction + still poses)
│   ├── seo.tsx               # Per-page meta + markdown alternate link, `noindex` prop
│   └── json-ld.tsx           # Person/Website/ProfilePage/Project/Breadcrumb schemas
├── lib/
│   ├── cn.ts                 # clsx + tailwind-merge helper
│   ├── site.ts               # SITE_ORIGIN (site URL), SITE_NAME, markdownPathFor
│   ├── site-routes.ts        # listSiteRoutes(): every indexable route, from works-data
│   ├── use-hydrated.ts       # false on server + hydration pass, true after
├── providers/
│   ├── theme.tsx             # ThemeProvider (persists only explicit choices)
│   └── use-theme.ts          # ThemeContext + useTheme() (react-refresh split)
├── scripts/
│   ├── prerender-routes.mjs    # Last build step: route HTML, 404.html, twins, sitemap, llms files
│   ├── prerender/              # html-to-markdown, content-dates (git lastmod), discovery-files
│   ├── vite-plugin-preview-vercel-parity.ts # `vite preview` = vercel.json headers + real 404
│   ├── generate-og-images.mjs  # works covers → public/images/og/<id>.jpg (1200×630)
│   ├── optimize-images.mjs     # One-off sharp-based image pipeline
│   ├── render-spirit-stills.mjs # Renders Mầm Đèn stills + OG from the hero scene (Vite + CDP + sharp)
│   └── spirit-stills/          # Render page for the script above (dev server only, not built)
├── public/                   # apple-touch-icon.png, cv.html, favicon.ico,
│   │                         #   robots.txt, files/CV.pdf
│   └── images/               # WebP (exceptions: og-image-*.jpg, og/*.jpg, apple-touch-icon.png)
│       ├── og/               # Per-project social cards <id>.jpg (generated)
│       ├── spirit/           # Rendered Mầm Đèn stills (404 puzzled, contact sleepy; day/night)
│       ├── ui/               # Kit materials (paper grain, button wash, brush mask, wreath)
│       ├── banners/          # <page>-<day|night>-{800,1600,2400}.webp
│       └── works/            # <id>-cover-{480,640,1280}.webp
├── index.html                # Prerender template: seo-fallback markers (dev default) + pre-paint theme script
├── vite.config.ts            # Plugins, ssr.noExternal, client-only function-form manualChunks
├── vercel.json               # cleanUrls, no catch-all rewrite, redirect, markdown/llms headers
├── tsconfig.json             # Project references → tsconfig.app + tsconfig.node
├── .eslintrc.cjs             # TS + react-hooks + react-refresh (0/0 gate)
├── prettier.config.js        # No semicolons, single quotes, LF
└── .gitattributes            # * text=auto eol=lf + binary rules
```

Notable absences (deleted as cruft, do not reference): `components/layouts/`
(merged into `layout/`), `jest.config.js`, `jsconfig.json`, `package-lock.json`,
`.eslintrc.json`, `lib/performance.ts`, `public/sitemap.xml` (now build-generated),
`scripts/vite-plugin-sitemap.ts` (replaced by the prerender step),
`tailwind.config.ts` (Tailwind 4 configures via `@theme` in global.css).

---

## Data Model (single sources of truth)

**`components/works/works-data.ts`** — drives listings, detail hrefs, AND (through `lib/site-routes.ts`) the prerendered routes, sitemap and llms.txt:
- `projects: Project[]` — 16 projects, each with `thumbnail` (640w cover) and `cover` (base path; `coverSrcSet()` builds the 640/1280 srcset) (4 personal, of which 3 `featured`; 12 enterprise `@ Creasia`, of which 2 `featured` AI flagships)
- `activities: CardItem[]` — 1 activity (YTC NTU)
- `audioGear: CardItem[]` — 4 devices (`ea1000`, `moondrop-ssp`, `onix`, `fiioka11`)
- Derived exports: `featuredProjects`, `otherPersonalProjects`, `enterpriseProjects`

**`components/home/home-data.ts`** — homepage content:
- `skillGroups` — 28 skills in 4 groups, AI-first order (AI & Agent Engineering 6, Frontend 8, Backend 8, DevOps 6)
- `experiences` — 4 timeline entries (CREASIA, Infodation, VNPT, university)
- `socialLinks` — 5 links (GitHub, LinkedIn, Facebook, Instagram, Email)
- `techIconMap` — tech-name → icon/color for experience badges

Adding a project/device: append to the array — listing card, route href,
prerendered page, markdown twin, sitemap and llms.txt entries all follow. The
page component in `src/pages/<section>/` and its `<Route>` in `src/app.tsx` are
still created by hand (the prerender fails the build if the route is missing).
Project social cards: re-run `node scripts/generate-og-images.mjs` after adding
or changing a cover.

---

## Entry & Code Flow

### Initial Load

```
dist/<route>.html (prerendered body + per-page head; pre-paint theme script sets .dark)
  → src/main.tsx: #root has children → hydrateRoot
                  (dev: empty shell → createRoot)
    → App (src/app.tsx): BrowserRouter → AppShell
      → ThemeProvider (providers/theme.tsx; real mode, memoized value)
        → SceneProvider (Lenis + ScrollTrigger sync, reduced-motion state)
          → MainLayout (AmbientScene + Navbar + <main> + Footer as siblings, MotionConfig reducedMotion="user")
            → RouteErrorBoundary (catches stale-chunk import rejections)
              → AnimatedRoutes (Suspense above keyed fade wrapper; no fade on the landing route)
      → Vercel Analytics + Speed Insights (inside AppShell)
```

### Navigation

React Router 7 runs navigations inside `startTransition`, so when a lazy chunk
streams in, the previous page stays visible (the Suspense boundary sits ABOVE the
`key={pathname}` motion wrapper and never remounts). SceneProvider scrolls to top
and refreshes ScrollTrigger on pathname change. Legacy URL
`/audiophile/moondropSSP` has a `<Navigate replace>` redirect to
`/audiophile/moondrop-ssp` (and a permanent redirect in `vercel.json`).

`/works` splits its listing into two tabs (`components/works/works-tabs.tsx`).
The active tab is a search param — `/works` (no param, or an unknown value) opens
Enterprise, `/works?tab=personal` opens Personal — so tabs are linkable and Back
steps between them. Both panels stay mounted; the inactive one is only `hidden`,
which keeps every project in the prerendered HTML for crawlers while lazy cover
images inside it skip their fetch until shown. The prerender has no query string,
so `?tab=` is applied only after hydration (`lib/use-hydrated.ts`).

### Failure path (deploy invalidates chunks)

A long-lived tab requesting a deleted hashed chunk gets a 404 (no catch-all
rewrite) → dynamic import rejects → `RouteErrorBoundary` auto-reloads once
(sessionStorage-guarded), else renders a manual reload prompt.

### 3D scene

`hero-dawn.tsx` renders the 2D `SpiritIllustration` on the server and during
hydration, then `SpiritBoundary` → `Suspense` (fallback `SpiritIllustration`)
→ `React.lazy(components/spirit/spirit-canvas.tsx)`. `spirit-canvas.tsx` mounts
`createSpiritStage()` (`spirit-stage.ts`), which owns the renderer, camera, loop,
observers and teardown; the spirit, island, painted material and light rig live in
the sibling modules. Behavior and lifecycle rules are documented at the top of
`spirit-stage.ts`; the why is in
[system-architecture.md](./system-architecture.md#3d-graphics-implementation).
No model files or loaders: geometry is generated in code.

---

## Theme System

New visitors follow the OS `prefers-color-scheme`; a stored choice always wins.
Two implementations MUST stay logic-identical (else FOUC):

1. Pre-paint inline script in `index.html` — sets `.dark` on `<html>` before paint
2. `readInitialMode()` in `providers/theme.tsx`

`ThemeProvider` persists to `localStorage.theme` ONLY on explicit choice (an
existing stored key, incl. legacy `chakra-ui-color-mode` migration, or a toggle
click) — never auto-writes the OS-derived value, so OS-following visitors keep
following the OS on later visits. The context always carries the real mode in a
memoized value: a context change above a lazy route's not-yet-hydrated Suspense
boundary would make React drop the prerendered HTML and client-render it.
Markup that depends on the mode either uses CSS `dark:` variants (`ThemeToggle`)
or gates it with `useHydrated()` (`PageBanner`); CSS colors are right from the
pre-paint `.dark` class.
`useTheme()` lives in `providers/use-theme.ts`
(context split from the provider file so react-refresh sees component-only exports).

---

## Build Pipeline

`yarn build` (exact chain in `package.json`):
- `tsc -b` — project references (`tsconfig.app.json` for src/components/lib/providers,
  `tsconfig.node.json` for vite.config + the preview-parity plugin + `vercel.json`).
  Type errors halt build.
- Vite/Rollup client build — SWC transpile, tree-shake, function-form `manualChunks` matches
  the path segment AFTER the package directory: `vendor-three` (~126KB gz since the
  spirit rewrite, loaded only with the lazy spirit), `vendor-gsap` (~136KB incl. ScrollTrigger + Lenis),
  `motion` (~129KB), `vendor-icons` (~48KB, now only `si`/`di` brand logos + `IoLogo*`; kit icons live in app code), everything else (react, react-dom,
  router, glue) → `vendor-react` (~342KB). Glue libs share the react chunk on
  purpose — a separate misc chunk caused a circular-init TypeError that silently
  prevented mount.
- `vite build --ssr src/entry-server.tsx --outDir .ssr-build` — server bundle
  (`ssr.noExternal: true`, no manual chunks), deleted after the prerender.
- `node scripts/prerender-routes.mjs` — renders every `listSiteRoutes()` route into
  `dist/<route>.html` (root `index.html`) + `dist/404.html` (noindex), the markdown
  twin `<route>.md` (root `/index.md`) from each page's `<main>`, `sitemap.xml`
  (`lastmod` = last git commit of the route's sources, omitted in shallow clones),
  `llms.txt` and `llms-full.txt`. Fails the build if a route renders the 404 page.

Deploy: push to `master` → Vercel builds (`vercel.json`: framework vite, dist
output, `cleanUrls`, no catch-all rewrite, `text/markdown` + `noindex` headers for
`*.md` / `llms*.txt`). Hashed `/assets/*` get Vercel's default immutable caching.
`yarn preview` mirrors those headers and the 404 behaviour
(`scripts/vite-plugin-preview-vercel-parity.ts`).

---

## Quality Gates

- `yarn lint` — ESLint over `src components lib providers scripts vite.config.ts`,
  expected 0 errors / 0 warnings (react-refresh rule enforced via hook-file splits)
- `yarn build` — tsc strict + client build + SSR build + prerender must all pass
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
- Google Fonts is the only external runtime origin

---

## Browser Support

Modern evergreen browsers (ES2020 + WebGL). No IE11. Reduced-motion users get a
static scene composition (`SceneProvider` gates Lenis/ScrollTrigger) and
instant page swaps; `MotionConfig reducedMotion="user"` covers Motion animations;
`Reveal` never hides content and `.hero-rise` is off. Without JS, every page
still renders its full prerendered content.

---

**Maintained By:** Trương Tuấn Lộc
**Regenerate hint:** verify counts against `works-data.ts` / `home-data.ts` and
the real file tree before editing this file.

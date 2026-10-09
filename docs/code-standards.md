# Code Standards & Development Guidelines

**Project:** Personal Portfolio Website
**Last Updated:** 2026-10-08
**Framework:** Vite 6 + React 19 + React Router 7
**Styling:** Tailwind CSS 4
**Enforcement:** ESLint (`.eslintrc.cjs`) + Prettier (`prettier.config.js`) + TypeScript strict

---

## Table of Contents

1. [Formatting & Linting](#formatting--linting)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Component Patterns](#component-patterns)
5. [State & Context](#state--context)
6. [Animation Patterns](#animation-patterns)
7. [Performance Guidelines](#performance-guidelines)
8. [SEO Standards](#seo-standards)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Error Handling](#error-handling)
11. [Testing Status](#testing-status)
12. [Git Workflow](#git-workflow)

---

## Formatting & Linting

### Prettier (`prettier.config.js` — the file is the authority)

```javascript
{
  arrowParens: 'avoid',
  singleQuote: true,
  bracketSpacing: true,
  endOfLine: 'lf',      // .gitattributes also enforces LF repo-wide
  printWidth: 120,
  semi: false,
  tabWidth: 4,
  trailingComma: 'none'
}
```

Format: `yarn prettier` (scoped to the same targets as `yarn lint` — docs/plans/json stay untouched)

### ESLint (`.eslintrc.cjs` — the file is the authority)

```javascript
{
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended',
            'plugin:react-hooks/recommended'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
}
```

Check: `yarn lint` — covers `src components lib providers scripts vite.config.ts`.
**The gate is 0 errors / 0 warnings.** Warnings are treated as failures:
- `no-explicit-any` → type it (see `lib/model.ts` `isMesh()` type predicate)
- `react-refresh/only-export-components` → split contexts/hooks into their own
  file (`providers/use-theme.ts`, `components/scene/use-scene.ts`), never
  eslint-disable

### Imports

```typescript
// Order: react → external libs → internal, RELATIVE paths
import { useState } from 'react'
import { motion } from 'motion/react'
import SectionHeading from '../ui/section-heading'
import { cn } from '../../lib/cn'
```

Note: tsconfig defines `@/* → src/*`, but `lib/`, `components/`, `providers/`
live at the REPO ROOT — `@/lib/cn` would resolve to the nonexistent `src/lib/cn`.
The codebase uses relative imports throughout; follow that.

---

## Naming Conventions

### Files (real examples from this repo)

```
kebab-case .tsx/.ts, descriptive names
✅ components/ui/section-heading.tsx
✅ components/layout/route-error-boundary.tsx
✅ components/scene/use-scroll-progress.ts (hooks: use-*.ts)
✅ src/pages/audiophile/moondrop-ssp.tsx  (route slugs kebab-case too)
❌ moondropSSP.tsx (camelCase — renamed away, redirect kept)
❌ AnimatedBadge.tsx (PascalCase files)
```

### Identifiers

```typescript
// PascalCase components, camelCase functions/variables, use* hooks
const FeaturedProjectCard = () => {}
const handleClick = () => {}
export function useScene() {}

// UPPER_SNAKE_CASE module-level constants
const STORAGE_KEY = 'theme'
const NAV_LINKS = [...]

// Boolean naming: is/has/should
const isDark = mode === 'dark'
```

### Tailwind Classes

```tsx
// Utilities in className; compose conditionals with cn()
import { cn } from '../../lib/cn'
<div className={cn('rounded-xl border border-line', active && 'text-accent')} />

// Type scale: text-display / text-page-title / text-section / text-lead (global.css @theme --text-*).
// cn() runs tailwind-merge extended with these names (lib/cn.ts): a new --text-* token must be added
// there too, or tailwind-merge reads it as a color and drops it next to text-ink.
<h2 className={cn('font-rounded text-section font-extrabold text-ink', className)} />

// Semantic tokens (defined in src/styles/global.css) over raw palette values:
// bg-surface / bg-surface-elevated, text-ink / text-ink-muted,
// text-accent, border-line — these flip automatically under `.dark`
<p className="bg-surface text-ink-muted" />

// dark: variant only when a semantic token doesn't exist for the case
<div className="bg-white dark:bg-gray-900" />
```

---

## File Organization

- Components: ~200 LOC target — split when a file gains a second concern
- Route pages return a fragment directly (`MainLayout` wraps once in `src/app.tsx`;
  there is no per-page layout wrapper)
- Data lives beside its section: `components/works/works-data.ts`,
  `components/home/home-data.ts` — never inline arrays in pages
  (`lib/site-routes.ts` derives the prerendered routes, sitemap and llms.txt
  from works-data; inline data would drift out of them)
- Site-wide constants (origin, site name, markdown twin path) live in
  `lib/site.ts` — import them, never re-type the URL
- GSAP/Lenis code is ONLY allowed inside `components/scene/` (animation
  discipline contract — keeps scroll work off the React render path)

### Page skeleton (matches real pages)

```tsx
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Container from '../../components/ui/container'
import PageHeader from '../../components/ui/page-header'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'

const Activities = () => (
  <>
    <SEO title="Activities & Clubs | Trương Tuấn Lộc Portfolio" description="…" keywords="…" />
    <BreadcrumbSchema items={[...]} />
    <PageHeader
      crumbs={[{ label: 'Home', to: '/' }, { label: 'Activities' }]}
      eyebrow="Beyond code"
      title="My activities"
      ornament={Campfire}
      media={{ kind: 'banner', page: 'activities', alt: '…' }}
      lead="Clubs and events from my years at Nha Trang University."
    />
    <section className="w-full py-16 md:py-24">
      <Container size="page">
        <Reveal>
          <SectionHeading as="h2" eyebrow="Beyond code">Off the clock</SectionHeading>
        </Reveal>
        {/* content */}
      </Container>
    </section>
  </>
)

export default Activities
```

Conventions embedded in that skeleton:
- The page's only h1 comes from `PageHeader` (on the banner, on a project cover, or plain); sections use
  `SectionHeading` (eyebrow required) as h2
- One content column: `Container size="page"` (1100px + gutter) — the navbar and footer use it too, so the
  logo, headers and content align. Never hand-write `max-w-[1100px]` again
- Section rhythm `py-16 md:py-24`; no `backdrop-blur` on UI surfaces
- Entrance animation via the shared `<Reveal>` wrapper, not ad-hoc motion divs

---

## Component Patterns

**App shell** (`components/layout/main.tsx`): AmbientScene + Navbar +
`<main className="pt-18">` (route content only) + Footer as sibling landmarks
inside `<MotionConfig reducedMotion="user">`. Applied once. Keep page content
inside `<main>` — the markdown twins are built from exactly that element.

**UI primitives** (`components/ui/`): small, prop-driven, no data fetching.
Button styling is a composable function (`buttonClasses(variant, size)`) so
router links can be styled as buttons without a wrapper component.

**Cards** (`components/works/`) — pick by context, never clone one per section (the Chakra-era
WorkGridItem/AudioGridItem/ActivitiesGridItem triplet was deleted for 90% duplication):
- `FeaturedProjectCard`: flagship in a Works tab — 16:9 cover, `kicker`, title, blurb, tech badges.
- `OverlayProjectCard`: Home "Selected work" — title on the painting over `.cover-scrim`, `size="flagship" | "compact"`.
- `ProjectRowCard`: lists ("More from CREASIA") and the detail pager — thumbnail, title, 2-line blurb, arrow;
  `kicker`/`reverse`/`titleAs="span"` for previous/next.
- `ProjectCard`: audiophile and activities grids, via the `to` prop.
Each card is one link named by its title, so its image takes `alt=""`. Project data (year, cover alt,
`coverPosition`, kicker) lives in `works-data.ts`; look projects up with `findProject(id)` (throws on a typo,
so the prerender fails) and `projectsInCategory(category)`.

**Page headers and detail pages**: `PageHeader` (`components/ui/page-header.tsx`) is the one header for listing
and detail pages — `crumbs`, `title`, `eyebrow`, `lead`, `ornament`, `media` (`{ kind: 'banner', page, alt }`,
`{ kind: 'cover', project }` or none). Detail bodies use `DetailBody` (`components/layout/detail-layout.tsx`,
`facts: FactRow[]` beside the prose children) and end with `DetailPager` (`components/layout/detail-pager.tsx`,
`items`, `currentId`, `basePath`, `allLabel`). Prose pieces stay in `detail-page.tsx` (`DetailHeading`,
`DetailProse`, `DetailImage`, `DetailLink`). Pages keep their own H1 text, SEO and JSON-LD; the year comes from works-data.

**Icon buttons as links**: `IconButton` is a `<button>`; for an icon-only link use `<a className={iconButtonClasses('ghost')}>`
(`components/ui/icon-button-styles.ts`) with an `aria-label`.

**Memoization**: used where re-render cost is real — `MainLayout`, `Navbar`,
`AmbientScene`, card lists. Don't memo trivial components.

---

## State & Context

- Local state: `useState` / `useRef`; no Redux/Zustand (static content site)
- Theme: `useTheme()` from `providers/use-theme.ts` → `{ mode, toggle }`.
  Persistence rule: ONLY explicit choices are written to localStorage (existing
  key or toggle click). Never auto-persist the OS-derived mode — that freezes a
  first visit's scheme and stops `prefers-color-scheme` from being honored later.
- Scene: `useScene()` from `components/scene/use-scene.ts` → `{ reducedMotion }`
- Context objects live in the hook file, providers import them — provider files
  export ONLY components (react-refresh requirement)
- The `index.html` pre-paint theme script and `readInitialMode()` in
  `providers/theme.tsx` MUST stay logic-identical (first paint vs hydrated state)

### Hydration safety (production pages are prerendered, then hydrated)

The first client render MUST produce the same markup as the build-time render
(`src/entry-server.tsx`). React does not patch mismatched attributes on hydration.

- Anything the server cannot know — stored theme, OS preferences, query string,
  `Math.random()`, pointer, viewport — switches in only after hydration via
  `useHydrated()` (`lib/use-hydrated.ts`). Existing owners: `PageBanner`
  (theme image), `WorksTabs` (`?tab=`), `AmbientScene` (random decor),
  `HeroDawn` (3D canvas). `ThemeToggle` needs no gate: it is styled with `dark:`.
- Providers above the routes (`ThemeProvider`, `SceneProvider`) must keep a
  memoized context value that does not change at hydration time: a context
  change reaching a lazy route's not-yet-hydrated Suspense boundary makes React
  silently discard the prerendered HTML and client-render it (blank `<main>`,
  layout shift). Never gate a provider value with `useHydrated()`.
- No `typeof window` branches in render output; read browser state in effects
  or behind `useHydrated()`.
- Unavoidable text drift (footer year) gets `suppressHydrationWarning` on that
  one element only.
- Both entries render `AppShell` (`src/app.tsx`); providers and even null-output
  components (analytics) go inside it so `useId` trees match.
- Never ship content hidden in markup (`opacity: 0` initial styles): crawlers,
  no-JS readers and the twins must see it. Hide only after mount, as `Reveal` does.
- Verify with `yarn build && yarn preview` (dev never hydrates).

---

## Animation Patterns

### 1. Entrance reveals — use the shared wrapper

```tsx
// components/ui/reveal.tsx — fade + rise (y, optional x), fires in view, 0.5s easeOut by default
<Reveal delay={0.05 + i * 0.05}>
  <ProjectCard project={p} />
</Reveal>
// journey cards (experience-dusk.tsx): <Reveal x={32} y={12} duration={0.8} ease={EASE_OUT}>
```

`Reveal` renders a plain `div` (visible in prerendered HTML) and hides only
content that is below the fold at mount, then reveals it via motion's
`inView`/`animate`. Reduced motion: never hidden. Above-the-fold hero entrance is
the CSS `.hero-rise` keyframe (`src/styles/global.css`), not Motion, so it plays
from the HTML without JS.

### 2. Page transitions — owned by `src/app.tsx`, do not add per-page

Entrance-only fade (0.25s, keyed by pathname). Deliberately NOT
AnimatePresence exit-mode (exit never completed reliably with this Router +
motion@12) and opacity-only (a transform would become the containing block for
position:fixed descendants). The Suspense boundary sits ABOVE the keyed wrapper so
lazy-chunk loads keep the old page visible. The fade is skipped on the landing
route (`useIsLandingPath`): that page is already painted from prerendered HTML.

### 3. Hover/tap micro-interactions

```tsx
<motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }} />
```

### 4. Scroll-linked scene work — GSAP, `components/scene/` only

One ScrollTrigger drives the day→night narrative by writing CSS custom
properties and data-attributes to the DOM (`ambient-scene.tsx`) — zero React
re-renders on scroll. Lenis + ScrollTrigger share one rAF via
`scene-provider.tsx`. Fully-hidden particle groups are `display:none`'d through
`[data-*='off']` selectors in `global.css`. Register cleanup (`trigger.kill()`,
`lenis.destroy()`) in effect teardown.

### 5. Reduced motion

`MotionConfig reducedMotion="user"` covers Motion; `SceneProvider` exposes
`reducedMotion` and skips Lenis/ScrollTrigger entirely (static composition at
`apply(0.18)`); CSS keyframes use the `motion-safe:` variant or a
`prefers-reduced-motion: reduce` override (`.hero-rise`). New animation code
must degrade through one of these three paths — no unguarded infinite animation.

---

## Performance Guidelines

### Images

- Format: WebP, max 1200px, quality ~80 (exceptions: `og-image-*.jpg` and
  `og/<id>.jpg` — OG scrapers, `apple-touch-icon.png` — iOS requirement)
- `<img loading="lazy">` below the fold; explicit dimensions where layout shift
  is possible
- New images go through the same constraint before commit (ImageMagick/sharp;
  `scripts/optimize-images.mjs` exists for batch runs; spirit stills come from
  `scripts/render-spirit-stills.mjs`; per-project social cards from
  `scripts/generate-og-images.mjs` — re-run after changing a works cover)

### Code splitting

- Every route except `src/pages/index.tsx` is `React.lazy` in `src/app.tsx`
- Heavy leaf libs get their own vendor chunk via function-form `manualChunks`
  (`vite.config.ts`) which matches the path segment AFTER the package dir.
  Constraint learned the hard way: react + glue libs must share one chunk —
  a separate misc chunk creates a circular-init TypeError that silently
  prevents mount. Verify any chunking change against a real `yarn preview`
  smoke test, not just the dev server (dev ignores manualChunks).
- Check sizes: `yarn build` output or `yarn analyze`

---

## SEO Standards

### Per-page meta — required on every page

```tsx
<SEO
  title="Page Title | Trương Tuấn Lộc Portfolio"   // < 60 chars
  description="150–160 char description"
  keywords="5–10 comma-separated keywords"
  type="article"            // or "website" / "profile"
  image="/images/og/<id>.jpg" // detail pages: their 1200×630 social card
/>
```

Optional props: `imageAlt` (defaults to the title), `noindex` (404 only — drops
canonical and the markdown alternate link). The build-time prerender writes
these tags into each page's static `<head>`, so crawlers that never run JS read
the per-page values. The block between the `seo-fallback` markers in
`index.html` is only the dev-server default; keep the markers (the prerender
requires them) and keep its copy in step with the homepage SEO props.

### Structured data

Homepage: `PersonSchema` + `WebsiteSchema` + `ProfilePageSchema`.
Detail pages: `ProjectSchema` + `BreadcrumbSchema` (see `components/json-ld.tsx`).

### Routes, sitemap & AX files

- Clean kebab-case URLs (`/works/foodlover`, `/audiophile/moondrop-ssp`)
- Renaming a route REQUIRES a `<Navigate replace>` redirect from the old path
  AND a permanent redirect in `vercel.json` (there is no SPA catch-all, so the
  old URL would otherwise be a hard 404)
- The prerendered pages, sitemap, markdown twins and `llms.txt`/`llms-full.txt`
  all come from `listSiteRoutes()` (`lib/site-routes.ts`), which derives from
  `works-data.ts` — new detail pages are picked up once their data entry exists
  and their `<Route>` is in `src/app.tsx` (the prerender fails the build
  otherwise); redirect-only and 404 routes are excluded by design
- Every indexable page needs exactly one `h1` inside `<main>`: the prerender
  requires it and the twin takes its name from it

---

## Accessibility Requirements

- Semantic landmarks: `nav` / `main` / `footer` as siblings (see `main.tsx`,
  `navbar.tsx`); exactly one `h1` per page, hierarchy h1 → h2 → h3
  (`SectionHeading as=`); breadcrumbs are `Breadcrumb` (`<nav aria-label="Breadcrumb"><ol>`, last item
  `aria-current="page"`)
- Label/value pairs are `<dl>`: `FactRow` (detail facts) and the hero stats put a hidden `<span className="sr-only">: </span>`
  in each `dt`, so screen readers read "Stack: Go" and the markdown twin renders "**Stack:** Go". Decorative
  counts (the Works tab pills) are `aria-hidden` with an `sr-only` sentence instead ("(12 projects)")
- Descriptive `alt` on every image; `aria-hidden="true"` on decorative icons
  and the ambient scene root
- Icon-only buttons carry `aria-label` (e.g. "Toggle color theme"); active nav
  links set `aria-current="page"`
- Color contrast WCAG AA (4.5:1 text, 3:1 UI) — check both modes when adding
  tokens to `global.css`
- Reduced motion honored via the three paths in [Animation Patterns](#animation-patterns)

---

## Error Handling

- Async loading: `.then/.catch` with user-visible fallback state
  (`components/spirit/spirit-canvas.tsx` falls back to the 2D illustration on any WebGL failure)
- Route-level: `components/layout/route-error-boundary.tsx` wraps the lazy
  route tree — auto-reloads once on stale-chunk import rejections (deploys
  delete old hashed chunks, so a long-lived tab's lazy import 404s), then falls
  back to a manual reload prompt
- No silent catches: log with context (`console.error('Failed to load 3D model:', error)`)

---

## Testing Status

**There is no automated test suite.** Quality gates that DO exist and are
enforced: `tsc -b` strict, ESLint 0/0, the prerender's own build-time checks
(every listed route renders with an `h1`, not the 404 page), real-build smoke
test via `yarn preview` (mirrors Vercel headers + 404),
manual pre-deploy checklist (routes navigate, console clean, both themes, mobile
layout, 3D loads, CV downloads).

If a suite is introduced, prefer Vitest (Vite-native) + React Testing Library;
the highest-value first assertions are the invariants most likely to rot
silently: every `src/app.tsx` route derivable from works-data, and `index.html` theme script ⟷
`readInitialMode()` logic equality. Jest configs found in the repo earlier were
dead artifacts and have been deleted — do not resurrect them by copy-paste.

---

## Git Workflow

### Conventional commits (no AI references)

```
<type>(<scope>): <subject>

feat(home): center spirit hero, journey heading, tech badge icons
fix(review): route error boundary, honest theme persistence
perf(images): convert photos to webp, compress oversized
refactor: merge layout dirs, drop no-op article shim
chore: enforce LF line endings via .gitattributes
docs(journals): log review-v2 fixes execution session
```

- Group commits by concern; split mixed files with `git apply --cached` when a
  file carries two concerns' hunks
- Push to `master` deploys production (Vercel) — `yarn build && yarn lint` must
  pass BEFORE every push
- Never commit secrets/dotenv; binary assets are declared in `.gitattributes`

---

**Maintained By:** Trương Tuấn Lộc
**Review:** when conventions change, not on a calendar

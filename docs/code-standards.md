# Code Standards & Development Guidelines

**Project:** Personal Portfolio Website
**Last Updated:** 2026-07-30
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
✅ components/scene/use-pinned-intro.ts   (hooks: use-*.ts)
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
  `components/home/home-data.ts` — never inline arrays in pages (the sitemap
  plugin imports works-data; inline data would drift out of the sitemap)
- GSAP/Lenis code is ONLY allowed inside `components/scene/` (animation
  discipline contract — keeps scroll work off the React render path)

### Page skeleton (matches real pages)

```tsx
import SEO from '../../components/seo'
import { BreadcrumbSchema } from '../../components/json-ld'
import Reveal from '../../components/ui/reveal'
import SectionHeading from '../../components/ui/section-heading'

const Activities = () => (
  <>
    <SEO title="Activities & Clubs | Trương Tuấn Lộc Portfolio" description="…" keywords="…" />
    <BreadcrumbSchema items={[...]} />
    <section className="w-full px-4 py-8">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SectionHeading as="h1">My Activities 🌿</SectionHeading>
        </Reveal>
        {/* content */}
      </div>
    </section>
  </>
)

export default Activities
```

Conventions embedded in that skeleton:
- First heading of a listing page renders `as="h1"` (exactly one h1 per page)
- Content column: `mx-auto max-w-[1100px]` inside a full-bleed `px-4` section
  (the navbar uses the same 1100px column so the logo gutters align)
- Entrance animation via the shared `<Reveal>` wrapper, not ad-hoc motion divs

---

## Component Patterns

**App shell** (`components/layout/main.tsx`): AmbientScene + Navbar + children +
Footer inside `<MotionConfig reducedMotion="user">`. Applied once.

**UI primitives** (`components/ui/`): small, prop-driven, no data fetching.
Button styling is a composable function (`buttonClasses(variant, size)`) so
router links can be styled as buttons without a wrapper component.

**Cards**: `ProjectCard` (compact, reused by works/activities/audiophile via the
`to` prop) and `FeaturedProjectCard` (large, homepage/works flagships). Do not
create section-specific card clones — the Chakra-era triplets
(WorkGridItem/AudioGridItem/ActivitiesGridItem) were deleted for 90% duplication.

**Detail pages**: shared pieces from `components/layout/detail-page.tsx`
(`DetailImage`, `DetailMeta`, `DetailProse`…). Same rule: one implementation,
category passed as data.

**Memoization**: used where re-render cost is real — `MainLayout`, `Navbar`,
`AmbientScene`, `Totoro`, card lists. Don't memo trivial components.

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

---

## Animation Patterns

### 1. Entrance reveals — use the shared wrapper

```tsx
// components/ui/reveal.tsx — fade + 14px rise, fires in view, 0.5s easeOut
<Reveal delay={0.05 + i * 0.05}>
  <ProjectCard project={p} />
</Reveal>
```

### 2. Page transitions — owned by `src/app.tsx`, do not add per-page

Entrance-only fade (0.25s, keyed by pathname). Deliberately NOT
AnimatePresence exit-mode (exit never completed reliably with this Router +
motion@12) and opacity-only (a transform would break the homepage's
position:fixed GSAP pin). The Suspense boundary sits ABOVE the keyed wrapper so
lazy-chunk loads keep the old page visible.

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
`apply(0.18)`); CSS keyframes use the `motion-safe:` variant. New animation code
must degrade through one of these three paths — no unguarded infinite animation.

---

## Performance Guidelines

### Images

- Format: WebP, max 1200px, quality ~80 (exceptions: `og-image.jpg` — OG
  scrapers, `apple-touch-icon.png` — iOS requirement)
- `<img loading="lazy">` below the fold; explicit dimensions where layout shift
  is possible
- New images go through the same constraint before commit (ImageMagick/sharp;
  `scripts/optimize-images.mjs` exists for batch runs)

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
/>
```

React 19 hoists these tags AHEAD of the static fallbacks in `index.html`; the
static copies stay in the DOM as the answer for no-JS crawlers (FB/Zalo). When
homepage copy changes, update BOTH `src/pages/index.tsx` SEO props and the
static block in `index.html`.

### Structured data

Homepage: `PersonSchema` + `WebsiteSchema` + `ProfilePageSchema`.
Detail pages: `ProjectSchema` + `BreadcrumbSchema` (see `components/json-ld.tsx`).

### Routes & sitemap

- Clean kebab-case URLs (`/works/foodlover`, `/audiophile/moondrop-ssp`)
- Renaming a route REQUIRES a `<Navigate replace>` redirect from the old path
- The sitemap is generated at build time from `works-data.ts` — new detail pages
  are picked up automatically once their data entry exists; redirect-only and
  404 routes are excluded by design

---

## Accessibility Requirements

- Semantic landmarks: `nav` / `main` / `footer` (see `main.tsx`, `navbar.tsx`);
  exactly one `h1` per page, hierarchy h1 → h2 → h3 (`SectionHeading as=`)
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
  (`components/totoro.tsx` logs and clears the spinner on GLB failure)
- Route-level: `components/layout/route-error-boundary.tsx` wraps the lazy
  route tree — auto-reloads once on stale-chunk import rejections (deploys
  invalidate hashed chunks; the SPA rewrite otherwise turns that into a blank
  page), then falls back to a manual reload prompt
- No silent catches: log with context (`console.error('Failed to load 3D model:', error)`)

---

## Testing Status

**There is no automated test suite.** Quality gates that DO exist and are
enforced: `tsc -b` strict, ESLint 0/0, real-build smoke test via `yarn preview`,
manual pre-deploy checklist (routes navigate, console clean, both themes, mobile
layout, 3D loads, CV downloads).

If a suite is introduced, prefer Vitest (Vite-native) + React Testing Library;
the highest-value first assertions are the invariants most likely to rot
silently: sitemap ⟷ route-table parity, and `index.html` theme script ⟷
`readInitialMode()` logic equality. Jest configs found in the repo earlier were
dead artifacts and have been deleted — do not resurrect them by copy-paste.

---

## Git Workflow

### Conventional commits (no AI references)

```
<type>(<scope>): <subject>

feat(home): center totoro hero, journey heading, tech badge icons
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

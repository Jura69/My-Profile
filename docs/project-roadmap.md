# Project Roadmap & Technical Debt

**Project:** Personal Portfolio Website
**Current Version:** v2.x (Vite SPA, prerendered at build)
**Last Updated:** 2026-10-08
**Status:** Production (Live) — https://my-profile-jura69.vercel.app

---

## Current Status

**v2 rebuild is complete and shipped.** The Next.js → Vite migration (2026-07)
plus the review-v2 fixes plan (2026-07-30, plan `260729-1350`) closed out every
tech-debt item from the v1 roadmap: homepage modularized into scene components,
grid/detail component triplets unified (`ProjectCard`, `detail-page.tsx`),
TypeScript everywhere, images WebP-optimized, sitemap generated at build time,
lint 0/0, dead configs deleted. Every route now ships as prerendered HTML that
the browser hydrates, with markdown twins, `llms.txt` and per-project social
cards (see [system-architecture.md](./system-architecture.md#rendering-strategy)).

```
Feature Categories:
├── Core Website (100%) ✅  homepage scenes · projects · activities · audio reviews
├── Performance   (100%) ✅  lazy routes · vendor chunks · WebP · procedural 3D (no model file)
├── SEO / AX      (100%) ✅  prerendered HTML · per-page meta + social cards · JSON-LD · sitemap · markdown twins + llms.txt
├── Design        (100%) ✅  system-preference theme · day→night scenes · 3D Mầm Đèn spirit
└── Future Enhancements 🔨  blog · contact form · PWA · CMS (below)
```

Shipped highlights (verified 2026-07-30): app chunk 510KB → ~52KB (−90%);
initial lint 6 warnings → 0/0; 12 jpg/jpeg (1.98MB) → WebP (~0.6MB);
`.gitattributes` LF normalization; route error boundary for post-deploy
stale-chunk recovery.

---

## Known Issues & Technical Debt (current, honest)

Ordered by value; all are LOW severity — none block production.

### 1. No automated test suite

Quality rests on `tsc -b` strict + ESLint 0/0 + manual checklist + real-build
`yarn preview` smoke tests. The prerender fails the build when a route listed by
`lib/site-routes.ts` is missing from `src/app.tsx`. Invariants that can still
rot silently:

- a route added to `src/app.tsx` but not derivable from `works-data.ts`
  (never prerendered, missing from sitemap/llms.txt)
- `index.html` pre-paint theme script ⟷ `readInitialMode()` logic equality

Both are ~20-line node assertions. If a suite lands, prefer Vitest
(Vite-native) + React Testing Library. **Effort:** 2–4h for the two
assertions; more for a real suite.

### 2. Three legacy WebP files exceed the 150KB budget

`ka11-2.webp` (~185KB), `Ticket2.webp` (~194KB), `Ticket3.webp` (~165KB) — they
predate the 2026-07-30 conversion pass, which only re-encoded the two files
named in its scope. Re-encode at q≤80 / max 1200px. **Effort:** 15m.

### 3. Dead `--color-timeline-*` tokens in `global.css`

Four tokens defined but unreferenced (experience colors are inline in
`home-data.ts`). Delete or wire up — owner's call (they were deliberately
renamed in a recent content fix, so confirm intent before removing).
**Effort:** 10m.

### 4. `yarn analyze` shells out to `npx`

`vite-bundle-visualizer` is not a devDependency; `npx` fetches it on demand in
a yarn-1 repo. Accepted inconsistency (yarn 1 has no dlx). **No action.**

---

## Deferred by Decision (from review-v2 resolutions, 2026-07-29)

Explicitly deferred, do not re-litigate without new evidence:

- **Data-driven routes** (`/works/:id` from works-data) — hand-written detail
  pages are fine at the current project count; revisit at ~20+
- **AVIF images** — WebP is sufficient; AVIF adds encode complexity for
  marginal gains at this asset volume
- **New Activities content** — route exists off-nav (linked from works page);
  needs real activity data from the owner before expanding

---

## Roadmap (forward-looking)

Quarters are aspirational, not commitments.

### Near-term — polish & safety nets

1. **Parity assertions** (debt #1's cheap half) — route-table + theme-script
   equality checks wired into `yarn build` or CI. Effort: 2–4h
2. **Contact form** — first server-side surface (Vercel function or EmailJS),
   validation + spam protection. Effort: ~6h

### Mid-term — content & reach

3. **Blog section** — `/blog` listing + markdown posts (MDX or react-markdown),
   syntax highlighting, RSS; biggest SEO lever available. Effort: ~12h
   - Candidate topics (updated to the real stack): the manualChunks
     circular-init postmortem · building the day→night GSAP scene · Draco
     96.7% compression walkthrough · React 19 metadata hoisting vs static OG
     fallbacks · WebP pipeline with sharp/ImageMagick
4. **PWA / service worker** — design TOGETHER with the stale-chunk reload
   strategy in `route-error-boundary.tsx` (a bad SW cache can turn one blank
   page into a persistent one). Effort: ~8h
5. **Custom CSP headers** in `vercel.json`. Effort: 2h

### Long-term — only if the site's role grows

6. **CMS** (Sanity/Contentful) — only when hardcoded TS data becomes a real
   bottleneck; it is currently a feature (typed, versioned, zero latency)
7. **i18n** (en/vi)
8. **Image CDN** — likely unnecessary: full image payload is ~2.5MB WebP served
   from Vercel CDN; re-evaluate only with order-of-magnitude more images

---

## Success Metrics (owner-set targets)

| Area | Target |
|---|---|
| Lighthouse | ≥ 97 all categories (spot-check after significant changes) |
| Core Web Vitals | Green via Vercel Speed Insights field data |
| Traffic | ≥ 500 uniques/month, bounce < 40%, ≥ 2 min sessions |
| Business | ≥ 5 interview requests/month · ≥ 50 CV downloads/month |

---

## Lessons Learned

### v1 era (Next.js, 2026-01)
- Performance-first from day one paid off (image discipline, lean 3D)
- DRY violations (grid/domain component triplets) compounded fast — fixed only
  by the v2 rebuild
- Hardcoded content is fine; the pain was never the data, it was duplicated UI

### v2 rebuild + review-v2 fixes (2026-07)
- **Test the real build, not the dev server** — `manualChunks` doesn't exist in
  dev; a chunking change silently prevented production mount (circular-init
  TypeError with zero console errors) and was caught only by a `yarn preview`
  smoke test
- Object-form `manualChunks` matches package entries only — ~300KB of subpath
  imports (`react-dom/client`, `gsap/ScrollTrigger`) hid in the app chunk until
  the function form landed
- Independent code review earns its cost: it found the missing route error
  boundary (post-deploy blank page) — but verify reviewer claims empirically
  before acting; one Medium finding was refuted by direct DOM inspection
- Grep globs lie: a `*.tsx`-only search missed a `.ts` call site twice; build
  gates caught it both times

---

**Maintained By:** Trương Tuấn Lộc
**Review:** after each significant plan completes, not on a calendar

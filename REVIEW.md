# REVIEW.md — UX/AX review checklist

Use for every pull request that touches UI, content, routes or the build. Design rules:
[DESIGN.md](DESIGN.md) → [docs/design-guidelines.md](docs/design-guidelines.md).

## Evidence required

- UI changes ship with screenshots of each changed page at **1280×650, 1440×790, 1920×950,
  768×1024 and 375×812**, light and dark where colors differ. No horizontal overflow, clipped
  text, overlap or broken images. These are inner browser viewports, not screen sizes: a 13"
  laptop at 150% scale shows about 1280×650, a MacBook Air about 1440×790.
- The first screen must fit. On the full desktop matrix (1280×650, 1280×720, 1366×650,
  1440×790, 1536×730, 1920×950, 1024×650) the Home H1, both CTAs, stats, spirit and
  "Now building" card end above the fold; on 375×812 the spirit, H1 and first CTA do. On the
  short desktops, page headers show the H1 and the lead above the fold. Gate (maintainer-local,
  `plans/` is git-ignored): `plans/261009-0940-short-viewport-fit/tools/viewport-fold-gate.mjs`
  against `yarn preview`, light and `--dark`; it exits 1 on failure.
- `yarn build` and `yarn lint` pass (0 errors, 0 warnings). The build runs the prerender; it
  fails loudly if a listed route renders the 404 page or has no `<h1>`.

## UX rubric (score 0–3, anything below 2 needs a fix or a recorded reason)

| Area | Check |
|---|---|
| First impression | In five seconds: who, what he builds, where to click |
| Brand recall | Spirit, sky and kit materials present; one type family, one accent |
| Content punch | Headlines state an outcome; CTAs are verb + object; no filler adjectives |
| Clarity and hierarchy | One primary action per view; heading order h1 → h2 → h3 |
| Storytelling | Homepage keeps the dawn → night chapter order |
| Knowledge and trust | Real projects, dates, stack; CV and contact reachable |
| Motion | 150–500 ms, transform/opacity only; nothing hidden in markup; reduced motion = static |
| Responsive | Recomposed per viewport; touch targets ≥ 24 px (primary ≥ 44 px) |
| Accessibility | Contrast per guidelines §3.3; visible focus; alt text; landmarks nav / main / footer |
| Performance feel | Hero is not lazy; no layout shift when the 3D spirit or banners swap |

## Hydration (prerendered pages)

- Open a built page (`yarn build && yarn preview`) and check the console: no React
  error #418/#423 (hydration mismatch), one `<title>` and one canonical in `<head>`.
- Values the server cannot know (stored theme, query string, `matchMedia`, random decor)
  switch in after hydration (`useHydrated()`) or come from CSS `dark:`, never in the first render.
- The console stays silent even when React throws away a lazy route's HTML. Check that the
  prerendered nodes survive: grab `main h1` at `readystatechange` = interactive and
  compare after load; `<main>` must never be empty.

## Discovery surfaces (AX)

Run against a local preview (it mirrors Vercel headers and 404s):

```bash
yarn build && yarn preview --port 4173
node <ak-enhance-ux-ax>/scripts/check-discovery-surfaces.mjs http://localhost:4173 \
  --site-origin https://jura69.vercel.app --sample 12
```

- Exit 0 with no warnings. Accepted info: no `Accept: text/markdown` negotiation (twins are
  served at `.md` URLs instead).
- New route → appears in `sitemap.xml`, has `/<route>.md`, is listed in `llms.txt`, and its
  HTML contains its own title, description, canonical and JSON-LD before any JavaScript runs.
- New project → `node scripts/generate-og-images.mjs`; its page uses `/images/og/<id>.jpg`.
- `public/robots.txt` policy changes are an owner decision; never flip a bot rule silently.

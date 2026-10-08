# DESIGN.md — Jura69 portfolio

**Brand essence:** a day in a hand-painted forest — a warm, knowledgeable developer's sketchbook,
guided by Mầm Đèn, the site's own seed-lantern spirit.

This file is the entry point for visual and interaction decisions. The full system — gouache art
rules, color scales, semantic tokens, contrast table, type scale, iconography, components,
textures, imagery and AI prompt anatomy — lives in
**[docs/design-guidelines.md](docs/design-guidelines.md)**. Tokens are implemented in
[src/styles/global.css](src/styles/global.css); the day→night sky in
[components/scene/zone-data.ts](components/scene/zone-data.ts). Read both before UI work.

## Art direction (summary)

- Gouache background art on parchment; UI pieces are paper, wood and leaves laid on the scene.
- Light mode = daylight through leaves; dark mode = moonlight plus warm lantern points.
- Signature elements: Mầm Đèn (3D hero, 2D navbar logo, stills on 404/contact/OG), the
  cumulus sky, the journey trail with its walking lantern.
- One family: M PLUS Rounded 1c. One accent per theme (moss `#3d6a4b` / spirit-teal `#98d8c8`).
- Avoid: glassmorphism, neon, glossy PBR 3D, stock photos, emoji, cold grey 1px borders.

## Tokens (pointers)

| Group | Source |
|---|---|
| Color scales + semantic tokens + contrast | guidelines §3, `global.css` `:root` / `.dark` |
| Type scale | guidelines §4 |
| Radius, spacing, elevation (`shadow-paper`) | guidelines §5 |
| Materials (`paper-grain`, `material-wash`) | guidelines §8, `global.css` `@layer components` |

## Motion principles

- UI state changes 150–250 ms (theme toggle 200 ms, page fade 250 ms); entrances 500 ms
  (`easeOut`), the journey walk 800 ms (`[0.22, 1, 0.36, 1]`). Transform and opacity only.
- GSAP + Lenis only inside `components/scene/`; Motion for components (guidelines §10).
- **Content is never hidden in markup.** Pages are prerendered, so anything with
  `opacity: 0` in the HTML is blank for crawlers, no-JS readers and the first paint.
  - Entrance reveals use `components/ui/reveal.tsx`: a plain element that hides only
    below-the-fold content after mount and reveals it on scroll.
  - The hero entrance is the CSS `.hero-rise` keyframe (runs from the HTML, never re-run
    by hydration).
  - Do not add `initial={{ opacity: 0 }}` Motion props to page content.
- `prefers-reduced-motion: reduce`: no movement and no hidden content; the scene is a
  still frame, the hero spirit shows its still pose, the journey trail is fully inked.

## Breakpoints and layout

- Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Content column max 1100 px; the
  homepage sections are full-bleed so the sky shows at the margins.
- The fixed navbar is 72 px: `main` uses `pt-18`, anchors use `scroll-padding-top`.
- Verify every UI change at 1440×900, 768×1024 and 375×812 (see [REVIEW.md](REVIEW.md)).

## Components

- Buttons: `buttonClasses()` (solid = brush-wash accent, outline, ghost); one solid CTA per view.
- Cards: paper surface, `shadow-paper`, lift on hover; project cards link through their title.
- Detail pages: `DetailTitle` (breadcrumb `nav` + single `h1`, year badge beside it),
  `DetailProse`, `DetailMeta` (label badges), `DetailImage`.
- Theme-dependent markup must be hydration-safe: prefer CSS `dark:` variants (the theme
  toggle); when markup truly needs `mode` (banner image), gate it with `useHydrated()`.

## Voice and tone

- First person, plain and specific: say what was built, for whom and with what.
- Lead with the outcome ("I build enterprise AI agent platforms…"), then the mechanism.
- English UI copy; Vietnamese names keep their diacritics (Trương Tuấn Lộc, Khánh Hoà).

| Do | Don't |
|---|---|
| "Verifies product placement from shelf photos with computer vision" | "Revolutionary AI-powered solution" |
| "Designed RESTful APIs serving 10,000+ daily active users" | "Passionate rockstar ninja developer" |
| One CTA verb + object: "View My Works", "Download CV" | Several equal-weight buttons in the hero |

## Discovery surfaces (keep in sync)

Every route's HTML, markdown twin (`/<route>.md`), `sitemap.xml`, `llms.txt` and
`llms-full.txt` are generated at build time from the rendered pages
(`scripts/prerender-routes.mjs`). Add a project by adding it to
`components/works/works-data.ts`, its page to `src/pages/works/` and its route to `src/app.tsx`;
run `node scripts/generate-og-images.mjs` for its 1200×630 social card.

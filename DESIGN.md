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
- Avoid: glassmorphism (no `backdrop-blur` on UI surfaces), neon, glossy PBR 3D, stock photos, emoji,
  cold grey 1px borders.

## Home first impression (owner decisions, 2026-10-09)

- The hero H1 is the value line "I build enterprise AI agent platforms."; the owner's name sits in the
  line above it with the avatar, and stays in `<title>`, the OG card and the markdown twin / llms name
  (the H1 carries `data-twin-name`, read by `scripts/prerender-routes.mjs`).
- Desktop hero is split: text, CTAs, proof stats (2+ yrs / 15+ / 10+, deliberate floors) on the left;
  Mầm Đèn and a "Now building" card on the right. Phones stack spirit → text → card.
- Proof before biography: "Selected work" (01 · Morning) comes right after the hero, with the client
  brands line (BAT, Castrol, Mondelez). Chapters then run 02 Noon About → 03 Afternoon Skills →
  04 Dusk Journey → 05 Night Say hello.
- Titles overlaid on the gouache banners and project covers are intentional.

## Tokens (pointers)

| Group | Source |
|---|---|
| Color scales + semantic tokens + contrast | guidelines §3, `global.css` `:root` / `.dark` |
| Type scale (`text-display`, `text-page-title`, `text-section`, `text-lead`) | guidelines §4, `global.css` `@theme`, registered in `lib/cn.ts` |
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

- Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). One content column: `Container size="page"`
  (1100 px + 16/24/32 px gutter) for the navbar, footer, home sections, listing and detail pages; the
  sky shows at the margins. Section rhythm `py-16 md:py-24`.
- The fixed navbar is 72 px: `main` uses `pt-18`, anchors use `scroll-padding-top`. It is transparent over
  the sky at the top of a page and turns solid paper once scrolled (synced on mount for deep links).
- Size the first screen by height as well as width: short laptops (13–15" at 125–150% scale) show only
  ~650–790 px. The `short` variant (lg and ≤ 820 px tall) tightens vertical rhythm only.
- Verify every UI change at 1280×650, 1440×790, 1920×950, 768×1024 and 375×812 (inner viewports; full
  matrix and fold gate in [REVIEW.md](REVIEW.md)).

## Components

- Buttons: `buttonClasses()` (solid = brush-wash accent, outline, ghost); one solid CTA per view.
- Cards: `FeaturedProjectCard` (Works flagships), `OverlayProjectCard` (Home selected work, title on the
  painting), `ProjectRowCard` (lists and the detail pager), `ProjectCard` (audiophile / activities grids);
  paper surface, `shadow-paper`, one link per card named by its title (images `alt=""`).
- Page header: `PageHeader` on every listing and detail page — breadcrumb, then the banner or project cover
  with the eyebrow and H1 on the shared `.cover-scrim` (or a plain eyebrow + H1), then the lead.
- Detail pages: `DetailBody` (prose + facts card as `dt`/`dd`, facts first on phones) and `DetailPager`
  (previous / next in the same category + "All …").
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
| One CTA verb + object: "View my works", "Download CV" | Several equal-weight buttons in the hero |

## Discovery surfaces (keep in sync)

Every route's HTML, markdown twin (`/<route>.md`), `sitemap.xml`, `llms.txt` and
`llms-full.txt` are generated at build time from the rendered pages
(`scripts/prerender-routes.mjs`). Add a project by adding it to
`components/works/works-data.ts`, its page to `src/pages/works/` and its route to `src/app.tsx`;
run `node scripts/generate-og-images.mjs` for its 1200×630 social card.

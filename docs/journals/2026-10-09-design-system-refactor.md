# 2026-10-09 — Design-system refactor shipped

**Plan:** `plans/261009-0617-portfolio-design-system-refactor/` (7 phases, one commit each, fast-forwarded to master).
**Verification:** `plans/reports/design-system-refactor-verification-261009.md`.

## What changed

The approved Design-canvas redesign is in code: a split first-impression hero (value line as H1, proof stats, a
"Now building" card beside Mầm Đèn), Selected work directly under it, numbered day chapters, one `Container`, one
type scale, one scrim, one `PageHeader` for all listing and detail pages, a shared detail layout with facts and a
pager, a transparent-to-paper navbar and a navigational footer.

## What surprised us

- **tailwind-merge silently drops custom font sizes.** `twMerge('text-section text-ink')` keeps only `text-ink`;
  the type tokens must be registered in `lib/cn.ts`. Found by the red team before any code, checked with a 3-line assertion.
- **The Home LCP is a font event, not a paint.** Blocking Google Fonts drops LCP from ~5.4 s to 2.8 s. A true 800 weight
  added +0.9 s, and this CJK family's font CSS is ~30 KB per weight. Rendering the heavy weight at 700 and trimming the
  URL to 400/500/700 turned a +7% regression into −15%.
- **CSS background images count for LCP.** The 95 KB paper texture on the facts card became the phone LCP element on
  detail pages; the canvas drew the card flat anyway.
- **`aspect-ratio` + `min-height` transfers a minimum width.** A 240px min-height on a 2:1 banner forced a 480px width at 375px.
- **Mobile emulation hides overflow.** With CDP `mobile: true` the layout viewport widens to the content, so
  `scrollWidth > innerWidth` never fires; compare with the device width instead.
- **A frame-relative scrim cannot cover wrapping titles.** Anchoring the gradient to the text block keeps gold
  eyebrows ≥ 5.5:1 however many lines a title takes.

## Open

Owner kept the heavy weight at 700. JourneyCard role contrast fixed in a follow-up (55% mix with `--ink`).
Still open: `/audiophile` and `/activities` jump from H1 to H3 (pre-existing).

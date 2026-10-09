---
title: Short laptop viewport fit
date: 2026-10-09
summary: "Height-aware Home hero and page headers so the first screen fits 13–15 inch laptops at 125–150% scale"
---

# Short laptop viewport fit

## What happened

The design-system refactor sized the first screen by viewport width only. On short laptop viewports
(1280×650 for a 13" laptop at 150% scale, 1366×650, 1440×790) the Home CTAs, stats, spirit and "Now building"
card fell below the fold, and detail covers pushed the lead below it. The old gate measured 1440×900, which is a
screen size, not the inner viewport a browser actually shows (a MacBook Air shows about 1440×790), so the
regression passed review.

## Changes

- `src/styles/global.css`: `--text-display: clamp(2.625rem, min(6vw, 9.5svh), 5.25rem)` and a `short` custom
  variant (lg and at most 820 px tall) that only tightens vertical rhythm.
- `components/home/hero-dawn.tsx`: spirit cell and grid column `min(440px, 52svh)` (still a fixed cell per
  viewport, so no layout shift on the 3D swap); `short:` margins and padding.
- `components/ui/page-banner.tsx` `short:max-h-[52svh]`, `components/ui/page-header.tsx` `short:pt-6`.
- New gate `plans/261009-0940-short-viewport-fit/tools/viewport-fold-gate.mjs` over the inner-viewport matrix;
  REVIEW.md, DESIGN.md and docs/design-guidelines.md name the matrix and the height-aware rule.

## Results

- Gate passes in light and dark. At 1280×650 the hero ends at card 570 / cue 630; 1920×950 is unchanged (H1 84 px).
- Page headers at 1280×650 show the H1 and the lead above the fold. Cover crops and scrim contrast hold at the
  1036×338 frame (worst title 8.82:1, gold eyebrow 5.54:1).
- Hydration is clean. LCP is within noise of master (4320 ms vs 4224 and 4408 ms); the mobile render is unchanged.

## Lessons

- Gate on inner viewports, not screen sizes.
- Tailwind 4 emits `@custom-variant` media blocks after the breakpoint blocks, so `short:` beats `lg:`/`md:`
  without stacking. Verified in the built CSS.
- `prettier --write` reflows unrelated lines in this repo (it is not prettier-clean), so don't run it on touched files.
- The CDP probe can abort at exit on Windows (libuv `UV_HANDLE_CLOSING` assert, 0xC0000409). The gate now retries once.
- AGENTS.md is git-ignored, so edits to it stay local.

## Next steps

- Commit and merge `feat/short-viewport-fit` once the owner has reviewed it.

> Historical work record — not durable authority. Prefer docs/specs/ADRs for current decisions.

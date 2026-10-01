# Hero Spirit 3D Accent: Mầm Đèn Replaces Totoro (Direction A)

**Date**: 2026-10-01 11:55–19:36
**Severity**: Low (planned delivery, one review-caught runtime bug)
**Component**: `components/spirit/`, `components/home/hero-dawn.tsx`, `components/scene/zone-data.ts`, navbar icon
**Status**: Done on local branch `feat/hero-spirit-3d-accent`. Not merged, not pushed.

## What Happened

After the painted-world NO-GO, we took direction A: keep the SVG layout and scenes, use 3D only as a hero accent. The original spirit Mầm Đèn (procedural, painted toon material) now stands on a moss island and replaces the Totoro GLB. The navbar icon is Mầm Đèn too. Sky stops in `zone-data.ts` were repainted from the gouache banners. Seven commits, `d3f7660`..`153e029`, one per phase plus review fixes and docs.

## The Brutal Truth

The numbers came out almost embarrassingly good. The look is the same "clean toon", not gouache, that sank the world spike. It passes only because the scope shrank to one small canvas and the user accepted that. The night island moss still reads slightly too bright against the navy sky. We shipped that knowingly.

## Technical Details

- Weight: 1.5 MB GLB and Draco CDN gone. `vendor-three` 150.19 → 125.77 KB gz (−24 KB). Spirit chunk 6.58 KB gz (budget 15).
- LCP `/`: 5060 → 4792 ms (−5.3%). `/works` is unchanged, `/audiophile` +1.8%. CLS unchanged.
- 9 820 tris/frame. 60 fps on desktop and on an **emulated** phone (412×823@2x, CPU 4×).
- Sky repaint under a hard contrast gate: `ink-muted` ≥ 4.5:1 on every stop (measured min 4.58 light, 4.59 dark). That forced day blues lighter than the banner. This is an honest trade-off, not a faithful match.
- Visual refine round 1: round 0 read as a mushroom cap (moss brim over the pebble). Fixed by putting the moss cap inside the pebble outline, island ×0.85, lower and closer camera, seed light 2.4→5.
- **Review bug M1**: three's `compileAsync` polls on a 10 ms `setTimeout` that cannot be cancelled. Context lost mid-compile, then stage dispose, and the next poll reads an undefined `currentProgram`. The result is an uncaught TypeError. We had hit the "errors never reject" side of this in the spike and only guarded the dispose ordering, which was not enough. Fix `45560c7`: our own abortable poll over `renderer.compile()` in `components/spirit/compile-settle.ts`, which aborts on disposed, lost, or a 4 s timeout. The "context lost mid-compile" check now passes with 0 uncaught errors. The same commit stops the placeholder blinking empty: it now crossfades to opacity 0 instead of unmounting.
- Tooling: the plan-local `capture.mjs` split `--flag=value` on every `=`, so a `--wait=<js expr>` containing `=` was truncated and the wait timed out. Fixed to split on the first `=` only.

## What We Tried

Review-driven fixes only: scene built CPU-side before the renderer, redraw on resize, blob-shadow colorspace include. We skipped DPR re-evaluation on monitor change (cosmetic, YAGNI).

## Root Cause Analysis

M1 was a known spike lesson applied halfway. "Dispose after compile settles" assumes the library's poll can be waited on, but it cannot be stopped. The reviewer found what our own checks missed because none of them killed the context during compile.

## Lessons Learned

- Never rely on three's `compileAsync` when the owner can die. Own the poll and make it abortable.
- Test teardown races deliberately (lose context mid-compile), not just the happy-path route churn.
- Parse CLI flags on the first `=`. Debug the tool before blaming the render.
- A hard contrast constraint beats palette fidelity. Write the trade-off down, as above.

## Next Steps

- Measure fps on a real phone (`vite preview --host`). Owner: you, before merge.
- Decide merge/push. Nothing is pushed.
- Prettier still fails on 6 untouched works files (advance-system, ai-center, mondelez-display, ocr-cccd, planogram, works-data). This is pre-existing and needs a separate formatting commit.
- Guardrail: never put `--ink-subtle` on the sky (2.4–3.9:1).

## Follow-up (same evening): lantern light + idle motion

User feedback: the lantern and its light looked fake, and the hero felt monotonous. Night captures showed why. The seed was a flat, near-white emissive disc with no halo. Its PointLight cut a hard cream toon band across the stone, and the moon lit the moss cap lime.

Fix without post-processing (`f888747`):
- `seed-lantern.ts` adds a view-facing emissive gradient (cream core → amber rim), a sprite halo, a warm PointLight, a ground light-pool decal that follows the seed, and a multi-sine flicker.
- At night `uBandSoftness` widens the toon band edges, so the lantern light falls off softly.
- The moon is dimmer and cooler.

Motion added:
- the island bobs;
- the lantern swings on a spring pendulum;
- the leaf flutters;
- the gaze follows the pointer, and when idle the spirit glances around and up at its lantern;
- 14 vertex-shader fireflies at night, pollen by day.

Cost: 10k tris, +3 draw calls, spirit chunk 8.8 KB gz, still 60 fps.

Review found two real pendulum bugs:
- Taps stacked kick velocity until the seed could loop through the stalk. Fixed by capping the kick velocity and clamping the swing.
- The stale previous-frame state after a loop pause injected a jolt on resume. Fixed by resyncing on time gaps.

Lesson: any integrator driven by deltas needs gap handling whenever the loop can pause.

# Painted Forest 3D World: Look-dev Spike → NO-GO

**Date**: 2026-10-01 16:20–17:45
**Severity**: Medium (direction decision, no production impact)
**Component**: `components/scene/` (3D world spike), build config
**Status**: Closed — NO-GO, spike preserved in history (`c1edabe`), route removed (`4500917`)

## What Happened

Phase 1 of the "painted forest 3D world" plan: prove that procedural three.js could sit next to the gouache banners as the same series before committing ~16 days. Built a dev-only `/__lookdev` hero frame — sky dome, SDF cloud cards, heightfield + path, grass, hero tree, the new original spirit **Mầm Đèn** (picked from three 2D silhouettes; the acorn option was dropped for being too close to an owned character), a paper lantern — on one shared painted MeshToon material. Two refine rounds, then a side-by-side compare. User called NO-GO on look; every technical gate passed.

## The Brutal Truth

The numbers were never the risk and they proved it: 75k tris, 60 fps on an integrated GPU, phone ≥ 40 fps, 9.2 KB gz of world code, prod build clean. The look is the risk, and procedural toon geometry tops out at "clean stylised diorama". It does not reach dense gouache with ink lines and brush-dab foliage without texture painting. Two rounds moved it from "low-poly game" to "pleasant illustration", which is not the banners.

## Technical Details

- `taperedTube` shipped with inward winding (tri normal = T×(T×n) = −n): the trunk rendered its inner far wall with full rim glow. Caught only by the night capture looking wrong.
- Background trees as 3D lobes = 113k tris and polygonal silhouettes. Painted billboard cards (SDF clumps + fake sphere normal fed through the same painted pipeline, alpha-to-coverage) = ~1k tris and read far better.
- `manualChunks` for `world`/`world-debug` made Rollup pull shared `scene/zone-data` into that chunk and modulepreload it from `index.html`. Never bucket app modules that share deps with the eager graph.
- `compileAsync` polls on a timer: disposing mid-compile throws `isReady of undefined`, and errors never reject the promise.
- The fps overlay counted shader compile as one frame: quick captures showed 37 fps where steady state was 60.

## What We Tried

ACES vs no tone mapping (ACES greys the palette, so none). zone-data sky vs banner-sampled sky (zone-data day sky ≈ white, night ≈ black; banner stops clearly better). Directional shadow (works, small gain; canopy sway missing from depth pass).

## Root Cause Analysis

The gate was aesthetic by design and it did its job: two days spent instead of sixteen.

## Lessons Learned

- Run the side-by-side compare against the real reference in round one, not after refining.
- Raw-CDP capture + sharp value stats are cheap, reusable verification for any canvas work in this repo.

## Next Steps

- Direction A (3D accent) needs its own plan; `components/scene/world/painted-material.ts` is kept for it.
- Carry-over decisions: spirit Mầm Đèn; banner-sampled sky stops for the SVG scene too; blob shadows by default.

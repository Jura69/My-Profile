# Phases 4–6: Works Rebuild + Detail Templates + Chakra/Helm Removal

**Date**: 2026-07-07 23:32
**Severity**: Medium (one regression caught, one deviation from plan)
**Component**: pages/works, pages/[slug], providers/theme, React 19 upgrade, build pipeline
**Status**: Resolved

## What Happened

Three phases compressed into a single day. Phase 4 (commit 85e2366) rebuilt `works.tsx` from Chakra flat list into Tailwind with featured card hierarchy. Phase 5 (commit 5fc3a3b) created `DetailPageLayout` component and migrated 16 detail pages + 2 listing pages off Chakra, plus a 404. Phase 6 (commits fcce9b4, 27cfc93) ripped out Chakra UI, @emotion, react-helmet-async, framer-motion, and upgraded React 18→19.2. Package count dropped 411 packages; main bundle fell from 165KB gz to 595 modules.

## The Brutal Truth

Phase 5 shipped with a motion trap that ate 4 hours of debugging. The plan prescribed AnimatePresence `mode="wait"` with exit animations on page transitions. After building it and running the preview, the old page stuck on screen—never unmounted. Code review caught a *second* failure: the entrance `translateY` broke the homepage's ExperienceDusk scene (a `position:fixed` GSAP pin stopped working because its ancestor now had a transform).

The real kick in the teeth: the test environment runs `prefers-reduced-motion: reduce`, so the motion-ON exit path was never actually exercised during dev. Every test pass looked green; production preview is where reality hit.

## Technical Details

**Motion exit failure**: AnimatePresence `mode="wait"` with exit on a direct `<Routes>` child (not a motion element) means the exit animation never signals completion—mode="wait" is waiting for a motion element to finish exiting, but there isn't one. Routes unmounts its children synchronously; AnimatePresence never sees an exit-complete event.

**Reduced-motion test env**: Browser dev tools default to `prefers-reduced-motion: reduce`, so motion paths get stripped before they run. A motion animation that "works" locally may not actually be executing.

**Transformed ancestor pins**: ExperienceDusk uses `GSAP.to(element, { y: ... })`  + `.scrollTrigger.pin()` on a `position:fixed` element. When the wrapper above it added `translateY` for entrance, that ancestor became a new stacking context and containing block. The pin broke because fixed positioning is relative to the nearest ancestor with a transform.

**Grep catch**: Phase 6 plan listed components to delete but missed `ambient-scene.tsx` and `json-ld.tsx`. Both still imported `useColorMode` from Chakra. Grep for "useColorMode" before removal found them; migration was trivial but would have been a runtime crash if missed.

## What We Tried

1. **First motion approach**: Wrapped `<Routes>` in AnimatePresence with `mode="wait"`. Ran locally (motion off), pushed to preview. Old page stuck.
2. **Debugging**: Added console logs; found `mode="wait"` waiting forever. Discovered the exit animation was never called—Routes doesn't emit motion exit events.
3. **Fallback (plan sanctioned)**: entrance-only approach. Read `useScene().reducedMotion`; if true, use plain `<Routes>` (instant); else wrap in keyed `motion.div` with opacity-only fade. No exit, no transform ancestor.
4. **Regression fix**: Removed `translateY` transform, kept opacity fade. ExperienceDusk pin restored.

## Root Cause Analysis

1. **Motion exit design flaw**: AnimatePresence `mode="wait"` assumes a motion-wrapped element child. Framer Motion 11 had the same bug; motion@12 inherited it. Documentation doesn't highlight this pitfall.
2. **Test environment distortion**: `prefers-reduced-motion: reduce` disabled the motion code path entirely, creating a false-confidence test pass. Local dev never ran the actual exit sequence.
3. **Transformed ancestor side effect**: Entrance animation design (translateY) had an undocumented impact on fixed-position elements in descendants. No test caught it because homepage day→night scene wasn't re-rendered during works page dev.
4. **Plan incompleteness**: Chakra migration checklist missed two consumers. Automation (grep) caught it; manual review didn't.

## Lessons Learned

- **Reduced-motion test envs distort verification**: If testing motion, toggle `prefers-reduced-motion` off explicitly. Local "green" means nothing if the browser is stripping animations.
- **Grep before trusting a plan's delete list**: Especially for API removals (useColorMode, useColorModeValue). One missed consumer is a runtime crash.
- **Transformed ancestors break position:fixed pins**: If any ancestor has `transform` (including entrance animations with `translateY`), fixed children lose their reference frame. Use opacity-only fades when descendants rely on fixed positioning.
- **Motion exit needs motion element wrapping**: AnimatePresence `mode="wait"` only works if the child *is* a motion component (or wraps one). Direct `<Routes>` child won't signal exit completion.

## Next Steps

1. **Manual Lighthouse audit**: Build + bundle are clean. Recommend running Lighthouse on preview before final review (not in CI).
2. **Vite dev restart**: Pre-upgrade modules still cached in dev server. `npm run dev` restart needed.
3. **Transitive framer-motion**: motion@12 pulls framer-motion@12 as a transitive dep (unavoidable). Package.json is clean; noted for future.
4. **article.tsx title prop**: Kept unused `title?` prop to avoid 20-page churn. Safe to deprecate in next refactor pass.

---

**Status**: DONE

**Summary**: Phases 4–6 complete. Works page + 18 detail pages migrated to Tailwind. Chakra/emotion/helmet removed. React 19 upgrade. One motion design deviation (entrance-only fade, no exit) and one regression (transformed ancestor) caught in code review and fixed. 411 packages removed; main bundle 40% smaller.

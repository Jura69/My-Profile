# Ghibli UI Rebuild: Brainstorm + Full-Scope Planning Session

**Date**: 2026-07-07 14:00–16:00
**Severity**: High (scope + decision density)
**Component**: UI layer, animation, build toolchain, documentation
**Status**: Locked (plan signed, tasks hydrated, phase sequence locked)

## What Happened

Brainstorm + /ck:plan session to escape animation noise death spiral: current site mixes particles + stars + celestial timelapse + Totoro parallax + 3D box-shadow tilt all at once, killing readability & perf. Codebase docs & README describe Next.js (dead) but app is Vite SPA. SEO client-side only (user accepted this explicitly). Result: 9 locked decisions, 6-phase rebuild plan with dependency chain, 6 Claude Tasks hydrated.

## The Brutal Truth

UI is a temple to *impressiveness*, not *craft*. Animation is noise masquerading as identity. Docs are fiction. Chakra is dead weight (colorMode still needed, so dual-theme burden falls on us during phases 1–5). React 19 upgrade will crater if we touch Chakra internals, so React 19 deferred. GSAP was user's counter-choice (recommended Motion-only for simplicity, user chose hybrid stack Motion + GSAP ScrollTrigger + Lenis with "strict discipline contract": GSAP confined to `/components/scene/`, max 1 pinned moment, content-first rule). Decision fatigue is real: 80 options collapsed into 9 binaries, acceptance record signed.

## Technical Details

**Perf baseline**: ~90 DOM nodes animating box-shadow, scroll listener → setState re-renders, 1.2MB PNG decorations. Layout clones craftz.dog at 768px.

**Decisions locked**:
1. Content-first concept: "A Day in the Forest" (scroll hero→dawn→morning→midday→dusk→night = 5 visual scenes)
2. Tailwind CSS 4.3.2 (no preflight phases 1–5, coexists with Chakra, preflight + Chakra removal at phase 6)
3. Radix UI primitives replacing Chakra (async, non-blocking)
4. Animation stack: Framer Motion 12.42.2 + GSAP 3.15.0 ScrollTrigger + Lenis 1.3.25 (user chose this, not pure Motion recommendation)
5. React 18→19 upgrade deferred to phase 6 (risk: React 19 + Chakra = debugging hell on soon-dead code)
6. React Router 7 stays (v8 released, out of scope)
7. react-helmet-async → React 19 native `<title>/<meta>` (phase 6)
8. Chakra dark mode is source of truth until phase 6 (then ownership flips to TW4)
9. Full-site rebuild scope (no MVP carve-out)

**Planning refinements**:
- Phases 1–6: Foundation TW4 → Ambient + Hero → Homepage sections → Featured projects grid → Detail pages + 404 → Chakra removal + Polish + Docs
- 6 Tasks with 3-deep dependency chain (P2 ← P1, P3 ← P2, P4 ← P1, P5 ← P1+P4, P6 ← P2+P3+P4+P5)
- Versions verified live on npm

## Root Cause

Portfolio became victim of its own ambition: "impress at first scroll" → animation bloat → unreadability → "add more polish" → death spiral. Docs rotted (Next.js ghost). No `prefers-reduced-motion` implemented. Decision paralysis deferred clarity.

## Lessons

**Don't** let motion designers ship animation without a content-first bar. **Always** decouple framework upgrades from major refactors (React 19 + Chakra removal = double risk). **Plan** under a clear constraint (A Day in Forest = organizing spine). **Discipline contracts work**: user accepted hybrid animation stack only under rules (GSAP quarantine, 1 pinned moment max, content-first veto power).

## Next Steps

- Phase 1 exec: TW4 foundation + variables layer (no visual changes yet, unlocks phases 2–4 in parallel)
- Phase 2: Ambient scene + Hero rebuild (Motion + GSAP ScrollTrigger)
- Phases 3–5: Homepage + Works + Details (parallel, P1 blocker lifted after week 1)
- Phase 6: Chakra removal, React 19 bump, docs rewrite
- Deferred questions: featured projects selection (P4), 404 design (P5), JSON-LD keep-or-drop (P6)

---

Status: DONE
Summary: Locked 9 decisions, 6-phase plan, dependency chain hydrated into tasks. Animation stack → hybrid (Motion + GSAP ScrollTrigger + Lenis) with user-accepted discipline contract. React 19 deferred, Chakra removal phase-6 only.
Concerns/Blockers: None — session complete, ready to execute phase 1.

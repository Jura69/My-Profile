/**
 * Expression layer for Mầm Đèn: overrides blended on top of the procedural rig in `forest-spirit.ts`.
 * Two sources feed it — a transient reaction to a theme switch (live hero) and fixed named poses
 * (the stills rendered by `scripts/render-spirit-stills.mjs`). Pure math, no three objects.
 */
import { MathUtils } from 'three'

export interface SpiritPose {
    /** Eye openness multiplier: 1 open, ~0.12 closed (a thin line), > 1 wide. */
    eyes: number
    /** Gaze target (−1..1 per axis, +y up) and how strongly it overrides pointer/idle gaze (0..1). */
    gaze: [number, number]
    gazeWeight: number
    /** Body roll (rad), + leans toward screen left. */
    tilt: number
    /** 0 upright … 1 sprout bowed forward and body slumped (asleep). */
    droop: number
    /** Extra lantern brightness on top of the theme glow (0 = none). */
    flare: number
}

export const NEUTRAL_POSE: SpiritPose = { eyes: 1, gaze: [0, 0], gazeWeight: 0, tilt: 0, droop: 0, flare: 0 }

/** Named poses for rendered stills. */
export const STILL_POSES = {
    /** Night contact: dozing beside its dimmed lantern. */
    sleepy: { eyes: 0.12, gaze: [0, -0.7], gazeWeight: 1, tilt: 0.05, droop: 1, flare: -0.35 },
    /** 404: lost — head cocked, peering off to the side, lantern held bright. */
    puzzled: { eyes: 1.12, gaze: [-0.8, 0.45], gazeWeight: 1, tilt: 0.22, droop: 0, flare: 0.1 },
    /** OG card: looking toward the title on its left. */
    greeting: { eyes: 1, gaze: [-0.6, 0.15], gazeWeight: 1, tilt: 0.04, droop: 0, flare: 0 }
} satisfies Record<string, SpiritPose>

export type StillPoseName = keyof typeof STILL_POSES

/** Idle glance for time slot `slot`: centre, left, right, or up at the lantern (deterministic). */
export function idleGlance(slot: number): [number, number] {
    const h = Math.abs(Math.sin(slot * 91.7) * 437.5) % 1
    if (h < 0.35) return [0, 0]
    if (h < 0.55) return [-0.7, -0.1]
    if (h < 0.75) return [0.7, 0]
    return [0.55, 0.9]
}

/** Seconds the theme reaction lasts; past this the rig is untouched. */
export const THEME_REACTION_SECONDS = 1.9

const bump = (x: number) => (x > 0 && x < 1 ? Math.sin(x * Math.PI) : 0)

/**
 * Theme-switch reaction `since` seconds after the switch, written into `out`.
 * To night: glance up at the lantern, eyes widen, the lantern flares once just after the ~0.6 s light lerp.
 * To day: two quick blinks, then a squint while turning away from the sun (key light from screen left).
 */
export function themeReaction(since: number, toNight: boolean, out: SpiritPose): SpiritPose {
    Object.assign(out, NEUTRAL_POSE)
    if (!(since >= 0 && since < THEME_REACTION_SECONDS)) return out
    const env = MathUtils.smoothstep(since, 0, 0.18) * (1 - MathUtils.smoothstep(since, 1.35, THEME_REACTION_SECONDS))
    out.gazeWeight = env
    if (toNight) {
        out.gaze = [0.55, 0.9]
        out.eyes = 1 + 0.14 * bump((since - 0.25) / 1.1)
        out.flare = 0.75 * bump((since - 0.45) / 0.75)
    } else {
        out.gaze = [0.65, -0.25]
        const blink = since < 0.1 || (since > 0.2 && since < 0.3)
        out.eyes = blink ? 0.12 : MathUtils.lerp(1, 0.45, since > 0.3 ? env : 0)
        out.tilt = -0.07 * env
    }
    return out
}

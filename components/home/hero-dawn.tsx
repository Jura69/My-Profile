import { Component, lazy, Suspense, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Link as RouterLink } from 'react-router'
import { ArrowRight, ChevronDown, Download } from '../icons/kit-icons-interface'
import { buttonClasses } from '../ui/button-styles'
import Container from '../ui/container'
import { SpiritIllustration } from '../icons/spirit-mam-den'
import { useHydrated } from '../../lib/use-hydrated'
import HeroProofStats from './hero-proof-stats'
import HeroNowBuilding from './hero-now-building'

// The 3D spirit stays lazy: the hero must render immediately, three + the stage stream in after.
const LazySpiritCanvas = lazy(() => import('../spirit/spirit-canvas'))

/** Local boundary (eager, outside the lazy chunk so it also catches a failed chunk load): any
 *  spirit error falls back to the 2D illustration instead of bubbling to the route boundary. */
class SpiritBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
    state = { failed: false }
    static getDerivedStateFromError() {
        return { failed: true }
    }
    render() {
        return this.state.failed ? <SpiritIllustration /> : this.props.children
    }
}

const MotionRouterLink = motion.create(RouterLink)

/** CSS entrance (`.hero-rise` in global.css): runs straight from the prerendered HTML, needs no
 *  JS, survives hydration untouched and is off under reduced motion. */
const riseIn = (delay: number) => ({ style: { animationDelay: `${delay}s` } })

/** The markdown twin and llms files name Home after the owner, not the value line (owner decision). */
const TWIN_NAME = 'Trương Tuấn Lộc (Jura69) – Full-stack Developer'

/**
 * Scene 1 of the day→night homepage: dawn hero on the ambient sky. Desktop is split — the value
 * line, proof and CTAs on the left; the Mầm Đèn spirit (3D, 2D fallback) and the "Now building"
 * card on the right. Phones stack spirit → text → card. One node per grid area, in reading order
 * (text, spirit, card): the grid only moves the spirit up visually on phones. Sizing is height-aware
 * on desktop (display type and spirit cell scale with svh, `short:` tightens vertical rhythm) so the
 * whole hero fits above the fold on short laptop viewports.
 */
export default function HeroDawn() {
    // Server HTML carries the 2D spirit (visible without JS); the 3D canvas loads after hydration.
    const hydrated = useHydrated()

    return (
        <section data-section="hero" className="relative flex flex-col pb-24 lg:min-h-[calc(100svh-4.5rem)] lg:pb-20">
            <Container
                size="page"
                className="grid [grid-template-areas:'spirit'_'text'_'card'] flex-1 gap-x-10 gap-y-6 pt-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(min(440px,52svh),1fr)] lg:grid-rows-[1fr_auto] lg:gap-y-4 lg:pt-8 short:pt-4 lg:[grid-template-areas:'text_spirit'_'text_card']"
            >
                <div className="[grid-area:text] lg:self-start">
                    <p
                        {...riseIn(0.05)}
                        className="hero-rise flex flex-wrap items-center gap-x-2.5 gap-y-1 font-rounded text-base font-bold text-ink"
                    >
                        <img
                            src="/images/loc-72.webp"
                            alt=""
                            width={36}
                            height={36}
                            className="size-9 rounded-full border-2 border-surface-elevated object-cover"
                        />
                        Trương Tuấn Lộc{' '}
                        <span className="font-medium text-ink-muted">· Full-stack developer at CREASIA</span>
                    </p>

                    <h1
                        data-twin-name={TWIN_NAME}
                        {...riseIn(0.15)}
                        className="hero-rise mt-5 short:mt-3 font-rounded text-display font-extrabold text-balance text-ink"
                    >
                        I build enterprise <span className="hero-highlight">AI agent platforms</span>.
                    </h1>

                    <p
                        {...riseIn(0.3)}
                        className="hero-rise mt-5 short:mt-3 max-w-[46ch] font-rounded text-lead text-ink-muted"
                    >
                        Multi-channel assistants, agent orchestration, computer vision and OCR — shipped full-stack on
                        React, C# and Node.js.
                    </p>

                    <div {...riseIn(0.45)} className="hero-rise mt-8 short:mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <MotionRouterLink
                            to="/works"
                            className={buttonClasses('solid', 'lg')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            View my works <ArrowRight aria-hidden="true" />
                        </MotionRouterLink>
                        <motion.a
                            href="/files/CV.pdf"
                            download="TuanLoc_CV.pdf"
                            className={buttonClasses('outline', 'lg', 'bg-surface-elevated/85')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Download aria-hidden="true" /> Download CV
                        </motion.a>
                    </div>

                    <HeroProofStats {...riseIn(0.6)} className="hero-rise mt-10 lg:mt-9 short:mt-5" />
                </div>

                {/* Spirit: fixed cell so the 3D swap never shifts layout */}
                <div className="relative mx-auto size-[220px] [grid-area:spirit] sm:size-[300px] lg:size-[min(440px,52svh)] lg:self-end">
                    {/* Night: the lantern lights the scene. Its radius stays inside the cell, away from the text. */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-[6%] right-[4%] hidden size-[55%] rounded-full bg-[radial-gradient(circle,rgb(241_217_153/0.45)_0%,rgb(241_217_153/0.15)_45%,transparent_70%)] dark:block"
                    />
                    {hydrated ? (
                        <SpiritBoundary>
                            <Suspense fallback={<SpiritIllustration />}>
                                <LazySpiritCanvas />
                            </Suspense>
                        </SpiritBoundary>
                    ) : (
                        <SpiritIllustration />
                    )}
                </div>

                <HeroNowBuilding {...riseIn(0.75)} className="hero-rise [grid-area:card] lg:self-start lg:justify-self-center" />
            </Container>

            {/* Ink label: the cue sits on the scene's front hill, where accent-on-sky drops to 4.3:1 */}
            <a
                href="#work"
                className="absolute bottom-5 left-1/2 flex min-h-11 -translate-x-1/2 flex-col items-center font-rounded text-sm font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
            >
                Selected work
                <motion.span
                    aria-hidden="true"
                    className="text-xl text-accent-on-sky"
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown />
                </motion.span>
            </a>
        </section>
    )
}

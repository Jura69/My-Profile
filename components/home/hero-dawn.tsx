import { Component, Fragment, lazy, Suspense, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { Link as RouterLink } from 'react-router'
import { ArrowRight, ChevronDown, Download } from '../icons/kit-icons-interface'
import { buttonClasses } from '../ui/button-styles'
import { SprigLeaf } from '../icons/kit-ornaments'
import { SpiritIllustration } from '../icons/spirit-mam-den'
import { useHydrated } from '../../lib/use-hydrated'

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

const NAME_WORDS = ['Trương', 'Tuấn', 'Lộc']

/** CSS entrance (`.hero-rise` in global.css): runs straight from the prerendered HTML, needs no
 *  JS, survives hydration untouched and is off under reduced motion. */
const riseIn = (delay: number) => ({ style: { animationDelay: `${delay}s` } })

/**
 * Scene 1 of the day→night homepage: dawn hero. Full-bleed, composes with the
 * ambient scene behind it, the Mầm Đèn spirit (3D, 2D fallback) stands above the name.
 */
export default function HeroDawn() {
    // Server HTML carries the 2D spirit (visible without JS); the 3D canvas loads after hydration.
    const hydrated = useHydrated()

    return (
        <section
            data-section="hero"
            className="relative flex min-h-[85svh] flex-col items-center justify-center px-4 pb-24 text-center"
        >
            {/* Spirit — centered block, part of vertical flow; fixed cell so the 3D swap never shifts layout */}
            <div className="relative mb-6 h-[220px] w-[220px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]">
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

            <p
                {...riseIn(0.05)}
                className="hero-rise mb-6 rounded-full border border-line bg-surface/60 px-4 py-2 font-rounded text-sm text-ink backdrop-blur-md"
            >
                <SprigLeaf className="inline-block align-[-0.3em] text-accent" /> A Full-stack Dev Engineer{' '}
                <SprigLeaf className="inline-block align-[-0.3em] text-accent -scale-x-100" />
            </p>

            <h1 className="font-rounded text-5xl font-bold tracking-tight text-balance text-ink md:text-7xl">
                {/* Spaces sit between the inline-block words: trailing space inside one is collapsed */}
                {NAME_WORDS.map((word, i) => (
                    <Fragment key={word}>
                        {i > 0 && ' '}
                        <span {...riseIn(0.15 + i * 0.12)} className="hero-rise inline-block">
                            {word}
                        </span>
                    </Fragment>
                ))}
            </h1>

            <p {...riseIn(0.55)} className="hero-rise mt-4 max-w-xl font-rounded text-lg text-balance text-ink-muted">
                Jura69 · I build enterprise AI agent platforms and full-stack web apps
            </p>

            <div {...riseIn(0.7)} className="hero-rise mt-10 flex flex-wrap items-center justify-center gap-3">
                <MotionRouterLink
                    to="/works"
                    className={buttonClasses('solid', 'lg')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    View My Works <ArrowRight aria-hidden="true" />
                </MotionRouterLink>
                <motion.a
                    href="/files/CV.pdf"
                    download="TuanLoc_CV.pdf"
                    className={buttonClasses('outline', 'lg')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <Download aria-hidden="true" /> Download CV
                </motion.a>
            </div>

            <motion.div
                aria-hidden="true"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-2xl text-ink-muted"
                animate={{ y: [0, 8, 0] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            >
                <ChevronDown />
            </motion.div>
        </section>
    )
}

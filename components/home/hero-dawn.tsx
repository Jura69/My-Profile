import { lazy, Suspense } from 'react'
import { motion } from 'motion/react'
import { Link as RouterLink } from 'react-router'
import { IoArrowForward, IoChevronDown, IoDownloadOutline } from 'react-icons/io5'
import { buttonClasses } from '../ui/button-styles'
import TotoroLoader from '../totoro-loader'

// Totoro stays lazy: the hero must render immediately, the GLB streams in after
const LazyTotoro = lazy(() => import('../totoro'))

const MotionRouterLink = motion.create(RouterLink)

const NAME_WORDS = ['Trương', 'Tuấn', 'Lộc']

const riseIn = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: 'easeOut' as const }
})

/**
 * Scene 1 of the day→night homepage: dawn hero. Full-bleed, composes with the
 * ambient scene behind it, Totoro sits bottom-right between the hill layers.
 */
export default function HeroDawn() {
    return (
        <section
            data-section="hero"
            className="relative flex min-h-[85svh] flex-col items-center justify-center px-4 pb-24 text-center"
        >
            {/* Totoro — centered block, part of vertical flow */}
            <div className="relative mb-6 h-[220px] w-[220px] md:h-[320px] md:w-[320px] lg:h-[360px] lg:w-[360px]">
                <Suspense fallback={<TotoroLoader />}>
                    <LazyTotoro />
                </Suspense>
            </div>

            <motion.p
                {...riseIn(0.05)}
                className="mb-6 rounded-full border border-line bg-surface/60 px-4 py-2 font-rounded text-sm text-ink backdrop-blur-md"
            >
                🌿 Hello, I&apos;m a web developer based in Việt Nam 🍃
            </motion.p>

            <h1 className="font-rounded text-5xl font-bold tracking-tight text-ink md:text-7xl">
                {NAME_WORDS.map((word, i) => (
                    <motion.span key={word} {...riseIn(0.15 + i * 0.12)} className="inline-block">
                        {word}
                        {i < NAME_WORDS.length - 1 ? ' ' : ''}
                    </motion.span>
                ))}
            </h1>

            <motion.p {...riseIn(0.55)} className="mt-4 font-rounded text-lg text-ink-muted">
                Jura69 · Developer / Audiophile / Designer
            </motion.p>

            <motion.div {...riseIn(0.7)} className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <MotionRouterLink
                    to="/works"
                    className={buttonClasses('solid', 'lg')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    View My Works <IoArrowForward aria-hidden="true" />
                </MotionRouterLink>
                <motion.a
                    href="/files/CV.pdf"
                    download="TuanLoc_CV.pdf"
                    className={buttonClasses('outline', 'lg')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <IoDownloadOutline aria-hidden="true" /> Download CV
                </motion.a>
            </motion.div>

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
                <IoChevronDown />
            </motion.div>
        </section>
    )
}

import { memo } from 'react'
import { MotionConfig } from 'motion/react'
import Navbar from './navbar'
import Footer from './footer'
import AmbientScene from '../scene/ambient-scene'

interface MainProps {
    children: React.ReactNode
}

/**
 * App shell. No width wrapper here — each page owns its own container
 * (homepage is full-bleed for the scene). Landmarks stay siblings: <nav>,
 * <main> (the route content only — also what the build-time markdown twins
 * read) and <footer>. pt-18 keeps content clear of the fixed 72px navbar.
 */
const Main = memo(function Main({ children }: MainProps) {
    return (
        <MotionConfig reducedMotion="user">
            <AmbientScene />
            <Navbar />
            <main className="pt-18">{children}</main>
            <Footer />
        </MotionConfig>
    )
})

export default Main

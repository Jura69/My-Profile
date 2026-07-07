import { memo } from 'react'
import { MotionConfig } from 'motion/react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import AmbientScene from '../scene/ambient-scene'

interface MainProps {
    children: React.ReactNode
}

/**
 * App shell. No width wrapper here — each page owns its own container
 * (homepage is full-bleed for the scene). pt-16 keeps content clear of the
 * fixed navbar, matching the spacing the old Chakra Container provided.
 */
const Main = memo(function Main({ children }: MainProps) {
    return (
        <MotionConfig reducedMotion="user">
            <main className="pt-16 pb-8">
                <AmbientScene />
                <Navbar />
                {children}
                <Footer />
            </main>
        </MotionConfig>
    )
})

export default Main

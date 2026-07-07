import { Box, Container } from '@chakra-ui/react'
import { MotionConfig } from 'motion/react'
import { memo, lazy, Suspense } from 'react'
import Navbar from '../layout/navbar'
import Footer from '../layout/footer'
import TotoroLoader from '../totoro-loader'
import ScrollAmbientScene from '../scroll-ambient-scene'

// Replaces next/dynamic — React.lazy with Suspense
const LazyTotoro = lazy(() => import('../totoro'))

interface MainProps {
    children: React.ReactNode
}

const Main = memo(function Main({ children }: MainProps) {
    return (
        <MotionConfig reducedMotion="user">
            <Box as="main" pb={8}>
                <ScrollAmbientScene />
                <Navbar />
                <Container maxW="container.md" pt={16}>
                    <Suspense fallback={<TotoroLoader />}>
                        <LazyTotoro />
                    </Suspense>
                    {children}
                    <Footer />
                </Container>
            </Box>
        </MotionConfig>
    )
})

export default Main

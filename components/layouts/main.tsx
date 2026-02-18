import { Box, Container } from '@chakra-ui/react'
import { memo, lazy, Suspense } from 'react'
import { useLocation } from 'react-router'
import Navbar from '../navbar'
import Footer from '../footer'
import TotoroLoader from '../totoro-loader'

// Replaces next/dynamic — React.lazy with Suspense
const LazyTotoro = lazy(() => import('../totoro'))

interface MainProps {
    children: React.ReactNode
}

const Main = memo(function Main({ children }: MainProps) {
    const { pathname } = useLocation()

    return (
        <Box as="main" pb={8}>
            <Navbar />
            <Container maxW="container.md" pt={16}>
                <Suspense fallback={<TotoroLoader />}>
                    <LazyTotoro />
                </Suspense>
                {children}
                <Footer />
            </Container>
        </Box>
    )
})

export default Main

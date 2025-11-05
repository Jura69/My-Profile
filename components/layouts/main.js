import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import dynamic from 'next/dynamic'
import { memo } from 'react'

// Import components normally to avoid hydration issues
import Navbar from "../navbar"
import Footer from "../footer"
import TotoroLoader from "../totoro-loader"

// Only Totoro needs to be dynamic (3D content)
const LazyTotoro = dynamic(() => import('../totoro'), {
    ssr: false,
    loading: () => <TotoroLoader />
})

const Main = memo(function Main({ children }) {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Jura69's homepage" />
                <meta name="author" content="Trương Tuấn Lộc" />
                <meta name="author" content="Jura69" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <title>Jura69 - Homepage</title>
            </Head>
            <Navbar/>
            <Container maxW="container.md" pt={16}>
                <LazyTotoro />
                {children}
                <Footer/>
            </Container>
        </Box>
    );
})

export default Main

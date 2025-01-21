import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "../navbar";
import Footer from "../footer";


export default function Main({ children }) {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Jura69's homepage" />
                <meta name="author" content="Trương Tuấn Lộc" />
                <meta name="author" content="Jura69" />
                <link rel="icon" href="/public/favicon.ico" />
                <link rel="shortcut icon" href="/public/favicon.ico" type="image/x-icon" />
                <title>Jura69 - Homepage</title>
            </Head>
            <Navbar/>
            <Container maxW="container.md" pt={16}>
                {children}
                <Footer/>
            </Container>
        </Box>
    );
}

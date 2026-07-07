import { ChakraProvider, ColorModeScript, localStorageManager, useColorMode } from '@chakra-ui/react'
import { useEffect } from 'react'
import theme from '../lib/theme'

interface ChakraProps {
    children: React.ReactNode
}

/**
 * While Chakra and Tailwind coexist, Chakra colorMode is the source of truth.
 * This mirrors it onto the `.dark` class on <html> so Tailwind `dark:` variants follow.
 */
function TailwindColorModeSync() {
    const { colorMode } = useColorMode()

    useEffect(() => {
        document.documentElement.classList.toggle('dark', colorMode === 'dark')
    }, [colorMode])

    return null
}

export default function Chakra({ children }: ChakraProps) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
                <TailwindColorModeSync />
                {children}
            </ChakraProvider>
        </>
    )
}

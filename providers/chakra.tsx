import { ChakraProvider, ColorModeScript, localStorageManager } from '@chakra-ui/react'
import theme from '../lib/theme'

interface ChakraProps {
    children: React.ReactNode
}

export default function Chakra({ children }: ChakraProps) {
    return (
        <>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <ChakraProvider theme={theme} colorModeManager={localStorageManager}>
                {children}
            </ChakraProvider>
        </>
    )
}

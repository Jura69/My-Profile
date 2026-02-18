import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('#f5f0e8', '#1a1e2e')(props),
            transition: 'background-color 0.3s ease'
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#7eb77f',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        },
        baseStyle: {
            fontWeight: 'bold',
            letterSpacing: 'tight'
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            color: mode('#4a7c59', '#98D8C8')(props),
            textUnderlineOffset: 3
        })
    },
    Button: {
        baseStyle: {
            fontWeight: 'semibold',
            borderRadius: 'xl'
        }
    }
}

const fonts = {
    heading: "'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    body: "'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
}

const colors = {
    grassTeal: '#88ccca',
    ghibli: {
        forestGreen: '#7eb77f',
        deepForest: '#4a7c59',
        skyBlue: '#87CEEB',
        softPink: '#e8a0b4',
        creamYellow: '#FFF8DC',
        warmParchment: '#f5f0e8',
        nightForest: '#1a1e2e',
        mintGreen: '#98D8C8',
        lavender: '#c4b5d8',
        goldenDust: '#d4a853',
        leafGreen: '#6db86b',
        warmBrown: '#8b6f47'
    },
    skill: {
        frontend: '#6db86b',
        backend: '#5a9bd5',
        ai: '#d4a853',
        tools: '#b08fd8'
    },
    timeline: {
        creasia: '#5a9dab',
        infordation: '#6db86b',
        vnpt: '#5a9bd5',
        university: '#b08fd8'
    }
}

const config = {
    initialColorMode: 'dark' as const,
    useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme

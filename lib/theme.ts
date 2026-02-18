import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode('#f0e7db', '#202023')(props)
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
                textDecorationColor: '#525252',
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
            color: mode('#3d7aed', '#ff63c3')(props),
            textUnderlineOffset: 3
        })
    },
    Button: {
        baseStyle: {
            fontWeight: 'semibold',
            borderRadius: 'lg'
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
        skyBlue: '#87CEEB',
        softPink: '#FFB6C1',
        creamYellow: '#FFF8DC',
        mintGreen: '#98D8C8',
        lavender: '#E6E6FA'
    },
    skill: {
        frontend: '#48BB78',
        backend: '#4299E1',
        ai: '#ED8936',
        tools: '#9F7AEA'
    },
    timeline: {
        creasia: '#319795',
        infordation: '#48BB78',
        vnpt: '#4299E1',
        university: '#9F7AEA'
    }
}

const config = {
    initialColorMode: 'dark' as const,
    useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme

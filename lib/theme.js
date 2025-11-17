import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
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
    baseStyle: props => ({
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
  // Ghibli-inspired pastel colors (professional & subtle)
  ghibli: {
    forestGreen: '#7eb77f',    // Soft forest green (Totoro theme)
    skyBlue: '#87CEEB',         // Clear sky blue
    softPink: '#FFB6C1',        // Gentle pink
    creamYellow: '#FFF8DC',     // Warm cream
    mintGreen: '#98D8C8',       // Fresh mint
    lavender: '#E6E6FA'         // Soft lavender
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme

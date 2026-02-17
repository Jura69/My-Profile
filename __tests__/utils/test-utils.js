import { render } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../../lib/theme'

/**
 * Custom render function that wraps components with ChakraProvider
 * Use this instead of @testing-library/react's render for all component tests
 */
export const renderWithChakra = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'

// Override render with our custom version
export { renderWithChakra as render }

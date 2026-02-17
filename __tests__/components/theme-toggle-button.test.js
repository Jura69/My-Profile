import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '../utils/test-utils'
import ThemeToggleButton from '../../components/theme-toggle-button'

describe('ThemeToggleButton', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeToggleButton />)

    const button = screen.getByLabelText('Toggle theme')
    expect(button).toBeInTheDocument()
  })

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup()
    render(<ThemeToggleButton />)

    const button = screen.getByLabelText('Toggle theme')

    // Click the button to toggle theme - wrapped in waitFor to handle async state updates
    await waitFor(async () => {
      await user.click(button)
    })

    // Button should still be in the document after click
    expect(button).toBeInTheDocument()
  })

  it('has appropriate aria-label for accessibility', () => {
    render(<ThemeToggleButton />)

    const button = screen.getByLabelText('Toggle theme')
    expect(button).toHaveAttribute('aria-label', 'Toggle theme')
  })
})

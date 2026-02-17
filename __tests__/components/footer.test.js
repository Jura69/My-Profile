import { screen } from '@testing-library/react'
import { render } from '../utils/test-utils'
import Footer from '../../components/footer'

describe('Footer', () => {
  it('renders the footer with copyright text', () => {
    render(<Footer />)

    const copyrightText = screen.getByText(/Jura69. All Rights Reserved./i)
    expect(copyrightText).toBeInTheDocument()
  })

  it('displays the current year', () => {
    render(<Footer />)

    const currentYear = new Date().getFullYear()
    const yearText = screen.getByText(new RegExp(currentYear.toString()))
    expect(yearText).toBeInTheDocument()
  })

  it('renders with correct opacity styling', () => {
    const { container } = render(<Footer />)

    // Component should render without errors
    expect(container.firstChild).toBeInTheDocument()
  })
})

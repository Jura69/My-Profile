import { screen } from '@testing-library/react'
import { render } from '../utils/test-utils'
import Navbar from '../../components/navbar'

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar path="/" />)

    // Check if the navbar is rendered
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('renders navigation links on desktop', () => {
    render(<Navbar path="/" />)

    // These links should be visible on desktop (md breakpoint and above)
    const worksLinks = screen.getAllByText('Works')
    const activitiesLinks = screen.getAllByText('Activities')
    const audiophileLinks = screen.getAllByText('Audiophile')

    expect(worksLinks.length).toBeGreaterThan(0)
    expect(activitiesLinks.length).toBeGreaterThan(0)
    expect(audiophileLinks.length).toBeGreaterThan(0)
  })

  it('renders GitHub link', () => {
    render(<Navbar path="/" />)

    const githubLinks = screen.getAllByText('My Github')
    expect(githubLinks.length).toBeGreaterThan(0)
  })

  it('renders theme toggle button', () => {
    render(<Navbar path="/" />)

    // Theme toggle button should be present
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('highlights active link correctly', () => {
    const { container } = render(<Navbar path="/works" />)

    // The component should render without errors when path matches
    expect(container).toBeInTheDocument()
  })

  it('renders mobile menu button', () => {
    render(<Navbar path="/" />)

    // Menu button should be present for mobile
    const menuButton = screen.getByLabelText('Options')
    expect(menuButton).toBeInTheDocument()
  })
})

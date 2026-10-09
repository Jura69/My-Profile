import { useEffect, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'motion/react'
import { Link as RouterLink, useLocation } from 'react-router'
import { IoLogoGithub } from 'react-icons/io5'
import { ExternalLink, Menu } from '../icons/kit-icons-interface'
import { SpiritIcon } from '../icons/spirit-mam-den'
import IconButton from '../ui/icon-button'
import { iconButtonClasses } from '../ui/icon-button-styles'
import Container from '../ui/container'
import ThemeToggle from './theme-toggle'
import { GITHUB_URL } from '../home/home-data'
import { cn } from '../../lib/cn'

// Activities intentionally lives off-nav: it is reached from the footer and the Works
// "Off the clock" block (and its direct URL), it just does not earn a slot here.
const NAV_LINKS = [
    { href: '/', label: 'About', exact: true },
    { href: '/works', label: 'Works' },
    { href: '/audiophile', label: 'Audiophile' }
]

function useIsActive(href: string, exact?: boolean) {
    const { pathname } = useLocation()
    return exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
}

interface NavLinkProps {
    href: string
    exact?: boolean
    children: React.ReactNode
}

/** Desktop link. Accent-on-sky keeps the active state ≥ 4.5:1 while the bar is transparent. */
function NavLink({ href, exact, children }: NavLinkProps) {
    const active = useIsActive(href, exact)

    return (
        <RouterLink
            to={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'relative inline-flex min-h-11 items-center rounded-lg px-3 font-rounded text-[15px] text-ink transition-colors hover:text-accent-on-sky',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring',
                active && 'font-bold text-accent-on-sky'
            )}
        >
            {children}
            {active && (
                <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute inset-x-3 bottom-1.5 h-0.5 rounded-full bg-accent-on-sky"
                />
            )}
        </RouterLink>
    )
}

const menuItemClasses =
    'flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-lg px-3.5 font-rounded text-base font-semibold text-ink outline-none data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent'

function MobileMenuLink({ href, exact, children }: NavLinkProps) {
    const active = useIsActive(href, exact)
    return (
        <DropdownMenu.Item asChild className={cn(menuItemClasses, active && 'bg-accent-soft font-bold text-accent')}>
            <RouterLink to={href} aria-current={active ? 'page' : undefined}>
                {children}
            </RouterLink>
        </DropdownMenu.Item>
    )
}

/** Mobile navigation — Radix dropdown with the same links as the desktop bar, plus GitHub. */
function MobileMenu() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <IconButton aria-label="Open navigation menu" variant="outline" className="md:hidden">
                    <Menu className="text-xl" />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="z-50 min-w-60 rounded-2xl border border-line bg-surface-elevated p-2 shadow-paper-lift"
                >
                    {NAV_LINKS.map(link => (
                        <MobileMenuLink key={link.href} href={link.href} exact={link.exact}>
                            {link.label}
                        </MobileMenuLink>
                    ))}
                    <DropdownMenu.Separator className="my-1 h-px bg-line" />
                    <DropdownMenu.Item asChild className={menuItemClasses}>
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                            GitHub <ExternalLink aria-hidden="true" className="text-ink-muted" />
                        </a>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

/**
 * Fixed 72px bar. Transparent over the painted sky at the top of a page, solid paper once the page
 * is scrolled (no glass). The first render is unscrolled on server and client, so hydration is
 * safe; the immediate sync after mount covers deep links (/#work), restored scroll and scrolls
 * made before hydration.
 */
export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const sync = () => setScrolled(window.scrollY > 8)
        sync()
        window.addEventListener('scroll', sync, { passive: true })
        return () => window.removeEventListener('scroll', sync)
    }, [])

    return (
        <nav
            aria-label="Primary"
            className={cn(
                'fixed inset-x-0 top-0 z-20 border-b transition-colors duration-200',
                scrolled ? 'border-line bg-surface' : 'border-transparent bg-transparent'
            )}
        >
            <Container size="page" className="flex h-18 items-center justify-between gap-2">
                <RouterLink
                    to="/"
                    className="group -ml-2 flex min-h-11 items-center gap-2 rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
                >
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:scale-125">
                        <SpiritIcon />
                    </span>
                    <span className="font-rounded text-lg font-extrabold text-ink">Jura69</span>
                </RouterLink>

                <div className="flex items-center gap-1">
                    <div className="hidden items-center gap-1 md:flex">
                        {NAV_LINKS.map(link => (
                            <NavLink key={link.href} href={link.href} exact={link.exact}>
                                {link.label}
                            </NavLink>
                        ))}
                        <span aria-hidden="true" className="mx-2 h-6 w-px bg-line-strong" />
                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub profile"
                            className={iconButtonClasses('ghost', 'size-11 text-xl')}
                        >
                            <IoLogoGithub aria-hidden="true" />
                        </a>
                    </div>
                    <div className="ml-1 flex items-center gap-2">
                        <ThemeToggle />
                        <MobileMenu />
                    </div>
                </div>
            </Container>
        </nav>
    )
}

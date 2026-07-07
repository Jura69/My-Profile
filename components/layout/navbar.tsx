import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'motion/react'
import { Link as RouterLink, useLocation } from 'react-router'
import { IoLogoGithub, IoMenu } from 'react-icons/io5'
import TotoroIcon from '../icons/totoro'
import IconButton from '../ui/icon-button'
import ThemeToggle from './theme-toggle'
import { cn } from '../../lib/cn'

const GITHUB_URL = 'https://github.com/Jura69'

const NAV_LINKS = [
    { href: '/works', label: 'Works' },
    { href: '/activities', label: 'Activities' },
    { href: '/audiophile', label: 'Audiophile' }
]

interface NavLinkProps {
    href: string
    children: React.ReactNode
}

function NavLink({ href, children }: NavLinkProps) {
    const { pathname } = useLocation()
    const active = pathname === href || pathname.startsWith(`${href}/`)

    return (
        <RouterLink
            to={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
                'relative rounded-lg px-3 py-2 font-rounded text-ink transition-colors hover:text-accent',
                active && 'font-semibold text-accent'
            )}
        >
            {children}
            {active && (
                <motion.span
                    layoutId="navbar-active-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-ghibli-forest-green"
                />
            )}
        </RouterLink>
    )
}

const menuItemClasses =
    'block cursor-pointer rounded-lg px-3 py-2 font-rounded text-sm text-ink outline-none data-[highlighted]:bg-accent/10 data-[highlighted]:text-accent'

/** Mobile navigation — Radix dropdown, includes Home which desktop reaches via the logo. */
function MobileMenu() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <IconButton aria-label="Open navigation menu" variant="outline" className="md:hidden">
                    <IoMenu className="text-xl" />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="z-50 min-w-44 rounded-xl border border-line bg-surface-elevated p-1.5 shadow-lg"
                >
                    <DropdownMenu.Item asChild className={menuItemClasses}>
                        <RouterLink to="/">About</RouterLink>
                    </DropdownMenu.Item>
                    {NAV_LINKS.map(link => (
                        <DropdownMenu.Item key={link.href} asChild className={menuItemClasses}>
                            <RouterLink to={link.href}>{link.label}</RouterLink>
                        </DropdownMenu.Item>
                    ))}
                    <DropdownMenu.Item asChild className={menuItemClasses}>
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                            My Github
                        </a>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}

export default function Navbar() {
    return (
        <nav className="fixed inset-x-0 top-0 z-20 bg-surface/80 backdrop-blur-[10px]">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 p-2">
                <RouterLink to="/" className="group flex items-center gap-2 p-2">
                    <span aria-hidden="true" className="transition-transform duration-200 group-hover:scale-125">
                        <TotoroIcon />
                    </span>
                    <span className="font-rounded text-lg font-bold text-ink">Jura69</span>
                </RouterLink>

                <div className="hidden grow items-center gap-1 md:flex">
                    {NAV_LINKS.map(link => (
                        <NavLink key={link.href} href={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                    <a
                        href={GITHUB_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-rounded text-ink transition-colors hover:text-accent"
                    >
                        <IoLogoGithub /> My Github
                    </a>
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <MobileMenu />
                </div>
            </div>
        </nav>
    )
}

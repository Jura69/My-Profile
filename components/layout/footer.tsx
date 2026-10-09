import { Link as RouterLink } from 'react-router'
import { SprigLeaf } from '../icons/kit-ornaments'
import Container from '../ui/container'
import { socialLinks } from '../home/home-data'

const PAGES = [
    { to: '/', label: 'About' },
    { to: '/works', label: 'Works' },
    { to: '/audiophile', label: 'Audiophile' },
    { to: '/activities', label: 'Activities' }
]

const ELSEWHERE = socialLinks.filter(link => ['GitHub', 'LinkedIn', 'Email'].includes(link.name))

const linkClasses =
    'inline-flex min-h-8 items-center rounded font-rounded text-[15px] font-semibold text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring'

/** Site footer on sunken paper: who this is, page navigation and elsewhere links, copyright. */
export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="border-t border-line bg-surface-sunken">
            <Container size="page" className="py-12">
                <div className="flex flex-wrap justify-between gap-x-12 gap-y-8">
                    <div className="max-w-[32ch] basis-64">
                        <p className="flex items-center gap-2.5 font-rounded text-lg font-extrabold text-ink">
                            <SprigLeaf aria-hidden="true" className="text-accent" /> Jura69
                        </p>
                        <p className="mt-2 font-rounded text-sm leading-relaxed text-ink-muted">
                            Trương Tuấn Lộc — full-stack developer building AI agent platforms.
                        </p>
                    </div>

                    <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-8 sm:flex">
                        <div>
                            <p className="eyebrow text-ink-muted">Pages</p>
                            <ul className="mt-2.5 flex list-none flex-col gap-0.5 p-0">
                                {PAGES.map(page => (
                                    <li key={page.to}>
                                        <RouterLink to={page.to} className={linkClasses}>
                                            {page.label}
                                        </RouterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="eyebrow text-ink-muted">Elsewhere</p>
                            <ul className="mt-2.5 flex list-none flex-col gap-0.5 p-0">
                                {ELSEWHERE.map(link => {
                                    const external = link.href.startsWith('http')
                                    return (
                                        <li key={link.name}>
                                            <a
                                                href={link.href}
                                                className={linkClasses}
                                                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Year is baked in at build time; a client in a newer year keeps it until the next build */}
                <p
                    className="mt-10 border-t border-line-strong pt-5 font-rounded text-sm text-ink-muted"
                    suppressHydrationWarning
                >
                    &copy; {year} Jura69. All rights reserved.
                </p>
            </Container>
        </footer>
    )
}

import { Link as RouterLink } from 'react-router'
import { IoChevronForward } from 'react-icons/io5'
import SEO from '../seo'
import { buttonClasses } from '../ui/button-styles'

/**
 * 404 page — a Ghibli-lite "lost in the forest" moment with a small forest
 * spirit mark and a route home. Rendered by the `*` route in app.tsx.
 */
export default function NotFound() {
    return (
        <>
        <SEO title="Page Not Found | Trương Tuấn Lộc" description="This page could not be found." />
        <section className="w-full px-4 py-24">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <svg
                    viewBox="0 0 96 96"
                    className="h-24 w-24 text-accent"
                    fill="none"
                    aria-hidden="true"
                >
                    {/* rounded forest-spirit body */}
                    <path
                        d="M48 14c-15 0-26 11-26 27v20a12 12 0 0 0 12 12h28a12 12 0 0 0 12-12V41c0-16-11-27-26-27Z"
                        fill="currentColor"
                        opacity="0.18"
                    />
                    <path
                        d="M48 14c-15 0-26 11-26 27v20a12 12 0 0 0 12 12h28a12 12 0 0 0 12-12V41c0-16-11-27-26-27Z"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    />
                    {/* ears */}
                    <path d="M38 18l-4-9 9 4M58 18l4-9-9 4" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    {/* eyes */}
                    <circle cx="40" cy="44" r="3.2" fill="currentColor" />
                    <circle cx="56" cy="44" r="3.2" fill="currentColor" />
                    {/* smile */}
                    <path d="M42 54c2 2.5 10 2.5 12 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                <p className="mt-6 font-rounded text-5xl font-bold text-ink">404</p>
                <h1 className="mt-2 font-rounded text-xl font-bold text-ink">Lost in the forest?</h1>
                <p className="mt-3 font-rounded text-base leading-relaxed text-ink-muted">
                    This path doesn&apos;t lead anywhere. Let&apos;s head back to familiar ground.
                </p>

                <RouterLink to="/" className={`${buttonClasses('solid', 'md')} mt-8`}>
                    Back home <IoChevronForward aria-hidden="true" />
                </RouterLink>
            </div>
        </section>
        </>
    )
}

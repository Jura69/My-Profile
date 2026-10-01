import { Link as RouterLink } from 'react-router'
import { ChevronRight } from '../icons/kit-icons-interface'
import SEO from '../seo'
import { buttonClasses } from '../ui/button-styles'
import PageBanner from '../ui/page-banner'

/**
 * 404 page — a Ghibli-lite "lost in the forest" moment with a painted day/night
 * forest-path banner and a route home. Rendered by the `*` route in app.tsx.
 */
export default function NotFound() {
    return (
        <>
            <SEO title="Page Not Found | Trương Tuấn Lộc" description="This page could not be found." />
            <section className="w-full px-4 py-16">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <PageBanner
                        page="404"
                        alt="Painted forest path with a wooden signpost"
                        sizes="(min-width:480px) 448px, 100vw"
                        className="w-full"
                    />

                    <p className="mt-6 font-rounded text-5xl font-bold text-ink">404</p>
                    <h1 className="mt-2 font-rounded text-xl font-bold text-ink">Lost in the forest?</h1>
                    <p className="mt-3 font-rounded text-base leading-relaxed text-ink-muted">
                        This path doesn&apos;t lead anywhere. Let&apos;s head back to familiar ground.
                    </p>

                    <RouterLink to="/" className={`${buttonClasses('solid', 'md')} mt-8`}>
                        Back home <ChevronRight aria-hidden="true" />
                    </RouterLink>
                </div>
            </section>
        </>
    )
}

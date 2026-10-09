import type { ReactNode } from 'react'
import type { IconComponent } from '../icons/kit-icon-base'
import Breadcrumb, { type Crumb } from './breadcrumb'
import Container from './container'
import PageBanner, { type BannerPage } from './page-banner'
import { coverSrcSet, type Project } from '../works/works-data'

type PageHeaderMedia =
    | { kind: 'banner'; page: BannerPage; alt: string; imgClassName?: string }
    | { kind: 'cover'; project: Project }

interface PageHeaderProps {
    crumbs: Crumb[]
    title: ReactNode
    eyebrow?: ReactNode
    lead?: ReactNode
    ornament?: IconComponent
    /** Painted banner (listing pages) or project cover (works detail); omit for a plain header. */
    media?: PageHeaderMedia
}

/**
 * The one page header for listing and detail pages: breadcrumb, then the painting with the eyebrow
 * and H1 overlaid on the scrim (or a plain eyebrow + H1 when there is no painting), then the lead.
 * Always the page-title scale and the page container, so every page opens the same way.
 */
export default function PageHeader({ crumbs, title, eyebrow, lead, ornament: Ornament, media }: PageHeaderProps) {
    return (
        <Container size="page" className="pt-8 md:pt-14 short:pt-6">
            <header>
                <Breadcrumb items={crumbs} />
                {media?.kind === 'banner' && (
                    <PageBanner
                        page={media.page}
                        alt={media.alt}
                        imgClassName={media.imgClassName}
                        title={title}
                        eyebrow={eyebrow}
                        ornament={Ornament}
                        titleSize="page"
                        className="mt-3"
                    />
                )}
                {media?.kind === 'cover' && (
                    <PageBanner
                        image={{
                            src: `${media.project.cover}-1280.webp`,
                            srcSet: coverSrcSet(media.project.cover),
                            width: 1280,
                            height: 720,
                            alt: media.project.coverAlt,
                            position: media.project.coverPosition
                        }}
                        // Phones get the 640w cover (it is the page's LCP; 1280w is 2.3× the bytes for a
                        // soft gouache painting under a scrim), tablets and desktops the 1280w one.
                        sizes="(min-width:1100px) 1036px, (min-width:640px) 100vw, 320px"
                        title={title}
                        eyebrow={eyebrow}
                        ornament={Ornament}
                        aspect="cover"
                        titleSize="page"
                        className="mt-3"
                    />
                )}
                {!media && (
                    <div className="mt-6">
                        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                        <h1 className="mt-2 font-rounded text-page-title font-extrabold text-ink">
                            {title}
                            {Ornament && <Ornament className="ml-3 inline-block size-[0.8em] align-[-0.1em] text-accent" />}
                        </h1>
                    </div>
                )}
                {lead && <p className="mt-5 max-w-[64ch] font-rounded text-lead text-ink-muted">{lead}</p>}
            </header>
        </Container>
    )
}

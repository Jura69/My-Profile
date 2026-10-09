import { cn } from '../../lib/cn'

type ContainerSize = 'prose' | 'page'

const sizeClasses: Record<ContainerSize, string> = {
    /** Reading column (768px) — the legacy Chakra `container.md` width. */
    prose: 'max-w-3xl px-4',
    /** The site column (1100px): navbar, footer, home sections, listing and detail pages. */
    page: 'max-w-[1100px] px-4 sm:px-6 lg:px-8'
}

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: ContainerSize
    children: React.ReactNode
}

/** Centered content column with the side gutter. One primitive for every page width. */
export default function Container({ size = 'prose', className, children, ...props }: ContainerProps) {
    return (
        <div className={cn('mx-auto w-full', sizeClasses[size], className)} {...props}>
            {children}
        </div>
    )
}

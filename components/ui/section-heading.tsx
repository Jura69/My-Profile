import { cn } from '../../lib/cn'

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    as?: 'h2' | 'h3'
    children: React.ReactNode
}

/** Section title — mirrors the legacy Chakra `section-title` heading variant. */
export default function SectionHeading({ as: Tag = 'h3', className, children, ...props }: SectionHeadingProps) {
    return (
        <Tag
            className={cn(
                'mt-3 mb-4 font-rounded text-xl font-bold tracking-tight text-ink underline decoration-ghibli-forest-green decoration-4 underline-offset-[6px]',
                className
            )}
            {...props}
        >
            {children}
        </Tag>
    )
}

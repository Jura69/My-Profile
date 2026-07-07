import { cn } from '../../lib/cn'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

/** Content column — mirrors the legacy Chakra `container.md` width (768px). */
export default function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div className={cn('mx-auto w-full max-w-3xl px-4', className)} {...props}>
            {children}
        </div>
    )
}

import { cn } from '../../lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

/** Elevated surface panel with Ghibli-warm border. */
export default function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn('rounded-2xl border border-line bg-surface-elevated p-5 shadow-sm', className)}
            {...props}
        >
            {children}
        </div>
    )
}

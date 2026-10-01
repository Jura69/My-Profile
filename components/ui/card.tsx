import { cn } from '../../lib/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

/** Elevated paper panel: warm border, card-paper grain overlay, paper shadow. */
export default function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn('paper-grain rounded-2xl border border-line bg-surface-elevated p-5 shadow-paper', className)}
            {...props}
        >
            {children}
        </div>
    )
}

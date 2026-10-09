import { cn } from '../../lib/cn'

/**
 * Hero proof stats. These are deliberate floors approved by the owner, not live counts: "10+"
 * rounds down the 12 enterprise entries in works-data.ts and "15+" the 16 projects, so they stay
 * honest without a sync each time a project lands.
 */
const STATS = [
    { value: '2+ yrs', label: 'building software' },
    { value: '15+', label: 'projects shipped' },
    { value: '10+', label: 'enterprise systems' }
]

/**
 * A <dl> where each value shows above its label (column-reverse keeps label-then-value DOM order,
 * so screen readers and the markdown twin read "building software: 2+ yrs").
 */
export default function HeroProofStats({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <dl className={cn('grid grid-cols-3 gap-4 sm:flex sm:gap-0', className)} style={style}>
            {STATS.map(stat => (
                <div
                    key={stat.label}
                    className="flex flex-col-reverse sm:border-r sm:border-line-strong sm:pr-7 sm:mr-7 sm:last:mr-0 sm:last:border-r-0 sm:last:pr-0"
                >
                    <dt className="font-rounded text-[13px] leading-snug font-bold text-ink-muted">
                        {stat.label}
                        <span className="sr-only">: </span>
                    </dt>
                    <dd className="font-rounded text-[28px] leading-tight font-extrabold text-ink tabular-nums sm:text-4xl">
                        {stat.value}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

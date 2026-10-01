import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../providers/use-theme'
import { useScene } from '../scene/use-scene'
import { SpiritIllustration } from '../icons/spirit-mam-den'
import { cn } from '../../lib/cn'
import { createSpiritStage, type SpiritStage } from './spirit-stage'

type Status = 'loading' | 'ready' | 'failed'

/**
 * React mount for the hero's 3D Mầm Đèn (loaded only via React.lazy from HeroDawn, so three stays
 * out of the entry chunk). The 2D illustration holds the cell until the stage's first frame, then the
 * canvas fades in over it; any WebGL failure swaps back to the illustration for good.
 * Decorative: the canvas is aria-hidden with no tab stop; the pointer reaction is a bonus, not a control.
 */
export default function SpiritCanvas() {
    const { mode } = useTheme()
    const { reducedMotion } = useScene()
    const hostRef = useRef<HTMLDivElement>(null)
    const stageRef = useRef<SpiritStage | null>(null)
    const [status, setStatus] = useState<Status>('loading')
    // Initial values only: later changes reach the stage through the setter effects below.
    const initial = useRef({ dark: mode === 'dark', reducedMotion })

    useEffect(() => {
        const host = hostRef.current
        if (!host) return
        let stage: SpiritStage
        try {
            stage = createSpiritStage(host, {
                ...initial.current,
                onReady: () => setStatus(s => (s === 'failed' ? s : 'ready')),
                onFail: () => setStatus('failed')
            })
        } catch {
            setStatus('failed') // no WebGL2 / context creation refused
            return
        }
        stageRef.current = stage
        return () => {
            stageRef.current = null
            stage.dispose()
        }
    }, [])

    // A failed stage is torn down at once (its host div unmounts); the unmount cleanup is then a no-op.
    useEffect(() => {
        if (status === 'failed') stageRef.current?.dispose()
    }, [status])
    useEffect(() => stageRef.current?.setDark(mode === 'dark'), [mode])
    useEffect(() => stageRef.current?.setReducedMotion(reducedMotion), [reducedMotion])

    if (status === 'failed') return <SpiritIllustration />

    return (
        <div className="relative h-full w-full" onPointerDown={() => stageRef.current?.react()}>
            {/* Stays mounted so the swap is a crossfade, never an empty cell between the two */}
            <SpiritIllustration
                className={cn(
                    'absolute inset-0 h-full w-full transition-opacity duration-500 motion-reduce:transition-none',
                    status === 'ready' && 'opacity-0'
                )}
            />
            <div
                ref={hostRef}
                className={cn(
                    'absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none',
                    status === 'ready' ? 'opacity-100' : 'opacity-0'
                )}
            />
        </div>
    )
}

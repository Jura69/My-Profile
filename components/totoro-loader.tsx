import { forwardRef } from 'react'

/** Spinner shown while the Totoro GLB streams in. */
export const TotoroSpinner = () => (
    <span
        role="status"
        aria-label="Loading 3D model"
        className="absolute top-1/2 left-1/2 -mt-5 -ml-5 inline-block size-10 animate-spin rounded-full border-4 border-line border-t-accent"
    />
)

/**
 * Mount target for the Three.js canvas. Fills whatever slot the parent
 * provides (the hero composition owns the sizing).
 */
export const TotoroContainer = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(({ children }, ref) => (
    <div ref={ref} className="relative h-full w-full">
        {children}
    </div>
))
TotoroContainer.displayName = 'TotoroContainer'

const Loader = () => (
    <TotoroContainer>
        <TotoroSpinner />
    </TotoroContainer>
)

export default Loader

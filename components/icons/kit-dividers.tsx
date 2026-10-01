import type { CSSProperties, ReactNode } from 'react'

/** Stretchable hairline dividers (viewBox 240x24). Path data copied from design/ui-kit-review. */

type DividerProps = { className?: string; style?: CSSProperties; 'aria-hidden'?: boolean | 'true' | 'false' }

/** Shared frame: width follows the parent, strokes stay 1.75px when stretched. */
const DividerFrame = ({
    className,
    style,
    'aria-hidden': ariaHidden = true,
    children
}: DividerProps & { children: ReactNode }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 240 24"
        preserveAspectRatio="none"
        width="100%"
        height={12}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        style={style}
        aria-hidden={ariaHidden}
    >
        {children}
    </svg>
)

export const DividerVine = (props: DividerProps) => (
    <DividerFrame {...props}>
        <path
            d="M 9.7 12.2 C 30.8 17.4 50.3 17.5 70.1 11.8 C 90.2 6.8 111.0 7.0 130.1 12.0 C 149.9 17.3 169.1 17.1 189.9 11.9 C 210.6 7.3 223.4 6.5 229.8 12.2 M 40.0 16.1 C 42.8 20.2 46.7 21.3 49.9 18.0 C 45.5 14.4 42.6 14.8 40.0 16.1 M 100.0 8.2 C 103.7 4.4 106.0 3.7 109.9 5.9 C 105.0 8.4 102.3 9.4 100.0 8.2 M 160.1 16.1 C 163.6 19.6 167.1 20.7 170.0 18.1 C 165.3 16.3 161.8 15.6 160.1 16.1 M 219.6 8.0 C 223.8 4.5 226.0 3.1 229.8 6.2 C 225.7 9.2 222.2 9.5 219.6 8.0"
            vectorEffect="non-scaling-stroke"
        />
    </DividerFrame>
)

export const DividerBrush = (props: DividerProps) => (
    <DividerFrame {...props}>
        <path
            d="M 10.1 12.2 C 40.0 7.2 200.7 7.9 230.1 11.9 C 199.2 15.9 40.0 15.5 10.1 12.2"
            vectorEffect="non-scaling-stroke"
        />
    </DividerFrame>
)

export const DividerFireflyTrail = (props: DividerProps) => (
    <DividerFrame {...props}>
        <path
            d="M 10.2 12.0 C 43.5 5.8 79.7 7.3 120.0 12.1 C 159.2 17.9 196.5 17.4 230.1 11.8 M 40.1 10.1 C 39.3 10.0 38.7 10.3 38.2 10.9 C 37.9 12.1 37.2 12.5 38.5 13.0 C 39.3 13.4 39.5 13.7 40.2 14.1 C 39.8 13.2 42.0 13.3 41.4 13.2 C 40.9 12.3 41.8 11.4 41.8 11.0 C 41.5 10.3 40.9 10.0 40.1 10.1 M 100.2 10.1 C 100.0 10.0 98.7 11.3 98.4 11.3 C 97.7 11.8 97.5 12.4 98.2 13.0 C 98.2 13.3 99.1 13.3 100.1 14.1 C 100.8 14.3 101.4 14.0 101.7 13.3 C 102.3 11.9 102.3 12.8 101.5 11.2 C 101.1 11.1 101.1 10.0 100.2 10.1 M 159.8 9.9 C 159.9 11.2 159.2 11.5 158.3 11.0 C 157.5 12.0 158.2 12.1 158.5 12.9 C 158.6 13.9 159.0 13.8 160.1 14.1 C 159.9 14.1 161.3 13.5 161.8 13.1 C 162.3 12.1 161.2 11.0 162.0 11.2 C 161.0 10.8 160.6 10.5 159.8 9.9 M 200.3 10.1 C 199.5 10.0 198.9 10.3 198.5 11.0 C 198.7 11.4 198.4 12.8 197.9 13.0 C 198.9 13.2 199.1 13.8 199.9 14.1 C 201.3 14.2 201.8 14.2 202.0 13.4 C 201.5 12.7 201.3 12.0 201.6 11.3 C 201.6 10.3 200.7 9.9 200.3 10.1"
            strokeDasharray="2 4"
            vectorEffect="non-scaling-stroke"
        />
        <path
            d="M 22.2 6.2 c 0.1 0.0 0.2 0.0 0.3 0.0 M 67.9 17.7 c 0.1 0.0 0.2 0.0 0.3 0.0 M 102.1 6.3 c 0.1 0.0 0.2 0.0 0.3 0.0 M 142.3 17.6 c 0.1 0.0 0.2 0.0 0.3 0.0 M 182.2 6.1 c 0.1 0.0 0.2 0.0 0.3 0.0 M 222.2 18.1 c 0.1 0.0 0.2 0.0 0.3 0.0"
            vectorEffect="non-scaling-stroke"
        />
    </DividerFrame>
)

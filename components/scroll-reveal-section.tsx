import { useRef, useEffect, useState, type ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'

const MotionBox = motion(Box)

interface ScrollRevealSectionProps {
    children: ReactNode
    sectionName: string
    delay?: number
}

/**
 * Scroll-aware section wrapper that:
 * 1. Registers `data-section` for scroll tracking
 * 2. Reveals content with a 3D depth animation when scrolled into view
 */
const ScrollRevealSection = ({ children, sectionName, delay = 0 }: ScrollRevealSectionProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-60px' })

    return (
        <MotionBox
            ref={ref}
            data-section={sectionName}
            mb={6}
            initial={{ opacity: 0, y: 30, rotateX: 4, scale: 0.98 }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                    : { opacity: 0, y: 30, rotateX: 4, scale: 0.98 }
            }
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
            {children}
        </MotionBox>
    )
}

export default ScrollRevealSection

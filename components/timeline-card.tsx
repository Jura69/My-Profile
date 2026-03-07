import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface TimelineCardProps {
    children: React.ReactNode
    color?: string
    delay?: number
    isLast?: boolean
}

/**
 * Timeline card — just the content card, without CSS timeline track.
 * The track is now handled by Timeline3DPath canvas.
 */
const TimelineCard = ({ children, color = '#48BB78', delay = 0, isLast = false }: TimelineCardProps) => {
    const cardBg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')

    return (
        <MotionBox
            data-timeline-card
            mb={isLast ? 0 : 8}
            initial={{ opacity: 0, x: 30, rotateY: -3 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ perspective: '1000px' }}
        >
            <MotionBox
                p={5}
                borderRadius="xl"
                bg={cardBg}
                border="1px solid"
                borderColor={useColorModeValue(`${color}30`, `${color}20`)}
                css={{
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)'
                }}
                position="relative"
                whileHover={{
                    y: -4,
                    boxShadow: `0 12px 32px ${color}15, 0 0 0 1px ${color}10`,
                    transition: { duration: 0.25, ease: 'easeOut' }
                }}
                _before={{
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '12px',
                    bottom: '12px',
                    width: '3px',
                    borderRadius: 'full',
                    bg: color,
                    opacity: 0.6,
                    transition: 'opacity 0.3s ease'
                }}
                _hover={{
                    _before: {
                        opacity: 1
                    }
                }}
            >
                {children}
            </MotionBox>
        </MotionBox>
    )
}

export default TimelineCard

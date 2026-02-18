import { Box, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface TimelineCardProps {
    children: React.ReactNode
    color?: string
    delay?: number
    isLast?: boolean
}

const TimelineCard = ({ children, color = '#48BB78', delay = 0, isLast = false }: TimelineCardProps) => {
    const cardBg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')
    const dotBg = useColorModeValue(color, color)
    const lineBg = useColorModeValue('gray.200', 'whiteAlpha.200')

    return (
        <MotionBox
            display="flex"
            gap={4}
            mb={isLast ? 0 : 8}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Timeline Track */}
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minW="20px"
                pt="6px"
            >
                {/* Dot */}
                <MotionBox
                    w="12px"
                    h="12px"
                    borderRadius="full"
                    bg={dotBg}
                    boxShadow={`0 0 0 4px ${color}25`}
                    flexShrink={0}
                    animate={{
                        boxShadow: [
                            `0 0 0 4px ${color}25`,
                            `0 0 0 8px ${color}15`,
                            `0 0 0 4px ${color}25`
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                {/* Line */}
                {!isLast && (
                    <Box
                        w="2px"
                        flex="1"
                        mt={2}
                        bgGradient={`linear(to-b, ${color}, ${lineBg})`}
                        borderRadius="full"
                    />
                )}
            </Box>

            {/* Card */}
            <MotionBox
                flex="1"
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
                    boxShadow: `0 12px 40px ${color}20, 0 0 0 1px ${color}15`,
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

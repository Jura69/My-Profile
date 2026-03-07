import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { type IconType } from 'react-icons'

const MotionBox = motion(Box)

interface SkillCardProps {
    icon: IconType
    label: string
    color: string
    delay?: number
}

/**
 * Skill card with 3D pop-in animation on scroll and hover depth effect.
 */
const SkillCard = ({ icon: Icon, label, color, delay = 0 }: SkillCardProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: '-30px' })

    const bg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')
    const borderColor = useColorModeValue(`${color}30`, `${color}20`)
    const hoverShadow = `0 12px 28px ${color}30, 0 0 0 1px ${color}20`
    const iconColor = color

    return (
        <MotionBox
            ref={ref}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            p={4}
            borderRadius="2xl"
            bg={bg}
            border="1px solid"
            borderColor={borderColor}
            css={{
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                perspective: '800px',
                transformStyle: 'preserve-3d'
            }}
            initial={{ opacity: 0, y: 32, scale: 0.85, rotateX: 15 }}
            animate={
                isInView
                    ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                    : { opacity: 0, y: 32, scale: 0.85, rotateX: 15 }
            }
            transition={{
                duration: 0.55,
                delay: isInView ? delay : 0,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
                y: -8,
                scale: 1.06,
                rotateX: -2,
                boxShadow: hoverShadow,
                transition: { duration: 0.25, ease: 'easeOut' }
            }}
            whileTap={{ scale: 0.97 }}
            cursor="pointer"
            position="relative"
            overflow="hidden"
            _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                bgGradient: `linear(to-r, transparent, ${color}, transparent)`,
                opacity: 0,
                transition: 'opacity 0.3s ease'
            }}
            _hover={{
                _before: {
                    opacity: 1
                }
            }}
        >
            {/* Icon with 3D lift on hover */}
            <MotionBox
                as={Icon}
                boxSize={6}
                color={iconColor}
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ translateY: -4, scale: 1.15 }}
                transition={{ duration: 0.2 }}
            />
            <Text
                fontSize="xs"
                fontWeight="semibold"
                textAlign="center"
                lineHeight="short"
                letterSpacing="wide"
            >
                {label}
            </Text>
        </MotionBox>
    )
}

export default SkillCard

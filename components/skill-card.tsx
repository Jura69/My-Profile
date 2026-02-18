import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { type IconType } from 'react-icons'

const MotionBox = motion(Box)

interface SkillCardProps {
    icon: IconType
    label: string
    color: string
    delay?: number
}

const SkillCard = ({ icon: Icon, label, color, delay = 0 }: SkillCardProps) => {
    const bg = useColorModeValue('whiteAlpha.700', 'whiteAlpha.100')
    const borderColor = useColorModeValue(`${color}30`, `${color}20`)
    const hoverShadow = `0 8px 24px ${color}25, 0 0 0 1px ${color}15`
    const iconColor = color

    return (
        <MotionBox
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
                WebkitBackdropFilter: 'blur(12px)'
            }}
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.5,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
                y: -6,
                scale: 1.05,
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
            <Box
                as={Icon}
                boxSize={6}
                color={iconColor}
                transition="transform 0.3s ease"
                _groupHover={{ transform: 'scale(1.1)' }}
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

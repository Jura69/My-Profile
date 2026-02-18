import { Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBadge = motion(Badge)

interface AnimatedBadgeProps {
    children: React.ReactNode
    colorScheme?: string
    delay?: number
    [key: string]: unknown
}

const AnimatedBadge = ({ children, colorScheme, delay = 0, ...props }: AnimatedBadgeProps) => {
    return (
        <MotionBadge
            colorScheme={colorScheme}
            p={2}
            borderRadius="md"
            textAlign="center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay, ease: [0.34, 1.56, 0.64, 1] }}
            whileHover={{ scale: 1.1, y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            cursor="pointer"
            {...props}
        >
            {children}
        </MotionBadge>
    )
}

export default AnimatedBadge

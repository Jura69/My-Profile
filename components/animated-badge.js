import { Badge } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBadge = motion(Badge)

const AnimatedBadge = ({ children, colorScheme, delay = 0, ...props }) => {
  return (
    <MotionBadge
      colorScheme={colorScheme}
      p={2}
      borderRadius="md"
      textAlign="center"
      // Entrance animation with delay
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay, // Delay only for initial entrance
        ease: [0.34, 1.56, 0.64, 1]
      }}
      // Hover animation
      whileHover={{
        scale: 1.1,
        y: -4
      }}
      whileTap={{
        scale: 0.95
      }}
      cursor="pointer"
      // CSS transition for instant return (bypasses Framer Motion delay)
      style={{
        transition: 'transform 0.1s ease-out'
      }}
      {...props}
    >
      {children}
    </MotionBadge>
  )
}

export default AnimatedBadge

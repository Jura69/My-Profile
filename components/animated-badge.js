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
      // Hover animation - instant trigger, no delay
      whileHover={{
        scale: 1.1,
        y: -4,
        transition: {
          duration: 0,
          delay: 0 // NO hover delay
        }
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0,
          delay: 0
        }
      }}
      cursor="pointer"
      // CSS for instant hover and return
      style={{
        transition: 'transform 0.1s ease-out',
        willChange: 'transform' // Optimize for hover
      }}
      {...props}
    >
      {children}
    </MotionBadge>
  )
}

export default AnimatedBadge

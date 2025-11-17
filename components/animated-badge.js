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
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay, // Delay ONLY for initial entrance
          ease: [0.34, 1.56, 0.64, 1]
        }
      }}
      // Hover animation - instant trigger and return
      whileHover={{
        scale: 1.1,
        y: -4,
        transition: {
          duration: 0.15, // Fast smooth hover
          delay: 0,
          ease: "easeOut"
        }
      }}
      // Default transition for ALL other state changes (including un-hover)
      transition={{
        duration: 0.15, // Fast return, NO delay
        ease: "easeOut"
      }}
      whileTap={{
        scale: 0.95
      }}
      cursor="pointer"
      {...props}
    >
      {children}
    </MotionBadge>
  )
}

export default AnimatedBadge

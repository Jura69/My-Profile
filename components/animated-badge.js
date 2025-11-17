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
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay,
          ease: [0.34, 1.56, 0.64, 1] // Spring-like easing for entrance
        }
      }}
      whileHover={{
        scale: 1.1,
        y: -4,
        transition: {
          type: "tween",
          duration: 0.15,
          ease: "easeOut"
        }
      }}
      whileTap={{
        scale: 0.95,
        transition: {
          duration: 0.1
        }
      }}
      // Fast return to normal when hover ends
      transition={{
        type: "tween",
        duration: 0.2,
        ease: "easeOut"
      }}
      cursor="pointer"
      {...props}
    >
      {children}
    </MotionBadge>
  )
}

export default AnimatedBadge

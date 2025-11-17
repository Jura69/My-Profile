import { Badge } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

const MotionBadge = motion(Badge)

const AnimatedBadge = ({ children, colorScheme, delay = 0, ...props }) => {
  const controls = useAnimation()

  useEffect(() => {
    // Run entrance animation with delay, then set resting state with NO delay
    const runAnimation = async () => {
      // Entrance with delay
      await controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.4,
          delay, // Delay ONLY for entrance
          ease: [0.34, 1.56, 0.64, 1]
        }
      })
      // After entrance, set resting state with fast transition (for un-hover)
      controls.set({
        opacity: 1,
        scale: 1,
        y: 0
      })
    }
    runAnimation()
  }, [controls, delay])

  return (
    <MotionBadge
      colorScheme={colorScheme}
      p={2}
      borderRadius="md"
      textAlign="center"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={controls}
      // Hover - instant and fast
      whileHover={{
        scale: 1.1,
        y: -4,
        transition: {
          duration: 0.15,
          ease: "easeOut"
        }
      }}
      // Un-hover transition - fast, NO delay
      transition={{
        duration: 0.15,
        ease: "easeOut"
      }}
      whileTap={{ scale: 0.95 }}
      cursor="pointer"
      {...props}
    >
      {children}
    </MotionBadge>
  )
}

export default AnimatedBadge

import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

// Subtle floating animation for Totoro container and other elements
const FloatingBox = ({ children, ...props }) => {
  return (
    <MotionBox
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default FloatingBox

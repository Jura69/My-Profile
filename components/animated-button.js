import { Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const AnimatedButton = ({ children, ...props }) => {
  return (
    <MotionButton
      whileHover={{
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
      {...props}
    >
      {children}
    </MotionButton>
  )
}

export default AnimatedButton

import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface FloatingBoxProps {
    children: React.ReactNode
    [key: string]: unknown
}

const FloatingBox = ({ children, ...props }: FloatingBoxProps) => {
    return (
        <MotionBox
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            {...props}
        >
            {children}
        </MotionBox>
    )
}

export default FloatingBox

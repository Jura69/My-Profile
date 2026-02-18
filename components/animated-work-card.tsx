import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface AnimatedWorkCardProps {
    children: React.ReactNode
    delay?: number
}

const AnimatedWorkCard = ({ children, delay = 0 }: AnimatedWorkCardProps) => {
    return (
        <MotionBox
            mb={6}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            whileHover={{ x: 8, transition: { duration: 0.3 } }}
        >
            {children}
        </MotionBox>
    )
}

export default AnimatedWorkCard

import { Button, ButtonProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

interface AnimatedButtonProps extends ButtonProps {
    children: React.ReactNode
    to?: string
}

const AnimatedButton = ({ children, ...props }: AnimatedButtonProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            style={{ display: 'inline-block' }}
        >
            <Button {...props}>
                {children}
            </Button>
        </motion.div>
    )
}

export default AnimatedButton

import { Box, Heading, SimpleGrid, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

interface SkillCategoryProps {
    title: string
    color: string
    children: React.ReactNode
    delay?: number
}

const SkillCategory = ({ title, color, children, delay = 0 }: SkillCategoryProps) => {
    const headingColor = useColorModeValue('gray.700', 'gray.200')

    return (
        <MotionBox
            mb={6}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        >
            <Box
                display="flex"
                alignItems="center"
                gap={3}
                mb={4}
            >
                <Box
                    w="4px"
                    h="24px"
                    borderRadius="full"
                    bg={color}
                    boxShadow={`0 0 8px ${color}60`}
                />
                <Heading
                    as="h4"
                    fontSize={15}
                    fontWeight="bold"
                    color={headingColor}
                    textTransform="uppercase"
                    letterSpacing="wider"
                >
                    {title}
                </Heading>
            </Box>
            <SimpleGrid columns={[2, 3, 4]} gap={3}>
                {children}
            </SimpleGrid>
        </MotionBox>
    )
}

export default SkillCategory

import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import { memo, useState, useEffect } from 'react'

const Footer = memo(() => {
    const [year, setYear] = useState(2024)
    const treeFill = useColorModeValue('#7eb77f', '#4a6741')
    const textColor = useColorModeValue('gray.600', 'gray.400')

    useEffect(() => {
        setYear(new Date().getFullYear())
    }, [])

    return (
        <Box textAlign="center" mt={8}>
            {/* Forest silhouette divider */}
            <Box mb={3} opacity={0.35}>
                <svg
                    viewBox="0 0 400 40"
                    width="100%"
                    height="40"
                    preserveAspectRatio="xMidYMax meet"
                    style={{ maxWidth: '400px', margin: '0 auto', display: 'block' }}
                >
                    {/* Trees - left group */}
                    <polygon points="30,40 40,8 50,40" fill={treeFill} />
                    <polygon points="45,40 55,14 65,40" fill={treeFill} />
                    <polygon points="20,40 32,18 44,40" fill={treeFill} />
                    {/* Trees - center group */}
                    <polygon points="150,40 162,5 174,40" fill={treeFill} />
                    <polygon points="165,40 175,12 185,40" fill={treeFill} />
                    <polygon points="180,40 195,2 210,40" fill={treeFill} />
                    <polygon points="205,40 215,10 225,40" fill={treeFill} />
                    <polygon points="140,40 155,15 170,40" fill={treeFill} />
                    {/* Trees - right group */}
                    <polygon points="330,40 342,10 354,40" fill={treeFill} />
                    <polygon points="350,40 360,6 370,40" fill={treeFill} />
                    <polygon points="360,40 372,16 384,40" fill={treeFill} />
                    {/* Ground line */}
                    <rect x="0" y="38" width="400" height="2" fill={treeFill} rx="1" />
                </svg>
            </Box>
            <Text opacity={0.5} fontSize="sm" color={textColor}>
                🍃 &copy; {year} Jura69. All Rights Reserved. 🌿
            </Text>
        </Box>
    )
})

export default Footer

import { Box, useColorModeValue } from '@chakra-ui/react'
import { memo, useMemo } from 'react'
import { keyframes } from '@emotion/react'

const float = keyframes`
  0% {
    transform: translateY(100vh) translateX(0) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translateY(90vh) translateX(10px) scale(1);
  }
  90% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-10vh) translateX(-20px) scale(0.3);
    opacity: 0;
  }
`

const drift = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(15px); }
  50% { transform: translateX(-10px); }
  75% { transform: translateX(20px); }
`

const glow = keyframes`
  0%, 100% { opacity: 0.4; box-shadow: 0 0 4px currentColor; }
  50% { opacity: 1; box-shadow: 0 0 12px currentColor; }
`

interface ParticleProps {
    size: number
    left: string
    delay: number
    duration: number
    color: string
}

const Particle = memo(({ size, left, delay, duration, color }: ParticleProps) => (
    <Box
        position="absolute"
        left={left}
        bottom="-10px"
        w={`${size}px`}
        h={`${size}px`}
        borderRadius="full"
        bg={color}
        color={color}
        css={{
            animation: `${float} ${duration}s ${delay}s infinite ease-in-out, ${drift} ${duration * 0.7}s ${delay}s infinite ease-in-out, ${glow} ${duration * 0.4}s ${delay}s infinite ease-in-out`,
            pointerEvents: 'none'
        }}
    />
))
Particle.displayName = 'Particle'

const GhibliParticles = memo(() => {
    const lightColor = '#d4a85380'
    const darkColor = '#98D8C860'
    const particleColor = useColorModeValue(lightColor, darkColor)

    const particles = useMemo(() =>
        Array.from({ length: 18 }, (_, i) => ({
            id: i,
            size: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            delay: Math.random() * 15,
            duration: Math.random() * 10 + 15,
        })), []
    )

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h="100%"
            overflow="hidden"
            pointerEvents="none"
            zIndex={0}
        >
            {particles.map(p => (
                <Particle
                    key={p.id}
                    size={p.size}
                    left={p.left}
                    delay={p.delay}
                    duration={p.duration}
                    color={particleColor}
                />
            ))}
        </Box>
    )
})
GhibliParticles.displayName = 'GhibliParticles'

export default GhibliParticles

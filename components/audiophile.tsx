import { Link as RouterLink } from 'react-router'
import { Heading, Box, Image, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface ChildrenProps {
    children: React.ReactNode
}

export const Title = ({ children }: ChildrenProps) => (
    <Box>
        <Link as={RouterLink} to="/audiophile">
            Audiophile
        </Link>
        <span>
            {' '}
            <ChevronRightIcon />{' '}
        </span>
        <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
            {children}
        </Heading>
    </Box>
)

export const AudioImage = ({ src, alt }: { src: string; alt: string }) => (
    <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)

export const Meta = ({ children }: ChildrenProps) => (
    <Badge colorScheme="green" mr={2}>
        {children}
    </Badge>
)

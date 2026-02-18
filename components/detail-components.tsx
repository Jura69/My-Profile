import { Link as RouterLink } from 'react-router'
import { Heading, Box, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { memo } from 'react'

interface ChildrenProps {
    children: React.ReactNode
}

interface DetailTitleProps {
    parentPath: string
    parentLabel: string
    children: React.ReactNode
}

export const DetailTitle = ({ parentPath, parentLabel, children }: DetailTitleProps) => (
    <Box>
        <Link as={RouterLink} to={parentPath}>
            {parentLabel}
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

export const DetailImage = memo(({ src, alt }: { src: string; alt: string }) => (
    <Box mb={4} borderRadius="lg" overflow="hidden">
        <img
            src={src}
            alt={alt}
            width={800}
            height={600}
            style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
            loading="lazy"
        />
    </Box>
))

export const Meta = ({ children }: ChildrenProps) => (
    <Badge colorScheme="green" mr={2}>
        {children}
    </Badge>
)

export const MetaRed = ({ children }: ChildrenProps) => (
    <Badge colorScheme="red" mr={2}>
        {children}
    </Badge>
)

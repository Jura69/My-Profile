import NextLink from 'next/link'
import { Heading, Box, Link, Badge } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { memo } from 'react'

export const Title = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/works">
      Works
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

export const WorkImage = memo(({ src, alt }) => (
  <Box mb={4} borderRadius="lg" overflow="hidden">
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
      loading="lazy"
      quality={85}
    />
  </Box>
))

export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
)

export const MetaRed = ({ children }) => (
  <Badge colorScheme="red" mr={2}>
    {children}
  </Badge>
)

import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { memo } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer">
      <Image
        src={thumbnail}
        alt={title}
        className="grid-item-thumbnail"
        placeholder="blur"
        loading="lazy"
      />
      <LinkOverlay href={href} target="_blank">
        <Text mt={2}>{title}</Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = memo(({
  children,
  category = 'works',
  id,
  title,
  thumbnail
}) => (
  <MotionBox
    w="100%"
    textAlign="center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
  >
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      cursor="pointer"
    >
      <MotionBox
        borderRadius="12px"
        overflow="hidden"
        mb={2}
        whileHover={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          scale: 1.02
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
          quality={80}
        />
      </MotionBox>
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </MotionBox>
))

export const AudioGridItem = memo(({
  children,
  category = 'audiophile',
  id,
  title,
  thumbnail
}) => (
  <MotionBox
    w="100%"
    textAlign="center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
  >
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      cursor="pointer"
    >
      <MotionBox
        borderRadius="12px"
        overflow="hidden"
        mb={2}
        whileHover={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          scale: 1.02
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
          quality={80}
        />
      </MotionBox>
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </MotionBox>
))

export const ActivitiesGridItem = memo(({
  children,
  category = 'activities',
  id,
  title,
  thumbnail
}) => (
  <MotionBox
    w="100%"
    textAlign="center"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -8 }}
  >
    <LinkBox
      as={NextLink}
      href={`/${category}/${id}`}
      scroll={false}
      cursor="pointer"
    >
      <MotionBox
        borderRadius="12px"
        overflow="hidden"
        mb={2}
        whileHover={{
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          scale: 1.02
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
          quality={80}
        />
      </MotionBox>
      <LinkOverlay as="div" href={`/${category}/${id}`}>
        <Text mt={2} fontSize={20}>
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize={14}>{children}</Text>
    </LinkBox>
  </MotionBox>
))

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
      }
    `}
  />
)

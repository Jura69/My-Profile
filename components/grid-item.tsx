import { Link as RouterLink } from 'react-router'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { memo } from 'react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export const GridItem = ({ children, href, title, thumbnail }:
    { children: React.ReactNode; href: string; title: string; thumbnail: string }) => (
    <Box w="100%" textAlign="center">
        <LinkBox cursor="pointer">
            <img src={thumbnail} alt={title} className="grid-item-thumbnail" loading="lazy" />
            <LinkOverlay href={href} target="_blank">
                <Text mt={2}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </Box>
)

interface GridItemProps {
    children?: React.ReactNode
    id: string
    title: string
    thumbnail: string
    category?: string
}

export const WorkGridItem = memo(({ children, category = 'works', id, title, thumbnail }: GridItemProps) => (
    <MotionBox w="100%" textAlign="center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }}>
        <LinkBox as={RouterLink} to={`/${category}/${id}`} cursor="pointer">
            <MotionBox borderRadius="12px" overflow="hidden" mb={2}
                whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)', scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <img src={thumbnail} alt={title} width={400} height={300}
                    style={{ width: '100%', height: 'auto' }} loading="lazy" />
            </MotionBox>
            <LinkOverlay as="div">
                <Text mt={2} fontSize={20}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </MotionBox>
))

export const AudioGridItem = memo(({ children, category = 'audiophile', id, title, thumbnail }: GridItemProps) => (
    <MotionBox w="100%" textAlign="center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }}>
        <LinkBox as={RouterLink} to={`/${category}/${id}`} cursor="pointer">
            <MotionBox borderRadius="12px" overflow="hidden" mb={2}
                whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)', scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <img src={thumbnail} alt={title} width={400} height={300}
                    style={{ width: '100%', height: 'auto' }} loading="lazy" />
            </MotionBox>
            <LinkOverlay as="div">
                <Text mt={2} fontSize={20}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </MotionBox>
))

export const ActivitiesGridItem = memo(({ children, category = 'activities', id, title, thumbnail }: GridItemProps) => (
    <MotionBox w="100%" textAlign="center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }} whileHover={{ y: -8 }}>
        <LinkBox as={RouterLink} to={`/${category}/${id}`} cursor="pointer">
            <MotionBox borderRadius="12px" overflow="hidden" mb={2}
                whileHover={{ boxShadow: '0 10px 30px rgba(0,0,0,0.3)', scale: 1.02 }}
                transition={{ duration: 0.3 }}>
                <img src={thumbnail} alt={title} width={400} height={300}
                    style={{ width: '100%', height: 'auto' }} loading="lazy" />
            </MotionBox>
            <LinkOverlay as="div">
                <Text mt={2} fontSize={20}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </MotionBox>
))

export const GridItemStyle = () => (
    <Global styles={`.grid-item-thumbnail { border-radius: 12px; }`} />
)

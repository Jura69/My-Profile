import {
    Box, Container, Flex, Heading, Menu, MenuList, MenuItem,
    MenuButton, IconButton, Stack, useColorModeValue, Link
} from '@chakra-ui/react'
import { Link as RouterLink, useLocation } from 'react-router'
import { forwardRef, memo, useState, useEffect } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import Logo from './logo'
import ThemeToggleButton from './theme-toggle-button'
import { HamburgerIcon } from '@chakra-ui/icons'

interface LinkItemProps {
    href: string
    target?: string
    children: React.ReactNode
    [key: string]: unknown
}

const LinkItem = ({ href, target, children, ...props }: LinkItemProps) => {
    const { pathname } = useLocation()
    const active = pathname === href
    const [mounted, setMounted] = useState(false)
    const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')

    useEffect(() => { setMounted(true) }, [])

    return (
        <Link
            as={RouterLink}
            to={href}
            p={2}
            bg={active ? 'grassTeal' : undefined}
            color={active ? '#202023' : mounted ? inactiveColor : 'gray.800'}
            target={target}
            {...props}
        >
            {children}
        </Link>
    )
}

const MenuLink = forwardRef<HTMLAnchorElement, { href?: string; to?: string; children?: React.ReactNode }>(
    (props, ref) => <Link ref={ref} as={RouterLink} to={props.href ?? props.to ?? '/'} {...props} />
)
MenuLink.displayName = 'MenuLink'

const Navbar = memo(function Navbar() {
    const [mounted, setMounted] = useState(false)
    const bgColor = useColorModeValue('#ffffff40', '#20202380')

    useEffect(() => { setMounted(true) }, [])

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={mounted ? bgColor : '#20202380'}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={2}
        >
            <Container display="flex" p={2} maxW="container.md" flexWrap="wrap" alignItems="center" justifyContent="space-between">
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing="tighter">
                        <Logo />
                    </Heading>
                </Flex>
                <Stack direction={{ base: 'column', md: 'row' }} display={{ base: 'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }} alignItems="center" flexGrow={1} mt={{ base: 4, md: 0 }}>
                    <LinkItem href="/works">Works</LinkItem>
                    <LinkItem href="/activities">Activities</LinkItem>
                    <LinkItem href="/audiophile">Audiophile</LinkItem>
                    <LinkItem target="_blank" href="https://github.com/Jura69"
                        display="inline-flex" alignItems="center" style={{ gap: 4 }} pl={2}>
                        <IoLogoGithub /> My Github
                    </LinkItem>
                </Stack>
                <Box flex={1} textAlign="right">
                    <ThemeToggleButton />
                    <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                        <Menu isLazy id="navbar-menu">
                            <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" aria-label="Options" />
                            <MenuList>
                                <MenuItem as={MenuLink} href="/">About</MenuItem>
                                <MenuItem as={MenuLink} href="/works">Works</MenuItem>
                                <MenuItem as={MenuLink} href="/activities">My Youth</MenuItem>
                                <MenuItem as={MenuLink} href="/audiophile">Audiophile</MenuItem>
                                <MenuItem as={Link} href="https://github.com/Jura69">My Github</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
})

export default Navbar

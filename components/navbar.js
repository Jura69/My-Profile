import { Box, Container, Flex, Heading, Menu, MenuList, MenuItem, MenuButton, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { forwardRef, memo, useState, useEffect } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import { Link } from '@chakra-ui/next-js';
import Logo from './logo';
import ThemeToggleButton from './theme-toggle-button';
import { HamburgerIcon } from '@chakra-ui/icons'

const LinkItem = ({ href, path, target, children, ...props }) => {
    const active = path === href
    const [mounted, setMounted] = useState(false)

    // Always call hooks unconditionally
    const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
      <Link
        as={NextLink}
        href={href}
        scroll={false}
        p={2}
        bg={active ? 'grassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
        target={target}
        {...props}
      >
        {children}
      </Link>
    )
  }
  
  const MenuLink = forwardRef((props, ref) => (
    <Link ref={ref} as={NextLink} {...props} />
  ))

const Navbar = memo(function Navbar(props) {
    const { path } = props
    const [mounted, setMounted] = useState(false)

    // Always call hooks unconditionally
    const bgColor = useColorModeValue('#ffffff40', '#20202380')

    useEffect(() => {
      setMounted(true)
    }, [])

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={bgColor}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex={2}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="container.md"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        <Logo />
                    </Heading>
                </Flex>

                <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/activities" path={path}>
            Activities
          </LinkItem>
          <LinkItem href="/audiophile">Audiophile</LinkItem>
          <LinkItem
            target="_blank"
            href="https://github.com/Jura69"
            path={path}
            display="inline-flex"
            alignItems="center"
            style={{ gap: 4 }}
            pl={2}
          >
            <IoLogoGithub />
            My Github
          </LinkItem>
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/">
                  About
                </MenuItem>
                <MenuItem as={MenuLink} href="/works">
                  Works
                </MenuItem>
                <MenuItem as={MenuLink} href="/activities">
                  My Youth
                </MenuItem>
                <MenuItem as={MenuLink} href="/audiophile">
                  Audiophile
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://github.com/Jura69"
                >
                  My Github
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>

            </Container>
        </Box>
    );
})

export default Navbar

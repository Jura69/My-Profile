import { Box, Container, Flex, Heading, Menu, MenuList, MenuItem, MenuButton, IconButton, Stack, useColorModeValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import { forwardRef } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import { Link } from '@chakra-ui/next-js';
import Logo from './logo';
import ThemeToggleButton from './theme-toggle-button';
import { HamburgerIcon } from '@chakra-ui/icons'

const LinkItem = ({ href, path, target, children, ...props }) => {
    const active = path === href
    const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
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

export default function Navbar(props) {
    const { path } = props
    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('#ffffff40', '#20202380')}
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
          <LinkItem href="/projects" path={path}>
            Projects
          </LinkItem>
          <LinkItem href="#" path={path}>
            My Youth
          </LinkItem>
          <LinkItem href="#" path={path}>
            Tech Blogs
          </LinkItem>
          <LinkItem href="#">Audiophile</LinkItem>
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
                <MenuItem as={MenuLink} href="/">
                  Works
                </MenuItem>
                <MenuItem as={MenuLink} href="/">
                  My Youth
                </MenuItem>
                <MenuItem as={MenuLink} href="/">
                  Tech Blogs
                </MenuItem>
                <MenuItem as={MenuLink} href="/">
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
}

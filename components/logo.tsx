import { Link as RouterLink } from 'react-router'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { memo, useState, useEffect } from 'react'
import TotoroIcon from './icons/totoro'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
  padding-top: 25px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: scale(1.3, 1.3);
  }
`

const Logo = memo(function Logo() {
    const [mounted, setMounted] = useState(false)
    const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')

    useEffect(() => { setMounted(true) }, [])

    return (
        <RouterLink to="/">
            <LogoBox>
                <TotoroIcon />
                <Text
                    color={mounted ? textColor : 'whiteAlpha.900'}
                    fontFamily='"M PLUS Rounded 1c", sans-serif'
                    fontWeight="bold"
                    ml={3}
                >
                    Jura69
                </Text>
            </LogoBox>
        </RouterLink>
    )
})

export default Logo

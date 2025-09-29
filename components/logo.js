import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { memo, useState, useEffect } from 'react'
import TotoroIcon from '../components/icons/totoro'

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
    transform:  scale(1.3,1.3);
  }
`

const Logo = memo(function Logo() {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
      setMounted(true)
    }, [])
    
    // Consistent color for SSR
    const textColor = mounted ? useColorModeValue('gray.800', 'whiteAlpha.900') : 'gray.800'
    
    return (
        (<Link href="/" scroll={false}>

            <LogoBox>
                <TotoroIcon />
                <Text
                    color={textColor}
                    fontFamily='M PLUS Rounded 1c", sans-serif'
                    fontWeight="bold"
                    ml={3}
                >
                    Jura69
                </Text>
            </LogoBox>

        </Link>)
    );
})

export default Logo



import Link from 'next/link'
import { Text, useColorModeValue } from '@chakra-ui/react'
import styled from '@emotion/styled'
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

export default function Logo() {
    return (
        (<Link href="/" scroll={false}>

            <LogoBox>
                <TotoroIcon />
                <Text
                    color={useColorModeValue('gray.800', 'whiteAlpha.900')}
                    fontFamily='M PLUS Rounded 1c", sans-serif'
                    fontWeight="bold"
                    ml={3}
                >
                    Jura69
                </Text>
            </LogoBox>

        </Link>)
    );
}



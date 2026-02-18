import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import FloatingBox from './floating-box'

export const TotoroSpinner = () => (
    <Spinner
        size="xl"
        position="absolute"
        left="50%"
        top="50%"
        ml="calc(0px - var(--spinner-size) / 2)"
        mt="calc(0px - var(--spinner-size))"
    />
)

export const TotoroContainer = forwardRef<HTMLDivElement, { children?: React.ReactNode }>(
    ({ children }, ref) => (
        <FloatingBox>
            <Box
                ref={ref}
                className="Totoro"
                m="auto"
                mt={['-20px', '-60px', '-120px']}
                mb={['-40px', '-140px', '-200px']}
                w={[280, 480, 640]}
                h={[280, 480, 640]}
                position="relative"
            >
                {children}
            </Box>
        </FloatingBox>
    )
)
TotoroContainer.displayName = 'TotoroContainer'

const Loader = () => {
    return (
        <TotoroContainer>
            <TotoroSpinner />
        </TotoroContainer>
    )
}

export default Loader

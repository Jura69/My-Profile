import { Box } from '@chakra-ui/react'
import { memo, useState, useEffect } from 'react'

const Footer = memo(() => {
  const [year, setYear] = useState(2024) // Default fallback
  
  useEffect(() => {
    // Only set the current year on client-side to avoid hydration mismatch
    setYear(new Date().getFullYear())
  }, [])
  
  return (
    <Box align="center" opacity={0.4} fontSize="sm" >
      &copy; {year} Jura69. All Rights Reserved.
    </Box>
  )
})

export default Footer

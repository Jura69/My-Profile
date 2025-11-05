import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useState, useEffect } from 'react'

export default function ThemeToggleButton(){
  const { toggleColorMode, colorMode } = useColorMode()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a consistent button for SSR
    return (
      <IconButton
        aria-label="Toggle theme"
        colorScheme="purple"
        icon={<MoonIcon />}
        onClick={toggleColorMode}
      />
    )
  }

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={colorMode}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          colorScheme={colorMode === 'light' ? 'purple' : 'orange'}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        />
      </motion.div>
    </AnimatePresence>
  )
}


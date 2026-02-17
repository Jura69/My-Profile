import Layout from '../../components/layouts/main'
import Chakra from '../../providers/chakra';
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { reportWebVitals } from '../../lib/performance'

// Report web vitals
export { reportWebVitals }

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

export default function Website({ Component, pageProps, router }) {
  return (
    <>
      <Chakra cookies={pageProps.cookies}>
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0 })
              }
            }}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </Chakra>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

import Head from 'next/head';
import Layout from '../../components/layouts/main'
import Chakra from '../../providers/chakra';
import Font from './fonts/font';
import { AnimatePresence } from 'framer-motion'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

export default function Website({ Component, pageProps, router }) {
  return (
    <>
      <Chakra cookies={pageProps.cookies}>
        <Font />
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
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
    </>
  );
}

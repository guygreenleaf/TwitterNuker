import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, 
                  pageProps: {session, ...pageProps} 
                }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <div className='appBackground' >
          <Component {...pageProps} />
        </div>
      </ChakraProvider> 
  </SessionProvider>
  )
}

export default MyApp


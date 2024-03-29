import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider,ThemeProvider,CSSReset } from '@chakra-ui/react'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CSSReset/>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp

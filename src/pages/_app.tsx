import type { AppProps } from 'next/app'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: unknown }>) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp

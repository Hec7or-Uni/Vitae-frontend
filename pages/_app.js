import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ScreenProvider } from '../context/ScreenContext'

export default function MyApp ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <ScreenProvider>
        {getLayout(<Component {...pageProps} />)}
      </ScreenProvider>
    </SessionProvider>
  )
}

import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'

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
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

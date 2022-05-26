import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { ScreenProvider } from '../context/ScreenContext'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'

export default function MyApp ({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
    {/* Global Site Tag (gtag.js) - Google Analytics */}
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
    />
    <Script
      id="gtag-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtag.GA_TRACKING_ID}', {
            page_path: window.location.pathname,
          });
        `
      }}
    />
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}
    >
      <ScreenProvider>
        {getLayout(<Component {...pageProps} />)}
      </ScreenProvider>
    </SessionProvider>
  </>
  )
}

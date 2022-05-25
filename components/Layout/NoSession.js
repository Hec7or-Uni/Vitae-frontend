import Meta from '../Meta'
import Navbar from '../Navegation/Navbar/NoSession'
import Footer from '../Navegation/Footer/NoSession'
import CookieConsent from 'react-cookie-consent'
import Link from 'next/link'
import { useScreen } from '../../context/ScreenContext'
import Documentation from '../Documentation'

export default function Layout ({ children, docs }) {
  const { docsActive } = useScreen()
  return (
    <>
      <Meta/>
      <div className={`${docsActive ? 'overflow-y-hidden h-screen' : ''}`}>
        <div>
          {docs !== undefined && <Documentation source={docs.source} frontMatter={docs.frontMatter} />}
          <Navbar />
        </div>
        <main>
          { children }
        </main>
        <Footer />
      </div>
      <CookieConsent
        buttonText="Accept All"
        declineButtonText="Reject All"
        cookieName="vitop-cookie-consent"
        onAccept={() => {}}
        onDecline={() => {}}
        expires={30}
        extraCookieOptions={{ domain: 'vitop.xyz' }}
        enableDeclineButton
        flipButtons
        overlay
        style={{
          background: '#FFFFFF',
          backgroundOpacity: '50%',
          zIndex: 50,
          color: '#000000'
        }}
        buttonStyle={{
          background: 'rgb(255 255 255)',
          color: 'black',
          fontWeight: '500',
          shadow: '2px',
          filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
        }}
        declineButtonStyle={{
          background: 'rgb(239 68 68)',
          color: 'white',
          fontWeight: '500',
          filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
        }}
      >
        This website uses cookies to enhance the user experience. To learn more, take a look at our{' '}
        <Link href='/tos'>
          <a className='hover:underline hover:underline-offset-1 text-indigo-700'>
            terms of service
          </a>
        </Link>
        {' '}and{' '}
        <Link href='/privacypolicy'>
          <a className='hover:underline hover:underline-offset-1 text-indigo-700'>
            privacy policy
          </a>
        </Link>.
      </CookieConsent>
    </>
  )
}

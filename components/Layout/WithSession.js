import Meta from '../Meta'
import Navbar from '../Navegation/Navbar/WithSession'
import Sidebar from '../Navegation/Sidebar/WithSession'
import Footer from '../Navegation/Footer/WithSession'
import { ScreenProvider } from '../../context/ScreenContext'
import Share from '../Share'
import { ShareProvider } from '../../context/ShareContext'
import useKey from '../../hooks/useKey'
import { useRouter } from 'next/router'

export default function Layout ({ children }) {
  const router = useRouter()
  const handleContact = () => {
    router.push('mailto:hi@vitop.xyz')
  }

  useKey('KeyQ', handleContact)
  return (
    <ScreenProvider>
      <ShareProvider>
        <Meta/>
        <div className='h-screen w-full flex flex-col divide-y-2 divide-gray-700 relative'>
          <Navbar />
          <div
            className='flex flex-1 divide-x-2 divide-gray-500'
            style={{ height: 'calc(100vh - 6.5rem)' }}
          >
            <Sidebar />
            <main className='flex-1 overflow-y-auto bg-gradient-to-t '>
              <div className='h-full container mx-auto py-4'>
                { children }
              </div>
            </main>
          </div>
          <Footer />
          <Share/>
        </div>
      </ShareProvider>
    </ScreenProvider>
  )
}

import Meta from './Meta'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import { ScreenProvider } from '../context/ScreenContext'

export default function Layout ({ children }) {
  return (
    <ScreenProvider>
      <Meta/>
      <div className='h-screen w-full flex flex-col divide-y-2 divide-black'>
        <Navbar />
        <div
          className='flex divide-x-2 divide-black flex-1'
          style={{ height: 'calc(100vh - 6.5rem)' }}
        >
          <Sidebar />
          <main className='flex-1 overflow-y-auto'>
            <div className='container mx-auto py-4'>
              { children }
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </ScreenProvider>
  )
}

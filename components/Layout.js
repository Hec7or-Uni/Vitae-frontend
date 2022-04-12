import Meta from './Meta'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Meta/>
      <div className='h-screen w-full flex flex-col divide-y-2 divide-black'>
        <Navbar />
        <div className='flex-1 flex divide-x-2 divide-black'>
          <Sidebar />
          <main className='flex-1'>
            { children }
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

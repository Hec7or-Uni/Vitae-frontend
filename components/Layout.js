import Meta from './Meta'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout ({ children }) {
  return (
    <>
      <Meta/>
      <div className='h-screen w-full flex flex-col'>
        <Navbar />
        <div className='flex-1 flex'>
          <Sidebar />
          <main className='flex-1 bg-blue-200'>
            { children }
          </main>
        </div>
        <Footer />
      </div>
    </>
  )
}

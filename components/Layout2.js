import Meta from './Meta'
import Navbar from './Navbar'
import Footer2 from './Footer2'

export default function Layout ({ children }) {
  return (
    <>
      <Meta/>
      <div className='divide-y-2 divide-black'>
        <Navbar />
        <main>
          { children }
        </main>
        <Footer2 />
      </div>
    </>
  )
}

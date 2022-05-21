import Meta from '../Meta'
import Navbar from '../Navegation/Navbar/NoSession'
import Footer from '../Navegation/Footer/NoSession'

export default function Layout ({ children }) {
  return (
    <>
      <Meta/>
      <div>
        <Navbar />
        <main>
          { children }
        </main>
        <Footer />
      </div>
    </>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import Testimonial from '../components/Testimonial'
import Navbar2 from '../components/Navbar2'
import Footer2 from '../components/Footer2'
import { FiCheck } from 'react-icons/fi'

export default function Index () {
  return (
    <>
      <div className='w-full h-screen relative top-0 flex items-center justify-center'>
        <Image
          src='https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=2399&h=594%201x,%20https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=2399&h=594%202x'
          alt='Picture of the author'
          layout='fill'
          className='z-0'
        />
        <div className='max-w-prose z-50 flex flex-col gap-8 items-center'>
          <h1 className='text-center text-4xl font-bold capitalize'>
            Rutrum vitae morbi quam nulla vel massa eu id massa.
          </h1>
          <Link href={'/'}>
            <a className='px-4 py-1.5 bg-white rounded-lg text-lg'>
              Join Now
            </a>
          </Link>
        </div>
        <Navbar2 />
      </div>
      <div className='py-20 my-28 h-full container flex justify-center gap-16 mx-auto'>
        <div className='basis-1/4 flex relative'>
          <Image
            src='https://images.unsplash.com/photo-1650407423279-3ff8bbd83fc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            alt='Picture of the author'
            layout='fill'
            className='z-0'
          />
        </div>
        <div className='py-16'>
          <ul className='flex flex-col gap-y-8'>
            {[
              'Pretium neque sit semper quam consequat. Facilisi tortor, platea vitae eu, odio lacus, sed nisl.',
              'Tincidunt lectus semper viverra diam sodales. Phasellus augue et gravida bibendum tincidunt.',
              'Dui arcu velit augue quisque ipsum at vitae lacinia. Orci morbi eget sed ultricies euismod suspendisse volutpat.',
              'Placerat euismod ut mauris vitae fames. Orci, varius elit id aliquet vitae.'
            ].map(text => {
              return (
                <li key={text} className='flex items-start gap-2 max-w-prose'>
                  <span className='mt-1.5'>
                    <FiCheck className='w-5 h-5 text-xl'/>
                  </span>
                  <p className='text-lg'>{text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className='py-20 my-28 container mx-auto flex justify-center gap-20'>
        <Testimonial />
        <Testimonial />
        <Testimonial />
      </div>
      <section className='py-20 my-28 flex items-center justify-center bg-gray-200'>
        <div className='container flex items-center justify-around'>
          <p className='max-w-prose text-lg'>
            Dolor quam sodales nunc, tortor semper aliquam maecenas.tortor semper aliquam maecenas.
          </p>
          <Link href={'/'}>
            <a className='px-4 py-1.5 bg-white rounded-lg text-lg'>
              Join Now
            </a>
          </Link>
        </div>
      </section>
      <div className='py-10 my-28 container mx-auto flex justify-center'>
        <div className='w-2/3 text-center'>
          <p>
          Massa justo sit massa ac sed sit. Duis tristique semper elit urna, ullamcorper nec ultrices nulla. Id vel enim diam tortor purus egestas nulla. Nullam ornare nibh nulla fames ultrices urna massa nunc. Dui, vestibulum adipiscing eget dictumst. Iaculis placerat vitae, blandit ac.
          <br/>
          Id viverra vel, nunc, tristique ante varius amet, nibh elementum. Justo, amet, amet, augue tincidunt. Vitae, at pulvinar scelerisque libero. Sodales ac lectus at netus molestie ullamcorper viverra. Faucibus vulputate nisl, nunc, sed viverra odio sem quis. Pharetra egestas sit congue venenatis vulputate ut tellus.
          </p>
        </div>
      </div>
      <Footer2 />
    </>
  )
}

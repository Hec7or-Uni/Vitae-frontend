import Image from 'next/image'
import Link from 'next/link'
import Testimonial from '../components/Testimonial'
import Navbar from '../components/Navegation/Navbar/NoSession'
import Footer from '../components/Navegation/Footer/NoSession'
import { FiCheck } from 'react-icons/fi'
import { Counter, Observer } from '../components/Counter'

export default function Index () {
  const reset = entry => <Counter number={'15000'} duration={2} />

  const backgroundImage = 'https://images.unsplash.com/photo-1595187139760-5cedf9ab5850?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1531'

  const recipe1 = 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749'
  const recipe2 = 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'
  const recipe3 = 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2020'
  return (
    <>
      <Navbar />
      <div className='w-full h-screen relative top-0 flex items-center justify-center -mt-16' >
        <Image
          src={backgroundImage}
          alt='Picture of the author'
          layout='fill'
          className='w-full h-full object-cover z-0'
        />
        <div className='container w-full flex items-center justify-between z-10 px-20 py-10'>
          <div className='max-w-prose z-10 flex flex-col gap-8 items-center'>
            <h1 className='text-white text-center text-4xl font-bold capitalize'>
              Rutrum vitae morbi quam nulla vel massa eu id massa.
            </h1>
            <Link href={'/'}>
              <a className='px-4 py-1.5 bg-white rounded-lg text-lg'>
                Join Now
              </a>
            </Link>
          </div>
          <div className='w-1/4 z-10 flex flex-col gap-6 items-center'>
            {[
              { id: 12345, image: recipe1 },
              { id: 123456, image: recipe2 },
              { id: 123457, image: recipe3 }
            ].map(recipe => {
              return (
                <div
                  key={recipe.id}
                  className='w-96 h-44 rounded-lg bg-black relative flex items-center justify-center shadow-xl border-4 hover:scale-95 duration-300 z-0'>
                  <Image
                    src={recipe.image}
                    alt='Picture of the author'
                    layout='fill'
                    className='w-full h-full object-cover z-0 rounded-lg hover:opacity-70'
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className='py-20 my-28 h-full container flex justify-center gap-16 mx-auto'>
        <div className='basis-1/4 flex relative rounded-lg'>
          <Image
            src='https://images.unsplash.com/photo-1591504771094-a1ca4de142d7?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'
            alt='Picture of the author'
            layout='fill'
            className='w-full h-full object-cover z-0 rounded-lg'
          />
        </div>
        <div className='py-24'>
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
        <Testimonial
          text={'This app would have come in handy when I was in college. Now I will use it for my work :D'}
          picture={'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974'}
          name={'Emiliana Luque'}
          rol={'nutritionist'}
        />
        <Testimonial
          text={'Now I can have breakfast like a princess 365 without worrying about anything.'}
          picture={'https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'}
          name={'Sabina Merchan'}
          rol={'blogger'}
        />
        <Testimonial
          text={'Thanks to this app the results of my clients are getting better and better.'}
          picture={'https://images.unsplash.com/photo-1622106509587-1c5d60316802?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974'}
          name={'Rachid Colomer'}
          rol={'personal trainer'}
        />
      </div>
      <section className='py-20 my-28 flex items-center justify-center bg-[#3a5a40]'>
        <div className='container flex items-center justify-around text-white'>
          <Observer label={'Recipes'} number={'5000'} duration={1.5} reset={reset}/>
          <Observer label={'Menus'} number={'15000'} duration={2} reset={reset}/>
          <Observer label={'Users'} number={'874'} duration={0.5} reset={reset}/>
          <Observer label={'Constitution'} number={'2022'} duration={1.25} reset={reset}/>
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
      <Footer />
    </>
  )
}

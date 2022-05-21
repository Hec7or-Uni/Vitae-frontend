import Layout from '../components/Layout/NoSession'
import { useRouter } from 'next/router'
import Partner from '../components/Partner'
import { FiArrowLeft } from 'react-icons/fi'
import Image from 'next/image'

export default function About () {
  const router = useRouter()
  return (
    <div className='container mx-auto flex gap-x-4 items-start py-8 px-10'>
      <button
        onClick={() => router.back()}
        className='flex items-center justify-center w-10 h-10'
      >
        <FiArrowLeft className='text-2xl'/>
      </button>
      <div className='w-full flex flex-col gap-y-10'>
        <h1 className='font-bold text-2xl mb-1.5'>
          About Us
        </h1>
        <section>
          <h2 className='font-bold text-xl'>
            Tristique leo eu tramboliko
          </h2>
          <p className='font-normal text-base pt-4 pb-8'>
            Pretium tortor, habitasse turpis orci luctus. Blandit eleifend aliquet egestas faucibus in aliquam molestie arcu sagittis. Posuere neque, sed cras maecenas. Pulvinar dignissim malesuada pulvinar posuere porttitor ultrices etiam vulputate in. Mauris mauris, eget ullamcorper ultrices diam, nisi, purus turpis sed. Tempus, sit viverra suspendisse ullamcorper varius vel non ipsum.
          </p>
          <div className='w-full h-96 rounded-lg relative bg-gray-200'>
            <Image
              src={'https://images.unsplash.com/photo-1553877522-43269d4ea984?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170'}
              alt='Picture of the author'
              layout='fill'
              className='w-full h-full object-cover rounded-lg z-0'
            />
          </div>
        </section>
        <section className='py-10'>
          <h2 className='font-bold text-xl'>
            Phasellus quis scelerisque
          </h2>
          <p className='font-normal text-base pt-4 pb-8'>
            Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas. Aliquam suspendisse ultrices habitant nunc tellus mauris, viverra in mattis. Tellus sociis eget massa ut risus ornare. Placerat auctor at faucibus viverra ut cursus in. Sem nulla eu ullamcorper non lacus etiam neque. Erat interdum in neque tincidunt justo vulputate odio viverra.
          </p>
          <div className='w-full h-96 rounded-lg relative bg-gray-200'>
            <Image
              src={'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184'}
              alt='Picture of the author'
              layout='fill'
              className='w-full h-full object-cover rounded-lg object-center z-0'
            />
          </div>
        </section>
        <section>
          <h2 className='font-bold text-xl'>
            Phasellus quis scelerisque
          </h2>
          <p className='font-normal text-base pt-4 pb-8'>
            Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas. Aliquam suspendisse ultrices habitant nunc tellus mauris, viverra in mattis. Tellus sociis eget massa ut risus ornare.
          </p>
          <div className='w-full flex flex-col gap-4'>
            {[
              {
                img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                title: 'Toral Pallás, Héctor',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'hector@vitop.xyz'
              }, {
                img: 'https://images.unsplash.com/photo-1544168190-79c17527004f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
                title: 'Bolu Li Yuan.',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'bolu@vitop.xyz'
              }, {
                img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                title: 'García García, Álvaro',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'alvaro@vitop.xyz'
              }
            ].map(item => <Partner key={item.email} img={item.img} title={item.title} description={item.description} email={item.email} />)}

          </div>
        </section>
      </div>
    </div>
  )
}

About.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

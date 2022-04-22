import { useRouter } from 'next/router'
import { FiArrowLeft } from 'react-icons/fi'
import Partner from '../components/Partner'
import Layout2 from '../components/Layout2'

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
      <div className='w-full flex flex-col gap-y-2'>
        <h1 className='font-bold text-2xl mb-1.5'>
          About Us
        </h1>
        <section>
          <h2 className='font-bold text-xl'>
            Tristique leo eu tramboliko
          </h2>
          <p className='font-normal text-base'>
            Pretium tortor, habitasse turpis orci luctus. Blandit eleifend aliquet egestas faucibus in aliquam molestie arcu sagittis. Posuere neque, sed cras maecenas. Pulvinar dignissim malesuada pulvinar posuere porttitor ultrices etiam vulputate in. Mauris mauris, eget ullamcorper ultrices diam, nisi, purus turpis sed. Tempus, sit viverra suspendisse ullamcorper varius vel non ipsum.
          </p>
          <div className='w-full h-72 bg-gray-200'/>
        </section>
        <section>
          <h2 className='font-bold text-xl'>
            Phasellus quis scelerisque
          </h2>
          <p className='font-normal text-base'>
            Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas. Aliquam suspendisse ultrices habitant nunc tellus mauris, viverra in mattis. Tellus sociis eget massa ut risus ornare. Placerat auctor at faucibus viverra ut cursus in. Sem nulla eu ullamcorper non lacus etiam neque. Erat interdum in neque tincidunt justo vulputate odio viverra.
          </p>
          <div className='w-full h-72 bg-gray-200'/>
        </section>
        <section>
          <h2 className='font-bold text-xl'>
            Phasellus quis scelerisque
          </h2>
          <p className='font-normal text-base'>
            Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas. Aliquam suspendisse ultrices habitant nunc tellus mauris, viverra in mattis. Tellus sociis eget massa ut risus ornare.
          </p>
          <div className='w-full flex flex-col gap-4'>
            {[
              {
                img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                title: 'Enim risus id risus faucibus.',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'hector@vitae.co'
              }, {
                img: 'https://images.unsplash.com/photo-1544168190-79c17527004f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
                title: 'Enim risus id risus faucibus.',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'bolu@vitae.co'
              }, {
                img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
                title: 'Enim risus id risus faucibus.',
                description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
                email: 'alvaro@vitae.co'
              }
            ].map(item => <Partner key={item.email} img={item.img} title={item.title} description={item.description} email={item.email} />)}

          </div>
        </section>
      </div>
    </div>
  )
}

About.getLayout = function getLayout (page) {
  return <Layout2>{page}</Layout2>
}

import Layout from '../components/Layout/NoSession'
import { useRouter } from 'next/router'
import Partner from '../components/Partner'
import { FiArrowLeft } from 'react-icons/fi'
import Image from 'next/image'
import { serialize } from 'next-mdx-remote/serialize'
import { getPost } from '../lib/mdxUtils'
import hector from '../public/hector.png'
import bolu from '../public/bolu.png'
import alvaro from '../public/alvaro.png'

export default function About () {
  const router = useRouter()
  return (
    <div className='container mx-auto flex gap-x-4 items-start py-8 px-10'>
      <button
        onClick={() => router.push('/')}
        className='flex items-center justify-center w-10 h-10'
      >
        <FiArrowLeft className='text-2xl'/>
      </button>
      <div className='w-full flex flex-col gap-y-10'>
        <h1 className='font-bold text-2xl mb-1.5'>
          About Us
        </h1>
        <section>
          <h2 className='font-medium text-4xl'>
            Who We Are
          </h2>
          <p className='font-normal text-base pt-4 pb-8 w-full lg:w-2/3'>
            We are a small group of students formed by the casuistry of the moment who were asked to find a problem and solve it in such a way that a large group of people could benefit from our work.
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
          <h2 className='font-medium text-4xl'>
            Our Mision
          </h2>
          <p className='font-normal text-base pt-4 pb-8 w-full lg:w-2/3'>
          The main mission of the team was to develop a useful application that would help users with the daily routine of preparing and organizing meals as we detected that it was one of the biggest time wasters in most families.
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
          <h2 className='font-medium text-4xl'>
            The Team
          </h2>
          <p className='font-normal text-base pt-4 pb-8 w-full lg:w-2/3'>
            The team is made up of three members, all of them computer engineering students at the University of Zaragoza and they are responsible for the product they are navigating right now, both the good and the bad :D
          </p>
          <div className='w-full flex flex-col gap-4'>
            {[
              {
                img: hector,
                title: 'Toral Pallás, Héctor',
                description: 'Third year student of computer engineering at the university of Zaragoza',
                email: 'hector@vitop.xyz'
              }, {
                img: bolu,
                title: 'Bolu Li Yuan.',
                description: 'Fourth year student of computer engineering at the university of Zaragoza',
                email: 'bolu@vitop.xyz'
              }, {
                img: alvaro,
                title: 'García García, Álvaro',
                description: 'Fourth year student of computer engineering at the university of Zaragoza',
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
  const docs = page.props
  return <Layout docs={docs}>{page}</Layout>
}

export const getStaticProps = async () => {
  const { content, data } = getPost('memoria')
  const mdxSource = await serialize(content, { scope: data })

  return {
    props: {
      source: mdxSource,
      frontMatter: data
    }
  }
}

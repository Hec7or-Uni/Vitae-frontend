import Layout from '../components/Layout'
import { getSession } from 'next-auth/react'
import Card from '../components/Card'
import Search from '../components/Search'
import { data } from '../lib/temp'

export default function Discover ({ recipes }) {
  // const url = 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80'

  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <Search />
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {recipes.map(item => <Card key={item.id} id={item.id} img={item.image} />)}
      </div>
    </div>
  )
}

Discover.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps ({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const recipes = data.recipes

  return {
    props: { recipes }
  }
}

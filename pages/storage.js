import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import Card from '../components/Card'
import Search from '../components/Search'

export default function Storage ({ recipes }) {
  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <Search />
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {recipes.map(item => <Card key={item.id} id={item.spoonId} img={item.image} />)}
      </div>
    </div>
  )
}

Storage.getLayout = function getLayout (page) {
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

  const parametros = new URLSearchParams({ email: session.user.email })
  const user = await fetch(`http://localhost:4000/api/user?${parametros}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: { recipes: user.saved_recipes }
  }
}

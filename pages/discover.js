import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import Card from '../components/Card'
import Search from '../components/Search'
import { useState } from 'react'

export default function Discover ({ email, recipes, token }) {
  console.log(email, recipes, token)
  const [localRecipes, setRecipes] = useState(recipes)

  const handleSearch = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ email, search: e.target.target.value })
    const recipes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}inventory/search-recipes?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json())
    setRecipes(recipes)
  }

  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <Search funct={handleSearch} />
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {localRecipes.map(item => <Card key={item.spoonId} url={'/recipe/' + item.spoonId} img={item.image} />)}
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

  const params = new URLSearchParams({ quantity: 25 })
  const recipes = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}inventory/discovery?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${req.cookies['__Secure-next-auth.session-token']}`
    }
  }).then(res => res.json())
    .catch(err => console.error(err))

  return {
    props: {
      email: session.user.email,
      recipes: recipes,
      token: req.cookies['__Secure-next-auth.session-token']
    }
  }
}

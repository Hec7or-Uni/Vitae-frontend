import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import Card from '../components/Card'
import Search from '../components/Search'
import { useState } from 'react'

export default function Discover ({ email, recipes, token }) {
  const [localRecipes, setRecipes] = useState(recipes)

  const handleSearch = async (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ email, search: e.target.target.value })
    const recipes = await fetch(`http://localhost:4000/api/inventory/search-recipes?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: token
      }
    }).then(res => res.json())
    console.log(recipes)
    if (recipes.results.length >= 0) { setRecipes(recipes.results) }
  }

  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <Search funct={handleSearch} />
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {localRecipes.map(item => <Card key={item.spoonId} id={item.spoonId} img={item.image} />)}
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

  const params = new URLSearchParams({ email: session.user.email })
  const recipes = await fetch(`http://localhost:4000/api/inventory/random-recipes?${params}`, {
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      email: session.user.email,
      recipes,
      token: req.cookies['next-auth.session-token']
    }
  }
}

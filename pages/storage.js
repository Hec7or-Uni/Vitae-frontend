import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import Card from '../components/Card'

export default function Storage ({ menus }) {
  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {menus.map(item => {
          return <Card key={item._id} url={'/menu/' + item._id} img={item.image} />
        })}
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
  const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user?${parametros}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['__Secure-next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: { menus: user.menus }
  }
}

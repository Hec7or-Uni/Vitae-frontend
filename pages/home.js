import Layout from '../components/Layout'

export default function Home () {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

Home.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

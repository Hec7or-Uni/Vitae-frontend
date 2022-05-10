import Layout from '../components/Layout'
import Card from '../components/Card'
import Search from '../components/Search'

export default function Storage () {
  const url = 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=710&q=80'

  return (
    <div className='max-w-5xl flex flex-col gap-5'>
      <Search />
      <div className='flex flex-wrap gap-4 overflow-y-auto'>
        {[{
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }, {
          id: Math.random().toString(),
          img: url
        }].map(item => <Card key={item.id} id={item.id} img={item.img} />)}
      </div>
    </div>
  )
}

Storage.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

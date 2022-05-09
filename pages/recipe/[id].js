import Layout from '../../components/Layout'
import Image from 'next/image'
import { FiPlus, FiClock, FiHeart, FiBookmark } from 'react-icons/fi'

export default function Menu () {
  return (
    <div className='max-w-5xl'>
      <div className='w-full h-80 relative'>
        <Image
          src="https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=2399&h=594%201x,%20https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=2399&h=594%202x"
          alt="Picture of the author"
          layout='fill'
          className='object-cover z-0'
        />
        <div className='flex gap-x-4 absolute top-0 right-0 mt-2.5 mr-4'>
          <FiPlus className='w-5 h-5 text-white'/>
          <FiClock className='w-5 h-5 text-white'/>
          <FiHeart className='w-5 h-5 text-white'/>
        </div>
        <div className='absolute bottom-0 right-0 mb-2.5 mr-4'>
          <FiBookmark className='w-5 h-5 text-white'/>
        </div>
        <h1 className='text-2xl font-medium text-white absolute bottom-0 left-0 mb-2.5 ml-4'>
          Quis sed amet lectus rhoncus
        </h1>
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Sapien rutrum amet, ac
        </h2>
        <div className='mt-4 flex flex-wrap gap-4 w-1/2'>
          {[{ id: 1, text: 'hola' },
            { id: 2, text: 'hola' },
            { id: 3, text: 'hola' },
            { id: 4, text: 'hola' },
            { id: 5, text: 'hola' },
            { id: 6, text: 'hola' },
            { id: 7, text: 'hola' },
            { id: 8, text: 'hola' }].map(ingredient => {
            return (
              <div key={ingredient.id} className='h-28 w-28 bg-gray-200 flex items-center justify-center'>
                <p>{ingredient.text}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
        Sollicitudin convallis placerat id
        </h2>
        <ol className='mt-4 flex flex-col gap-4 w-2/3 list-decimal'>
          {[{ id: 1, title: 'Aenean vel egestas ridiculus mattis', text: 'Neque tincidunt condimentum placerat amet vestibulum. Rhoncus vitae aliquam placerat non blandit facilisis odio morbi donec.' },
            { id: 2, title: 'Purus lobortis id duis', text: 'Eu est a ultrices vestibulum. Ultricies aliquet dolor diam, mattis. Commodo fames magna elementum turpis erat tortor mauris.' },
            { id: 3, title: 'A dignissim auctor amet mi', text: 'Ultricies pellentesque ultrices neque id molestie condimentum. Adipiscing et amet amet nulla massa a dictumst luctus ac. Lacus odio facilisis rhoncus, ornare fusce quam et vel mi.' }].map(ingredient => {
            return (
              <li key={ingredient.id} className='flex flex-col'>
                <h3 className='text-xl capitalize'>{ingredient.title}</h3>
                <p>{ingredient.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Dignissim et nisl
        </h2>
        <div className='flex flex-row gap-x-4'>
          {[{ id: 1, text: 'Ultrices risus at tellus facilisi' },
            { id: 2, text: 'Sed amet amet' },
            { id: 3, text: 'Fringilla turpis lacus, est' },
            { id: 3, text: 'Fringilla turpis lacus, est' }].map(recipe => {
            return (
              <div key={recipe.id} className='w-full basis-1/4 h-28 bg-gray-200 relative mt-4 flex items-center justify-center p-4'>
                <Image
                  src="https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=2399&h=594%201x,%20https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=2399&h=594%202x"
                  alt="Picture of the author"
                  layout='fill'
                  className='object-cover z-0'
                />
                <p className='text-center text-lg z-50 '>{recipe.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Menu.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

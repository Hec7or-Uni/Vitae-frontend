import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import React from 'react'
import Schedule from '../components/Schedule'
import LineChart from '../components/Charts/Line'
import Pie from '../components/Charts/Pie'

export default function Home () {
  return (
    <div className='max-w-6xl flex flex-col gap-4 h-full'>
      <div className='w-full flex gap-2'>
        <div className='w-2/3 flex flex-col gap-2'>
          <div className='w-full h-60 flex items-center justify-center px-4 py-3.5 bg-white shadow-md rounded-lg'>
            <LineChart
              labels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
              data={[1, 2, 3, 4, 5, 6, 7].map(() => Math.random(0, 100) * 100)}
            />
          </div>
          <div className='w-full flex justify-center gap-2'>
            <div className='h-64 flex-1 px-1 py-4 bg-white shadow-md rounded-lg'>
              <LineChart
                labels={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']}
                data={[1, 2, 3, 4, 5, 6, 7].map(() => Math.random(0, 100) * 100)}
              />
            </div>
            <div className='h-64 flex-1 px-1 py-4 bg-white shadow-md rounded-lg'>
              <Pie
                labels={['calories', 'carbs', 'fats', 'proteins']}
                data={[1, 2, 3, 4].map(() => Math.random(0, 100) * 100)}
              />
            </div>
          </div>
        </div>
        <div className='divide-y-2 divide-black flex flex-col p-4 w-1/3 bg-white rounded-lg shadow-md'>
          <h3 className='text-lg font-medium mb-3'>Shopping List</h3>
          <ul className='max-h-96 overflow-y-auto pt-1.5'>
            {[
              { id: 1, text: 'apples', quantity: 1 },
              { id: 2, text: 'sugar', quantity: 1 },
              { id: 3, text: 'apples', quantity: 1 }
            ].map(items => {
              return (
                <label key={items.id} htmlFor={items.text} className='flex items-center gap-2'>
                  <input type='checkbox' value={items.text}/>
                  <span>{items.text} x{items.quantity}</span>
                </label>
              )
            })}
          </ul>
        </div>
      </div>
      <Schedule />
    </div>
  )
}

Home.getLayout = function getLayout (page) {
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

  return {
    props: { }
  }
}

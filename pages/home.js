import Layout from '../components/Layout/WithSession'
import { getSession } from 'next-auth/react'
import React from 'react'
import Schedule from '../components/Schedule'
import LineChart from '../components/Charts/LineChart'
import VariousLines from '../components/Charts/VariousLines'
import Pie from '../components/Charts/Pie'
import { format } from '../lib/dates'
import { formatData, getUserNut, getUserIMC } from '../lib/statistics'

export default function Home ({ user, shoppingList }) {
  const userNut = getUserNut(user)
  const userNutFormated = formatData(userNut)
  const userIMC = getUserIMC(user)
  console.log(userIMC)

  // Generacion de la lista de la compra
  const lista = []
  // eslint-disable-next-line no-unused-vars
  for (const [key, i] of Object.entries(shoppingList)) {
    lista.push({
      text: i.nombre,
      quantity: i.cantidad,
      unit: i.unidad
    })
  }

  return (
    <div className='max-w-6xl flex flex-col gap-4 h-full'>
      <div className='w-full flex gap-2'>
        <div className='w-2/3 flex flex-col gap-2'>
          <div className='w-full h-60 flex items-center justify-center px-4 py-3.5 bg-white shadow-md rounded-lg'>
            <VariousLines data={userNutFormated}/>
          </div>
          <div className='w-full flex justify-center gap-2'>
            <div className='h-64 flex-1 px-1 py-4 bg-white shadow-md rounded-lg'>
              <LineChart
                labels={userIMC.map(item => format(item.date).substring(0, 5))}
                data={userIMC.map(item => item.imc.bmi)}
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
            {lista.map(items => {
              return (
                <label key={items.text} htmlFor={items.text} className='flex items-center gap-2'>
                  <input type='checkbox' value={items.text}/>
                  <span>{items.text} x{items.quantity} {items.unit}</span>
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

  const parametros = new URLSearchParams({ email: session.user.email })
  const user = await fetch(`http://localhost:4000/api/user?${parametros}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  const shoppingList = await fetch('http://localhost:4000/api/inventory/shopping-list', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      user,
      shoppingList
    }
  }
}

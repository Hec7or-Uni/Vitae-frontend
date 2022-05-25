import Layout from '../components/Layout/WithSession'
import React from 'react'
import { getSession } from 'next-auth/react'
import { FiUsers, FiUserCheck, FiTrendingUp } from 'react-icons/fi'
import VariousLines from '../components/Charts/VariousLines'
import { format } from '../lib/dates'
import { zip } from '../lib/functions'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from 'react-simple-maps'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

export const MapChart = () => {
  return (
    <ComposableMap projection='geoEqualEarth' height={450} width={1000} className='h-full w-full select-none flex-1'>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill='#DDD'
              stroke='#FFF'
            />
          ))
        }
      </Geographies>
      {[
        [-74.006, 40.7128],
        [-3.7035825, 40.4167047],
        [-0.8809428, 41.6521342],
        [2.320041, 48.8588897]
      ].map(i => {
        return (
          <Marker key={i[0]} coordinates={i}>
            <circle r={2.5} fill='#000' />
          </Marker>
        )
      })}
    </ComposableMap>
  )
}

export default function Admin ({ allData }) {
  const registerUsers = allData.registerUsers
  const labelLine = allData.DailyVisits.map(item => format(item.createdAt.substring(0, 10)).substring(0, 5))
  const registerLine = allData.DailyVisits.map(item => item.visitHome)
  const unregisteredLine = allData.DailyVisits.map(item => item.visitIndex)
  const data = zip(labelLine, registerLine, unregisteredLine).map(items => {
    return {
      date: items[0],
      values: {
        'register users': items[1],
        'unregister users': items[2]
      }
    }
  })

  return (
    <div className='max-w-5xl flex flex-col gap-4 min-h-fit'>
      <div className='w-full min-h-80 flex items-center justify-center px-1 py-4 bg-white shadow-md rounded-lg'>
        <MapChart />
      </div>
      <div className='w-full flex min-h-fit items-center gap-4'>
        <div className='flex flex-col gap-4'>
          {[{
            icon: <FiUsers className='w-6 h-6'/>,
            text: 'Registered users',
            value: registerUsers
          }, {
            icon: <FiUserCheck className='w-6 h-6'/>,
            text: 'Visits by registered users',
            value: allData.DailyVisits[allData.DailyVisits.length - 1].visitHome
          }, {
            icon: <FiTrendingUp className='w-6 h-6'/>,
            text: 'Visits by unregistered users',
            value: allData.DailyVisits[allData.DailyVisits.length - 1].visitIndex
          }].map((item) => {
            return (
              <div key={1} className='h-20 w-80 gap-2 flex items-center justify-between px-8 py-1 bg-white rounded-lg select-none'>
                <div className='flex gap-4 items-center'>
                  {item.icon}
                  <h3 className='text-sm sm:text-base font-medium'>{item.text}</h3>
                </div>
                <span className='text-2xl font-medium ml-4'>{item.value}</span>
              </div>
            )
          })}
        </div>
        <div className='w-full h-full flex-auto px-1 py-4 bg-white shadow-md rounded-lg'>
          <VariousLines labels={labelLine} data={data}/>
        </div>
      </div>
    </div>
  )
}

Admin.getLayout = function getLayout (page) {
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

  const { email, role } = await fetch('http://localhost:4000/api/user/signin', {
    method: 'POST',
    body: JSON.stringify({ email: session.user.email }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())

  const allowedEmails = ['hector@vitop.xyz', 'bolu@vitop.xyz', 'alvaro@vitop.xyz']
  if (!allowedEmails.includes(email) || role !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const data = await fetch('http://localhost:4000/api/user/statistics', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      allData: data
    }
  }
}

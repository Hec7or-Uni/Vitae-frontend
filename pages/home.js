import Layout from '../components/Layout'
import { getSession } from 'next-auth/react'
import React from 'react'
import Schedule from '../components/Schedule'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    },
    filler: {
      propagate: true
    }
  }
}

export const options2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart'
    }
  }
}

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']

export const data1 = {
  labels: weekdays,
  datasets: [
    {
      label: 'Dataset 1',
      data: weekdays.map(() => Math.floor(Math.random() * 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.25,
      fill: 'origin'
    }

  ]
}
export const data2 = {
  labels: months,
  datasets: [
    {
      label: 'Dataset 1',
      data: months.map(() => Math.floor(Math.random() * 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      fill: 'origin'
    }
  ]
}

export const data3 = {
  labels: ['Red', 'Blue', 'Green'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

export default function Home () {
  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <div className='w-full flex'>
        <div className='w-2/3'>
          <div className='w-full h-60 flex items-center justify-center'>
            <Line options={options} data={data1} />
          </div>
          <div className='w-full flex justify-center'>
            <div className='py-6 px-2 h-64 w-1/2'>
              <Line options={options} data={data1} />
            </div>
            <div className='py-6 px-2 h-64 w-1/2'>
              <Pie options={options2} data={data3} />
            </div>
          </div>
        </div>
        <div className='divide-y-2 divide-black flex flex-col  p-4 w-1/3 bg-gray-100'>
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

import Layout from '../components/Layout'
import React from 'react'
import { FiUsers, FiUserCheck, FiTrendingUp } from 'react-icons/fi'
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  responsive: true,
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
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
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
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
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

export default function Storage () {
  return (
    <div className='max-w-5xl grid grid-cols-3 gap-4 overflow-y-auto'>
      <div className='col-span-2'>
        <img src='./map.png'/>
      </div>
      <div className='col-span-1 grid grid-rows-3 grid-flow-col gap-4'>
        <div className='row-span-1 flex items-center gap-6 px-4 py-1.5'>
          <FiUsers className='text-2xl'/>
          <div className='flex flex-col'>
            <h3 className='text-base font-medium'>Online users</h3>
            <span className='text-2xl font-medium'>{Math.floor(Math.random() * 99) + 10}</span>
          </div>
        </div>
        <div className='row-span-1 flex items-center gap-6 px-4 py-1.5'>
          <FiUserCheck className='text-2xl'/>
          <div className='flex flex-col'>
            <h3 className='text-base font-medium'>Registered users</h3>
            <span className='text-2xl font-medium'>{Math.floor(Math.random() * 10)}</span>
          </div>
        </div>
        <div className='row-span-1 flex items-center gap-6 px-4 py-1.5'>
          <FiTrendingUp className='text-2xl'/>
          <div className='flex flex-col'>
            <h3 className='text-base font-medium'>Daily visits</h3>
            <span className='text-2xl font-medium'>{Math.floor(Math.random() * 10)}</span>
          </div>
        </div>
      </div>
      <div className='py-8 px-2 col-span-1'>
        <Line options={options} data={data1} />
      </div>
      <div className='py-8 px-2 col-span-1'>
        <Line options={options} data={data2} />
      </div>
      <div className='py-8 px-2 col-span-1'>
        <Pie data={data3} />
      </div>
    </div>
  )
}

Storage.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

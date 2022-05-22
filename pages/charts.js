// https://react-chartjs-2.js.org/components/line
// https://www.chartjs.org/docs/latest/charts/line.html
// https://www.chartjs.org/docs/latest/getting-started/

import Layout from '../components/Layout/WithSession'
import { Line } from 'react-chartjs-2'

const options = {

}

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
    fill: 'origin'
  }],
  plugins: {
    filler: {
      propagate: true
    }
  }
}

export default function Home () {
  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <Line
        options={options}
        data={data}
      />
    </div>
  )
}

Home.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

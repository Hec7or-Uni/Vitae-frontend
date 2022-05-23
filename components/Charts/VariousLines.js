import React, { useRef, useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
)

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        stepSize: 25
      },
      beginAtZero: true,
      grid: {
        display: false
      }
    }
  },
  plugins: {
    legend: {
      display: false,
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

const COLORS = {
  0: '#16c784', // green
  1: '#3861fb', // blue
  2: '#ea3943', // red
  3: '#f5a341' // orange
}

function createGradient (ctx, area, color) {
  const colorStart = color + '00'
  const colorEnd = color + '88'

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)

  gradient.addColorStop(0.25, colorStart)
  gradient.addColorStop(1, colorEnd)

  return gradient
}

export default function VariousLines ({ labels, data }) {
  const dataset = Object.keys(data[0].values)
  const _data = []
  dataset.forEach(element => {
    const elementType = data.map(item => item.values[element])
    _data.push(elementType)
  })

  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({
    datasets: []
  })

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    setChartData({
      labels,
      datasets: _data.map((data, index) => {
        return {
          backgroundColor: createGradient(chart.ctx, chart.chartArea, COLORS[index]),
          type: 'line',
          label: dataset[index],
          borderColor: COLORS[index],
          borderWidth: 3,
          fill: 'origin',
          pointRadius: 0,
          pointHitRadius: 100,
          data: data,
          tension: 0.33
        }
      }),
      tooltips: {
        mode: 'dataset'
      }
    })
  }, [])

  return (
    <div className='w-full h-full'>
      <Line
        ref={chartRef}
        options={options}
        data={chartData}
        />
    </div>
  )
}

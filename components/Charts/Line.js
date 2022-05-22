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

function createGradient (ctx, area) {
  const colorStart = '#16c78400'
  const colorEnd = '#16c78488'

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top)

  gradient.addColorStop(0.25, colorStart)
  gradient.addColorStop(1, colorEnd)

  return gradient
}

export default function LineChart ({ labels, data }) {
  const chartRef = useRef(null)
  const [chartData, setChartData] = useState({
    datasets: []
  })

  useEffect(() => {
    const chart = chartRef.current
    if (!chart) return

    setChartData({
      labels,
      datasets: [{
        backgroundColor: createGradient(chart.ctx, chart.chartArea),
        type: 'line',
        label: 'Dataset 1',
        borderColor: '#16c784',
        borderWidth: 3,
        fill: 'origin',
        pointRadius: 0,
        pointHitRadius: 100,
        data: data,
        tension: 0.33
      }],
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

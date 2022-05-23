import { __TODAY, toTimestamp, fromTimestamp } from '../lib/dates'
import { zip } from '../lib/functions'

export default function Schedule ({ data }) {
  const DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000
  const timestamps = [0, 1, 2, 3, 4].map(day => __TODAY + day * DIA_EN_MILISEGUNDOS)
  const ayer = __TODAY - DIA_EN_MILISEGUNDOS
  const limite = __TODAY + 4 * DIA_EN_MILISEGUNDOS

  data = data
    .map(item => { return { ...item, date: toTimestamp(item.date) } })
    .filter(item => ayer <= item.date && item.date <= limite)
    .sort((a, b) => a.date - b.date)
    .map(item => { return { ...item, date: fromTimestamp(item.date) } })

  const day0 = data.filter(item => toTimestamp(item.date) === __TODAY - DIA_EN_MILISEGUNDOS)
  const day1 = data.filter(item => toTimestamp(item.date) === __TODAY)
  const day2 = data.filter(item => toTimestamp(item.date) === __TODAY + 2 * DIA_EN_MILISEGUNDOS)
  const day3 = data.filter(item => toTimestamp(item.date) === __TODAY + 3 * DIA_EN_MILISEGUNDOS)
  const day4 = data.filter(item => toTimestamp(item.date) === __TODAY + 4 * DIA_EN_MILISEGUNDOS)

  const days = [day0, day1, day2, day3, day4]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className='w-full h-72 grid grid-cols-10 divide-x divide-black border-l border-r border-black'>
        {zip(timestamps, days).map(element => {
          return (
            <div key={element[0]} className='col-span-2 flex flex-col items-center'>
              <span className='text-2xl font-bold'>{new Date(element[0] - DIA_EN_MILISEGUNDOS).getDate()}</span>
              <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
                {element[1].map(item => {
                  return (
                    <span key={Math.random()} className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm ca'>
                      {item.name}
                    </span>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

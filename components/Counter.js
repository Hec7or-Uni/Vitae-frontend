import React, { useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'

export function Counter ({ number, duration }) {
  const [count, setCount] = useState('0') // number displayed by component

  useEffect(() => {
    let start = 0
    const end = parseInt(number.substring(0, 3))

    // if zero, return
    if (start === end) return

    // find duration per increment
    const totalMilSecDur = parseInt(duration)
    const incrementTime = (totalMilSecDur / end) * 1000

    // timer increments start counter then updates count
    // ends if start reaches end
    const timer = setInterval(() => {
      start += 1
      setCount(String(start) + number.substring(3))
      if (start === end) clearInterval(timer)
    }, incrementTime)
  }, [number, duration])

  return (
    <div className=''>
      <InView as='div'>
        <h3 className='flex '>
          <span className='text-5xl font-bold font-sans'>{Number(number) > 2500 && '+'}{count}</span>
        </h3>
      </InView>
    </div>
  )
}

export function Observer ({ label, number, duration, reset }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <InView>
          {({ inView, ref, reset }) => (
            <div ref={ref}>
              {inView && <Counter number={number} duration={duration}/>}
            </div>
          )}
      </InView>
      <p className='text-xl font-medium'>{label}</p>
    </div>
  )
}

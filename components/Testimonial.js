import Image from 'next/image'
import { VscVerified } from 'react-icons/vsc'

export default function Testimonial ({ text, picture, name, rol }) {
  return (
    <div className='bg-white w-72 shadow-lg rounded-xl p-4 hover:-translate-y-4 duration-300 select-none'>
      <p className='text-gray-600'>
        <span className='font-bold text-indigo-500 text-lg'>
          “
        </span>
        {text}
        <span className='font-bold text-indigo-500 text-lg'>
          ”
        </span>
      </p>
      <div className='flex items-center mt-4'>
        <a href='#' className='h-10 w-10 block relative'>
          <Image
            src={picture}
            alt='Picture of the author'
            layout='fill'
            className='mx-auto object-cover rounded-full '
          />
        </a>
        <div className='flex flex-col ml-2 justify-between'>
          <span className='font-semibold text-indigo-500 text-sm'>
            {name}
          </span>
          <span className='text-xs flex items-center'>
              {rol}
              <VscVerified className='ml-2 h-4 w-4'/>
          </span>
        </div>
      </div>
    </div>
  )
}

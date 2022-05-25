import Link from 'next/link'
import Image from 'next/image'
import placeHolder from '../public/defaultImage.png'

export default function Card ({ id, img }) {
  return (
    <Link href={'/recipe/' + id}>
      <a className='w-32 h-44 sm:w-36 sm:h-52 md:w-40 md:h-56 rounded-lg relative '>
        <div className='w-full h-full bg-black rounded-lg absolute z-10 opacity-0 hover:opacity-10 duration-300'/>
        <Image
          src={img || placeHolder}
          alt='Picture of the author'
          layout='fill'
          className='object-cover object-center rounded-lg select-none z-0'
        />
      </a>
    </Link>
  )
}

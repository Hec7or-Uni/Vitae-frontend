import Link from 'next/link'
import Image from 'next/image'
import placeHolder from '../public/defaultImage.png'

export default function Card ({ id, img }) {
  return (
    <Link href={'/recipe/' + id}>
      <a className='w-40 h-56 rounded-lg relative'>
        <Image
          src={img || placeHolder}
          alt='Picture of the author'
          layout='fill'
          className='object-cover object-center rounded-lg select-none'
        />
      </a>
    </Link>
  )
}

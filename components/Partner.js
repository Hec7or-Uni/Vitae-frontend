import Image from 'next/image'

export default function Partner ({ img, title, description, email }) {
  return (
    <div className='flex items-center gap-10'>
      <div className='w-44 h-44 relative rounded-lg bg-gray-200'>
        <Image
          src={img}
          alt='Picture of the author'
          layout='fill'
          className='object-cover object-center rounded-lg select-none'
        />
      </div>
      <div className='flex flex-col gap-1 max-w-prose'>
        <h3 className='font-bold text-lg'>{title}</h3>
        <p>{description}</p>
        <p className='font-medium'>{email}</p>
      </div>
    </div>
  )
}

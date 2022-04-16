import Image from 'next/image'

export default function Partner ({ img, title, description, email }) {
  return (
    <div className='flex items-center gap-10'>
      <div className='w-44 h-44 relative bg-gray-200'>
        <Image
          src={img}
          alt="Picture of the author"
          layout='fill'
          className="object-cover object-center rounded-lg select-none"
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

Partner.defaultProps = {
  img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  title: 'Enim risus id risus faucibus.',
  description: 'Enim risus id risus faucibus. Quis diam sed condimentum a. Dignissim sed mattis vitae quis egestas.',
  email: 'hec7or@vitae.co'
}

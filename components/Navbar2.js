import Link from 'next/link'

export default function Navbar2 () {
  return (
    <div className='h-16 w-full flex items-center absolute top-0 z-50 border-b-2 border-black'>
      <div className='container mx-auto'>
        <Link href='/'>
          <a className='px-4 py-1.5 rounded hover:bg-gray-200'>
            <span className="uppercase font-bold text-lg tracking-wide">
              Vitop
            </span>
          </a>
        </Link>
      </div>
    </div>
  )
}

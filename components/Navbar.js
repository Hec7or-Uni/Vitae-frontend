import Link from 'next/link'

export default function Navbar () {
  return (
    <div className='h-16 w-full flex items-center'>
      <Link href='/'>
        <a className='px-4 py-1.5 rounded hover:bg-gray-200'>
          <span className="uppercase font-bold text-lg tracking-wide">
            Vitop
          </span>
        </a>
      </Link>
    </div>
  )
}

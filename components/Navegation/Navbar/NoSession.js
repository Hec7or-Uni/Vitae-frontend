import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from '../../Logo'
import User from '../../User'
import { useScreen } from '../../../context/ScreenContext'

export default function Navbar () {
  const { data: session } = useSession()
  const { handleDocs } = useScreen()
  return (
    <div className="sticky top-0 h-16 w-full flex items-center tracking-wide z-40 bg-gray-900 bg-opacity-50">
      <div className="flex justify-center items-center container mx-auto relative">
        <Logo url={'/'} />
        <div className='hidden sm:flex'>
          <Link href='/'>
            <a className='capitalize text-sm font-bold tracking-normal px-4 py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'>
              Home
            </a>
          </Link>
          <Link href='/about'>
            <a className='capitalize text-sm  font-bold tracking-normal px-4 py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'>
              About
            </a>
          </Link>
          <button
            onClick={handleDocs}
            className='capitalize text-sm  font-bold tracking-normal px-4 py-2.5 rounded-lg text-white duration-300 hover:underline hover:underline-offset-2'
          >
            Docs
          </button>
        </div>
        <div className="flex gap-x-3 absolute right-0 mx-4">
        {session
          ? (
            <div className='flex items-center gap-4'>
              <Link href='/home'>
                <a className='capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white hover:bg-gray-600 hover:bg-opacity-25 duration-300'>
                  Back To Office
                </a>
              </Link>
              <User/>
            </div>
            )
          : (
            <nav className='flex gap-2 items-center'>
              <Link href='/login'>
                <a className='capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white hover:bg-gray-600 hover:bg-opacity-25 duration-300'>
                  login
                </a>
              </Link>
              <Link href='/invite'>
                <a className='capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white bg-blue-600 hover:bg-blue-700 duration-300'>
                  Sign Up
                </a>
              </Link>
            </nav>
            )}
        </div>
      </div>
    </div>
  )
}

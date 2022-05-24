import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Logo from '../../Logo'
import User from '../../User'
import { useScreen } from '../../../context/ScreenContext'

export default function Navbar () {
  const { mzLayout } = useScreen()
  const { data: session } = useSession()
  return (
    <div className={`sticky top-0 h-16 w-full flex items-center tracking-wide z-50 bg-gray-900 bg-opacity-90 ${!mzLayout ? 'flex' : 'hidden'}`}>
      <div className="flex justify-end items-center w-full relative mx-10">
        <Logo url={'/'} />
        <div className='flex items-center gap-4'>
          <Link href='/'>
            <a className='capitalize text-xs font-bold tracking-normal px-4 py-2.5 rounded-lg text-white hover:bg-gray-600 hover:bg-opacity-25 duration-300'>
              Back To Home
            </a>
          </Link>
          {session && <User/>}
        </div>
      </div>
    </div>
  )
}

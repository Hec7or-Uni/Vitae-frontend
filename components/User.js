import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Tippy from '@tippyjs/react'
import { FiLogOut } from 'react-icons/fi'
import { useScreen } from '../context/ScreenContext'

const image = 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074'

export default function User () {
  const { handleDocs } = useScreen()
  const { data: session } = useSession()
  const [menu, setMenu] = useState(false)
  const handleMenu = () => setMenu(!menu)

  useEffect(() => {
    const checkIfClickedOutside = () => {
      if (menu) {
        setMenu(false)
      }
    }
    document.addEventListener('click', checkIfClickedOutside)
    return () => {
      document.removeEventListener('click', checkIfClickedOutside)
    }
  }, [menu])

  return (<div className='relative'>
    <Tippy
      arrow={false}
      content={
        <span className='bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md truncate'>
          {session.user.username || 'Anonymous'}
        </span>
      }
    >
      <button
        onClick={() => {
          handleMenu()
        }}
        className='flex items-center'
      >
        <div className='w-8 h-8 relative bg-white rounded-full'>
          <Image
            src={image}
            alt='Picture of the author'
            layout='fill'
            className='object-cover rounded-full'
          />
        </div>
      </button>
    </Tippy>
    {menu && (
      <div className='rounded w-40 flex flex-col gap-3 divide-y divide-gray-500 bg-white shadow-md bg-blend-hard-light px-2 py-1 absolute top-0 right-0 mt-10 truncate'>
        <div className='flex flex-col opacity-70'>
          <span className='text-sm truncate font-medium'>Email:</span>
          <span className='text-xs truncate'>{session.user.email}</span>
        </div>
        <div className='flex flex-col divide-y-2'>
        <div className='sm:hidden flex flex-col items-start'>
          <Link href='/'>
            <a className='py-1.5 opacity-60 hover:opacity-100 hover:bg-red-300 hover:bg-opacity-30 duration-300 hover:text-red-800 rounded px-3'>
              Home
            </a>
          </Link>
          <Link href='/about'>
            <a className='py-1.5 opacity-60 hover:opacity-100 hover:bg-red-300 hover:bg-opacity-30 duration-300 hover:text-red-800 rounded px-3'>
              About
            </a>
          </Link>
          <button
            onClick={handleDocs}
            className='py-1.5 opacity-60 hover:opacity-100 hover:bg-red-300 hover:bg-opacity-30 duration-300 hover:text-red-800 rounded px-3'
          >
            Docs
          </button>
          </div>
          <div className='mt-2 py-2 opacity-60 hover:opacity-100 hover:bg-red-300 hover:bg-opacity-30 duration-300 hover:text-red-800 rounded px-3'>
            <button
              onClick={() => { signOut() }}
              className='flex items-center gap-2'
            >
              <FiLogOut className='text-sm' />
              <span className='text-sm'>Logout</span>
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  )
}

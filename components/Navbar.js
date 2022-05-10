import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import copy from 'copy-to-clipboard'
import { FiUserPlus, FiLogOut } from 'react-icons/fi'
import { useScreen } from '../context/ScreenContext'

const user = {
  name: 'Hec7orci7o',
  image: 'https://images.unsplash.com/photo-1638913662584-731da41f5a59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  email: 'contact@hec7or.me'
}

export default function Navbar () {
  const [menu, setMenu] = useState(false)
  const { mzLayout } = useScreen()
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

  return (
    <div className={`h-16 w-full items-center justify-between px-2 ${!mzLayout ? 'flex' : 'hidden'}`}>
      <Link href='/'>
        <a className='px-4 py-1.5 rounded hover:bg-gray-200'>
          <span className='uppercase font-bold text-lg tracking-wide'>
            Vitop
          </span>
        </a>
      </Link>
      <div>
        {user !== null
          ? (
          <div className='flex items-center gap-4'>
            <button
              onClick={() =>
                copy('https://hotasm.vercel.app/', {
                  debug: false,
                  format: 'text/plain'
                })
              }
              className='flex items-center text-green-600 gap-2 bg-green-500 px-4 py-1.5 bg-opacity-20 hover:bg-opacity-20 rounded hover:bg-green-600 focus:ring-green-500 focus:ring-2 focus:ring-opacity-75'
            >
              <FiUserPlus className='text-lg' />
              <span className='text-base'>Invite</span>
            </button>
            <div className='relative'>
              <Tippy
                arrow={false}
                content={
                  <span className='bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md'>
                    {user.name}
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
                      src={user.image}
                      alt='Picture of the author'
                      layout='fill'
                      className='object-cover rounded-full'
                    />
                  </div>
                </button>
              </Tippy>
              {menu && (
                <div className='w-40 flex flex-col gap-3 divide-y divide-gray-500 bg-white shadow-md bg-blend-hard-light px-2 py-1 absolute top-0 right-0 mt-10 truncate'>
                  <div className='flex flex-col opacity-70'>
                    <span className='text-sm'>{user.name}</span>
                    <span className='text-xs'>{user.email}</span>
                  </div>
                  <div className='flex flex-col'>
                    <div className='mt-2 py-2 opacity-60 hover:opacity-100 hover:bg-gray-300 hover:bg-opacity-30 rounded px-3'>
                      <button
                        onClick={() => {}}
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
          </div>
            )
          : (
          <>
            <button
              onClick={() => {}}
              className='flex items-center px-3.5 py-1.5 rounded bg-indigo-500 hover:bg-indigo-600'
            >
              <span className='text-white text-sm capitalize font-medium tracking-wide'>
                Login
              </span>
            </button>
          </>
            )}
      </div>
    </div>
  )
}

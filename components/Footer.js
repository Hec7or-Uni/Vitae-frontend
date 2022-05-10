import {
  FiMaximize,
  FiMinimize,
  FiSidebar
} from 'react-icons/fi'
import Tippy from '@tippyjs/react'
import { useScreen } from '../context/ScreenContext'
import Link from 'next/link'

export default function Footer () {
  const {
    mzLayout,
    leftSidebar,
    handleMode,
    handleSl
  } = useScreen()
  return (
    <div className='h-10 w-full flex items-center justify-between px-2'>
      <div className='flex gap-x-4'>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md'>
              Collapse sidebar
            </span>
          }
        >
          <button onClick={handleSl}>
            <FiSidebar
              className={`text-lg cursor-pointer stroke-1 hover:stroke-2 duration-150
               ${leftSidebar ? 'rotate-180' : ''}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md'>
              Turn on Zen mode
            </span>
          }
        >
          <button onClick={handleMode}>
            {mzLayout
              ? (
              <FiMinimize className='text-lg cursor-pointer stroke-1 hover:stroke-2' />
                )
              : (
              <FiMaximize className='text-lg cursor-pointer stroke-1 hover:stroke-2' />
                )}
          </button>
        </Tippy>
      </div>
      <div className='flex gap-4'>
        <Link href='/tos'>
          <a>
            Terms of Service
          </a>
        </Link>
        <Link href='/privacypolicy'>
          <a>
            Privacy Policy
          </a>
        </Link>
      </div>
    </div>
  )
}

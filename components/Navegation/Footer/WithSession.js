import { useScreen } from '../../../context/ScreenContext'
import Tippy from '@tippyjs/react'
import {
  FiMaximize,
  FiMinimize,
  FiSidebar,
  FiShare2,
  FiInfo,
  FiUserPlus,
  FiGithub,
  FiMessageCircle,
  FiLock
} from 'react-icons/fi'

export default function Footer () {
  const {
    mzLayout,
    leftSidebar,
    handleMode,
    handleSl
  } = useScreen()
  return (
    <div className='h-10 w-full flex items-center justify-between px-4 bg-gray-900 bg-opacity-90'>
      <div className='flex gap-x-4'>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
              Collapse sidebar
            </span>
          }
        >
          <button onClick={handleSl}>
            <FiSidebar
              className={`text-lg cursor-pointer stroke-2 duration-150 text-white select-none
               ${leftSidebar ? 'rotate-180' : ''}`}
            />
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
              Turn on Zen mode
            </span>
          }
        >
          <button onClick={handleMode}>
            {mzLayout
              ? (<FiMinimize className='text-lg cursor-pointer stroke-2 text-white select-none' />)
              : (<FiMaximize className='text-lg cursor-pointer stroke-2 text-white select-none' />)}
          </button>
        </Tippy>
      </div>
      <div className='flex gap-4'>
        <Tippy
          arrow={false}
          trigger={'click'}
          allowHTML={true}
          content={
            <div className='flex flex-col items-start mb-4 bg-gray-800 p-4 rounded-lg text-white divide-y'>
              <a href='/' className='flex gap-3 items-start justify-start mb-4 cursor-pointer'>
                <FiMessageCircle className='w-5 h-5'/>
                <p className='text-sm font-medium'>Habla con nosotros</p>
              </a>
              <div className='flex flex-col items-start gap-2.5'>
                <div className='flex gap-3 items-start justify-start mt-4'>
                  <FiGithub className='w-5 h-5'/>
                  <p className='text-sm font-medium'>GitHub</p>
                </div>
                <div className='flex gap-3 items-start justify-start'>
                  <FiUserPlus className='w-5 h-5'/>
                  <p className='text-sm font-medium'>Invitar</p>
                </div>
                <div className='flex gap-3 items-start justify-start'>
                  <FiLock className='w-5 h-5'/>
                  <p className='text-sm font-medium'>Términos y privacidad</p>
                </div>
                <div className='flex gap-3 items-start justify-start mt-1'>
                  <p className='text-sm font-medium opacity-50'>Vitop v1.0.0</p>
                </div>
              </div>
            </div>
          }
        >
          <button
            onClick={() => {}}
            className='flex items-center gap-2 font-bold text-xs opacity-90 hover:opacity-100 text-white select-none relative'
          >
            <FiInfo className='w-4 h-4 cursor-pointer stroke-2 text-white select-none'/>
            Help and comments
          </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className='bg-gray-200 tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md truncate select-none'>
              Share
            </span>
          }
        >
          <button
            onClick={() => {}}
            className='flex items-center font-bold text-xs opacity-90 hover:opacity-100 select-none'
          >
            <FiShare2 className='w-4 h-4 cursor-pointer stroke-2 text-white select-none'/>
          </button>
        </Tippy>
      </div>
    </div>
  )
}

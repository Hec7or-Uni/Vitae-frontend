import { useScreen } from '../../../context/ScreenContext'
import { useShare } from '../../../context/ShareContext'
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
  const { handleOpen } = useShare()
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
          interactive={true}
          allowHTML={true}
          content={
            <div className='flex flex-col items-start mb-4 bg-gray-800 p-4 rounded-lg text-white divide-y'>
              <a
                href='mailto:hi@vitop.xyz'
                className='py-1.5 px-2 flex gap-3 items-center justify-start mb-2 cursor-pointer opacity-60 hover:opacity-100 hover:bg-gray-100 hover:bg-opacity-5 rounded-md'
                >
                <FiMessageCircle className='w-4 h-4'/>
                <p className='text-xs font-medium'>Habla con nosotros</p>
                <span className='text-xs font-medium bg-black bg-opacity-40 py-1 px-2 rounded-lg'>Q</span>
              </a>
              <div className='w-full flex flex-col items-start'>
                <a href='https://github.com/orgs/Hec7or-Uni/teams/vitae/repositories' className='w-full mt-2 py-2.5 px-2 flex gap-3 items-center justify-start cursor-pointer opacity-60 hover:opacity-100 hover:bg-gray-100 hover:bg-opacity-5 rounded-md'>
                  <FiGithub className='w-4 h-4'/>
                  <p className='text-xs font-medium'>GitHub</p>
                </a>
                <button
                  onClick={handleOpen}
                  className='w-full py-2.5 px-2 flex gap-3 items-center justify-start  cursor-pointer opacity-60 hover:opacity-100 hover:bg-gray-100 hover:bg-opacity-5 rounded-md'
                >
                  <FiUserPlus className='w-4 h-4'/>
                  <p className='text-xs font-medium'>Invitar</p>
                </button>
                <a href='tos' className='w-full py-2.5 px-2 flex gap-3 items-center justify-start  cursor-pointer opacity-60 hover:opacity-100 hover:bg-gray-100 hover:bg-opacity-5 rounded-md'>
                  <FiLock className='w-4 h-4'/>
                  <p className='text-xs font-medium'>Términos y privacidad</p>
                </a>
                <div className='flex gap-3 items-start justify-start mt-2'>
                  <p className='text-xs font-medium opacity-40'>Vitop v1.0.0</p>
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
            onClick={handleOpen}
            className='flex items-center font-bold text-xs opacity-90 hover:opacity-100 select-none'
          >
            <FiShare2 className='w-4 h-4 cursor-pointer stroke-2 text-white select-none'/>
          </button>
        </Tippy>
      </div>
    </div>
  )
}

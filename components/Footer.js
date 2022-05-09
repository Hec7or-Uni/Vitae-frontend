import {
  FiMaximize,
  // FiMinimize,
  FiSidebar
} from 'react-icons/fi'

export default function Footer () {
  return (
    <div className='h-10 w-full flex items-center'>
      <div className='flex gap-x-4 px-2'>
        <FiSidebar className='text-lg'/>
        <FiMaximize className='text-lg'/>
      </div>
    </div>
  )
}

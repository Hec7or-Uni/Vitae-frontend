import Link from 'next/link'
import { useScreen } from '../context/ScreenContext'

export default function SButton ({ id, link, icon, text, active, handler }) {
  const { leftSidebar } = useScreen()

  return (
    <Link href={link}>
      <a
        key={id}
        onClick={() => handler(id)}
        className={`flex flex-col justify-center items-center gap-2 py-4 tracking-normal cursor-pointer 
          ${active === id ? 'bg-gray-200' : ''}`}
      >
        <span className='px-5'>
          {icon}
        </span>
        {!leftSidebar && (
            <span className='text-sm px-4 w-24 capitalize text-center'>{text}</span>
        )}
      </a>
    </Link>
  )
}

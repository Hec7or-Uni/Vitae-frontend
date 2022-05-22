import Link from 'next/link'
import { useScreen } from '../../../context/ScreenContext'

export default function SButton ({ id, link, icon, text, active, handler }) {
  const { leftSidebar } = useScreen()

  return (
    <Link href={link}>
      <a
        key={id}
        onClick={() => handler(id)}
        className={`flex flex-col justify-center items-center gap-2 py-4 tracking-normal cursor-pointer border-l-2 border-transparent
          ${active === id ? 'border-white' : ''}`}
      >
        <span className='px-5'>
          {icon}
        </span>
        {!leftSidebar && (
            <span className='font-bold text-xs px-4 w-24 capitalize text-center'>{text}</span>
        )}
      </a>
    </Link>
  )
}

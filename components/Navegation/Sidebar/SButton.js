import Link from 'next/link'
import { useScreen } from '../../../context/ScreenContext'

export default function SButton ({ id, link, icon, text, active }) {
  const { leftSidebar } = useScreen()
  return (
    <Link href={link}>
      <a
        key={id}
        className={`flex flex-col justify-center items-center gap-2 py-4 tracking-normal cursor-pointer border-l-2
          ${active === true ? 'border-black bg-opacity-10 bg-black' : 'border-transparent'}`}
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

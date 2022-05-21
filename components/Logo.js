import Link from 'next/link'
import { AiOutlineHeart } from 'react-icons/ai'

export default function Logo ({ url, toggle }) {
  return (
    <Link href={url}>
      <a className="flex items-center gap-x-2 absolute left-0 mx-4 hover:opacity-90">
        <AiOutlineHeart className="h-7 w-7 text-green-500 " />
        {!toggle && (
          <div>
            <span className="font-bold text-white text-lg">Vitop</span>
          </div>
        )}
      </a>
    </Link>
  )
}

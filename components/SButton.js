import Link from 'next/link'

export default function SButton ({ link, icon, text }) {
  return (
    <Link href={link}>
    <a className="flex flex-col justify-center items-center gap-2 py-4 tracking-normal cursor-pointer">
      <span className="px-5">
        {icon}
      </span>
      <span className="text-sm px-4 w-24 capitalize text-center ">{text}</span>
    </a>
  </Link>
  )
}

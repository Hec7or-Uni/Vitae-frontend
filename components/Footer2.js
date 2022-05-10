import Link from 'next/link'

export default function Footer2 () {
  return (
    <div className='h-10 w-full flex items-center border-t-2 border-black'>
      <div className='container mx-auto flex justify-between '>
        <div>
          <p className='select-none'>
            ©2022 vitop.co. All Rights Reserved.
          </p>
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
    </div>
  )
}

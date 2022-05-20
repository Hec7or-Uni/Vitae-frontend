import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'

export default function Login () {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn('credentials', {
      email: e.target.email.value,
      password: e.target.password.value,
      redirect: false
    }).then(() => router.push('http://localhost:3000/home'))
      .catch(err => console.error('error', err))
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5'>
      <div className='w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-6'>
        <div className='flex items-center justify-center'>
          <span className='text-xl font-medium text-gray-900'>Login</span>
        </div>
        <form
          method='post'
          onSubmit={(e) => handleSubmit(e)}
          className='mt-4'
        >
          <label type='email' id='email' name='email' className='block'>
            <span className='text-sm text-gray-700'>Email</span>
            <input
              id='email'
              type='email'
              name='email'
              className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
              required
            />
          </label>
          <label type='password' id='password' name='password' className='block mt-3'>
            <span className='text-sm text-gray-700'>Password</span>
            <input
              id='password'
              type='password'
              name='password'
              className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
              required
            />
          </label>
          <div className='flex items-center justify-between mt-4'>
            <div>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='text-blue-600 border form-checkbox'
                />
                <span className='mx-2 text-sm text-gray-600'>Remember me</span>
              </label>
            </div>
            <div>
              <Link href="/recovery">
                <a className='block text-sm text-blue-600 fontme hover:underline'>
                  Forgot your password?
                </a>
              </Link>
            </div>
          </div>
          <div className='mt-6'>
            <button
              type='submit'
              className='capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700'
            >
              Sign in
            </button>
          </div>
          <hr className='my-4'/>
          <div className='mt-6 flex gap-4'>
            <button
              onClick={async () => await signIn('google')}
              type='button'
              className='capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200'
            >
              <RiGoogleFill className='text-xl' />
              <span>Google</span>
            </button>
            <button
              onClick={async () => await signIn('twitter')}
              type='button'
              className='capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200'
            >
              <RiTwitterLine className='text-xl' />
              <span>Twitter</span>
            </button>
            <button
              onClick={async () => await signIn('instagram')}
              type='button'
              className='capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200'
            >
              <RiInstagramLine className='text-xl' />
              <span>Instagram</span>
            </button>
          </div>
        </form>
      </div>

      <div className='flex w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between'>
        <Link href='/invite'>
          <a
            className='block text-sm text-blue-700 fontme hover:underline'
            href='/invite'
          >
            Don’t have an account?
          </a>
        </Link>
        <Link href='/invite'>
          <a className='capitalize w-1/3 tracking-normal px-4 py-2.5 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700'>
            Join Now
          </a>
        </Link>
      </div>
    </div>
  )
}

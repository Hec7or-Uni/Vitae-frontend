import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'

export default function Login () {
  function handleSubmit (e) {
    e.preventDefault()
    const { email, password } = e.target
    return new Promise(function (resolve, reject) {
      signIn('credentials', {
        email: email.value,
        password: password.value,
        redirect: false
      }).then((res) => {
        if (!res.ok) {
          reject(new Error('error'))
        }
        resolve('ok')
      })
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5 dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
      <div className="w-full max-w-sm p-4 bg-white dark:bg-color-light-neutral-1 rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900">Login</span>
        </div>
        <form
          method='post'
          onSubmit={(e) => handleSubmit(e)}
          className="mt-4"
        >
          <label type="email" id="email" name="email" className="block">
            <span className="text-sm text-gray-700">Email</span>
            <input
              id="email"
              type="email"
              name="email"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label type="password" id="password" name="password" className="block mt-3">
            <span className="text-sm text-gray-700">Password</span>
            <input
              id="password"
              type="password"
              name="password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <div className="flex items-center justify-between mt-4">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="text-blue-600 border form-checkbox"
                />
                <span className="mx-2 text-sm text-gray-600">Remember me</span>
              </label>
            </div>
            <div>
              <a
                className="block text-sm text-blue-600 fontme hover:underline"
                href="#"
              >
                Forgot your password?
              </a>
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Sign in
            </button>
          </div>
          <hr className='my-4'/>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => signIn('google')}
              type="button"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200"
            >
              <RiGoogleFill className='text-xl' />
              <span>Google</span>
            </button>
            <button
              onClick={() => signIn('twitter')}
              type="button"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200"
            >
              <RiTwitterLine className='text-xl' />
              <span>Twitter</span>
            </button>
            <button
              onClick={() => signIn('instagram')}
              type="button"
              className="capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center text-black bg-white-600 shadow-md rounded-md hover:bg-gray-100 flex items-center gap-1 hover:scale-95 duration-200"
            >
              <RiInstagramLine className='text-xl' />
              <span>Instagram</span>
            </button>
          </div>
        </form>
      </div>

      <div className="flex w-full max-w-sm p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between">
        <Link href="/invite">
          <a
            className="block text-sm text-blue-700 fontme hover:underline"
            href="/invite"
          >
            Don’t have an account?
          </a>
        </Link>
        <Link href="/invite">
          <a className="capitalize w-1/3 tracking-normal px-4 py-2.5 text-xs font-bold text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Join Now
          </a>
        </Link>
      </div>
    </div>
  )
}

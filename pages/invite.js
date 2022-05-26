import Link from 'next/link'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

export default function Invite () {
  const [pw, setPw] = useState('')
  const [secureLVL, setSecureLVL] = useState(-1)
  const router = useRouter()

  useEffect(() => {
    let secureLevel = -1
    const check1 = /[A-Z]/
    const check2 = /\d+/
    if (pw !== '') secureLevel = 0
    if (pw.length >= 5 && check1.test(pw)) secureLevel += 1
    if (pw.length >= 5 && check2.test(pw)) secureLevel += 1
    setSecureLVL(secureLevel)
  }, [pw, secureLVL])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const salt = crypto.randomBytes(32).toString('hex')
  //   const query = {
  //     name: e.target.name.value,
  //     lastname: e.target.lastName.value,
  //     username: e.target.username.value,
  //     email: e.target.email.value,
  //     salt: salt,
  //     hash: CryptoJS.SHA512(salt + e.target.password.value).toString()
  //   }

  //   return new Promise((resolve, reject) => {
  //     const res = fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/signup`, {
  //       method: 'POST',
  //       body: JSON.stringify(query),
  //       headers: { 'Content-Type': 'application/json' }
  //     })
  //     if (res.status === 201 && res.ok === true) {
  //       resolve('ok')
  //     }
  //     reject(new Error('error'))
  //   })
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const salt = crypto.randomBytes(32).toString('hex')
    const query = {
      name: e.target.name.value,
      lastname: e.target.lastName.value,
      username: e.target.username.value,
      email: e.target.email.value,
      salt: salt,
      hash: CryptoJS.SHA512(salt + e.target.password.value).toString()
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/signup`, {
      method: 'POST',
      body: JSON.stringify(query),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-6'>
        <div className='flex items-center justify-center'>
          <span className='text-xl font-medium text-gray-900'>
            Create your account.
          </span>
        </div>
        <form
          method='post'
          onSubmit={(e) => {
            toast
              .promise(handleSubmit(e), {
                loading: 'Saving user in the database',
                success: 'Successfully registered ',
                error: 'Error while registering'
              }, {
                loading: { duration: 4000 },
                success: { duration: 4000 },
                error: { duration: 4000 }
              })
              .then(() => router.push('/login'))
              .catch(err => console.error(err))
          }}

          className='mt-4'
        >
          <div className='flex gap-x-2 mt-3'>
            <label type='name' className='block'>
              <span className='text-sm text-gray-700'>Name</span>
              <input
                type='name'
                id='name'
                name='name'
                autoComplete='name'
                className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
                required
              />
            </label>
            <label type='lastName' className='block'>
              <span className='text-sm text-gray-700'>Last Name</span>
              <input
                type='lastName'
                id='lastName'
                name='lastName'
                autoComplete='last name'
                className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
                required
              />
            </label>
          </div>
          <label type='username' className='block mt-1.5'>
            <span className='text-sm text-gray-700'>Username</span>
            <input
              type='username'
              id='username'
              name='username'
              autoComplete='username'
              className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
              required
            />
          </label>
          <label type='email' className='block mt-1.5'>
            <span className='text-sm text-gray-700'>Email</span>
            <input
              id='email'
              type='email'
              name='email'
              autoComplete='email'
              className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
              required
            />
          </label>
          <label type='password' className='block mt-1.5'>
            <span className='text-sm text-gray-700'>Password</span>
            <input
              id='password'
              type='password'
              name='password'
              autoComplete='current-password'
              onChange={(e) => setPw(e.target.value)}
              className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
              required
            />
          </label>
          <div className='grid w-full h-1 grid-cols-9 gap-4 mt-3'>
            {secureLVL === -1
              ? (<>
                <span className='h-full col-span-3 rounded bg-gray-300' />
                <span className='h-full col-span-3 rounded bg-gray-300' />
                <span className='h-full col-span-3 rounded bg-gray-300' />
              </>)
              : (<> {secureLVL === 0
                  ? (<>
                    <span className='h-full col-span-3 rounded bg-red-500' />
                    <span className='h-full col-span-3 rounded bg-gray-300' />
                    <span className='h-full col-span-3 rounded bg-gray-300' />
                  </>)
                  : (<> {secureLVL === 1
                      ? (<>
                        <span className='h-full col-span-3 rounded bg-yellow-300' />
                        <span className='h-full col-span-3 rounded bg-yellow-300' />
                        <span className='h-full col-span-3 rounded bg-gray-300' />
                      </>)
                      : (<>
                        <span className='h-full col-span-3 rounded bg-green-300' />
                        <span className='h-full col-span-3 rounded bg-green-300' />
                        <span className='h-full col-span-3 rounded bg-green-300' />
                      </>)}
                  </>)}
              </>)}
          </div>
          <label className='inline-flex items-center mt-4'>
            <input
              id='checkbox'
              type='checkbox'
              className='text-blue-600 border form-checkbox'
            />
            <span className='ml-2 text-sm text-gray-600'>
              I accept the{' '}
              <Link href='/tos'>
                <a className='font-bold hover:underline underline-offset-1'>Terms of Service</a>
              </Link>
              {' '}and the{' '}
              <Link href='/privacypolicy'>
                <a className='font-bold hover:underline underline-offset-1'>Privacy Policy</a>
              </Link>
            </span>
          </label>
          <div className='mt-6'>
            <button
              type='submit'
              className='w-full text-center capitalize text-xs font-bold tracking-normal px-4 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 duration-300'
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className='flex w-full max-w-md p-4 bg-white rounded-md shadow-md sm:p-5 items-center justify-between'>
        <Link href='/login'>
          <a className='block text-sm text-blue-700 fontme hover:underline underline-offset-1'>
            Have an account?
          </a>
        </Link>
        <Link href='/login'>
          <a className='w-1/3 text-center capitalize text-xs font-bold tracking-normal px-4 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 duration-300'>
            Sign in
          </a>
        </Link>
      </div>
    </div>
  )
}

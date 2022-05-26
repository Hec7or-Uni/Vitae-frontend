import Layout from '../components/Layout/WithSession'
import { getSession, signIn, signOut } from 'next-auth/react'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'
import Tippy from '@tippyjs/react'
import toast, { Toaster } from 'react-hot-toast'
import cookie from '../lib/cookie'

export default function Settings ({ user, token }) {
  const google = user.accounts.some(item => item.provider === 'google')
  const twitter = user.accounts.some(item => item.provider === 'twitter')
  const instagram = user.accounts.some(item => item.provider === 'instagram')

  const handleUpdate = async (e) => {
    e.preventDefault()
    const query = {
      email: user.email,
      name: e.target.name.value || user.name,
      birth: e.target.birth.value || user.birth,
      gender: e.target.gender.value || user.gender,
      height: Number(e.target.height.value) || user.height,
      weight: Number(e.target.weight.value) || user.weight[user.weight.length - 1]
    }
    const uri = `${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/update-account`
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(query)
      })
        .then((res) => {
          if (res.status === 204 && res.ok === true) {
            resolve('ok')
          } else {
            reject(new Error('error'))
          }
        }).catch(err => {
          reject(new Error(err))
        })
    })
  }

  const handleDelete = () => {
    const uri = `${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/delete-account`
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email: user.email })
      })
        .then((res) => {
          if (res.status === 204 && res.ok === true) {
            resolve('ok')
          } else {
            reject(new Error('error'))
          }
        }).catch(err => {
          reject(new Error(err))
        })
    })
  }

  const disconnect = async (provider) => {
    const uri = `${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/disconnect-account`
    await fetch(uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, provider })
    })
  }

  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <Toaster position="top-center" reverseOrder={false} />
      <form
        method='PUT'
        onSubmit={(e) => {
          toast
            .promise(handleUpdate(e), {
              loading: 'Updating data',
              success: 'Data updated successfully',
              error: 'Error while updating data'
            }, {
              loading: { duration: 4000 },
              success: { duration: 4000 },
              error: { duration: 4000 }
            })
        }}
        className='w-full sm:w-2/3 flex flex-col gap-4'
      >
        <div className='flex gap-4 flex-wrap flex-col sm:flex-row'>
          <label htmlFor='name' className='flex-1 flex flex-col gap-2'>
            <span>Name</span>
            <input
              id='name'
              name='name'
              type='text'
              defaultValue={user.name}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              placeholder='Steve Solo'
            />
          </label>
          <label htmlFor='lastname' className='flex-1 flex flex-col gap-2'>
            <span>Last Name</span>
            <input
              id='lastname'
              name='lastname'
              type='text'
              defaultValue={user.lastname}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              placeholder='Steve Solo'
            />
          </label>
        </div>
        <div className='flex gap-4 flex-wrap flex-col sm:flex-row'>
          <label htmlFor='username' className='flex-1 flex flex-col gap-2'>
            <span>Username</span>
            <input
              id='username'
              name='username'
              type='text'
              defaultValue={user.username}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              placeholder='Steve Solo'
            />
          </label>
          <label htmlFor='gender' className='flex-1 flex flex-col gap-1'>
            <span>Diet</span>
            <select id='gender' name='gender' className='px-2.5 py-2 rounded-md bg-white text-black'>
              <option defaultValue={user.gender} value='none' disabled hidden></option>
              {[
                'Gluten Free',
                'Ketogenic',
                'Vegetarian',
                'Lacto-Vegetarian',
                'Ovo-Vegetarian',
                'Vegan',
                'Pescetarian',
                'Paleo',
                'Primal',
                'Low FODMAP',
                'Whole30'
              ].map(item => <option key={item} id='gender' value='vegetarian'>vegetarian</option>)}
            </select>
          </label>
        </div>
        <div className='flex gap-4 flex-wrap flex-col sm:flex-row'>
          <label htmlFor='birth' className='flex-1 flex flex-col gap-1'>
            <span>Birth</span>
            <input
              id='birth'
              name='birth'
              type='date'
              defaultValue={user.birth} // format: 'yyyy-mm-dd'
              className='px-2.5 py-2 rounded-md bg-white text-black'
            />
          </label>
          <label htmlFor='gender' className='flex-1 flex flex-col gap-1'>
            <span>Gender</span>
            <select id='gender' name='gender' className='px-2.5 py-2 rounded-md bg-white text-black'>
              <option defaultValue={user.gender} value='none' disabled hidden></option>
              <option value='male' selected={user.gender === 'male'}>male</option>
              <option value='female' selected={user.gender === 'female'}>female</option>
            </select>
          </label>
        </div>
        <div className='flex gap-4 flex-wrap flex-col sm:flex-row'>
          <label htmlFor='height' className='flex-1 flex flex-col gap-1'>
            <span>Size <span className='text-xs'>in cm</span></span>
            <input
              id='height'
              name='height'
              type='number'
              placeholder='175'
              defaultValue={user.height}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              min='0'
              max='250'
            />
          </label>
          <label htmlFor='weight' className='flex-1 flex flex-col gap-1'>
            <span>Weight <span className='text-xs'>in kg</span></span>
            <input
              id='weight'
              name='weight'
              type='number'
              placeholder='62,5'
              defaultValue={user.weight.length === 0 ? null : user.weight[user.weight.length - 1].weight}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              min='5'
              max='250'
            />
          </label>
        </div>
        <div className='flex gap-4 flex-wrap flex-col sm:flex-row'>
          <button
            type='submit'
            className='flex-1 px-2.5 py-2.5 rounded-md bg-green-700 bg-opacity-70 text-white font-bold'
          >
            Save changes
          </button>
          <button
            type='button'
            onClick={() =>
              toast((t) => (
                <div className="flex flex-col items-center gap-2">
                  <p className="font-medium">Delete account?</p>
                  <p className="text-xs text-center">
                  You will lose access to the site and your data will be erased from the
                  registered users section.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="w-20 justify-center rounded-md border border-transparent shadow px-2.5 py-1.5 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Dismiss
                    </button>
                    <button
                      onClick={() => {
                        toast.dismiss(t.id)
                        toast.promise(handleDelete(), {
                          loading: 'Deleting account',
                          success: 'Account successfully deleted',
                          error: 'Error on successful account deletion'
                        }, {
                          loading: { duration: 4000 },
                          success: { duration: 4000 },
                          error: { duration: 4000 }
                        }).then(() => signOut({ redirect: process.env.NEXT_PUBLIC_BASE_PATH_FRONTEND }))
                      }}
                      className="w-20 justify-center rounded-md border border-transparent shadow px-2.5 py-1.5 bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            }
            className='flex-1 px-2.5 py-2.5 rounded-md bg-red-700 bg-opacity-70 text-white font-bold break-words'
          >
            delete account
          </button>
        </div>
      </form>
      <hr className='bg-gray-300 border-0 h-0.5 my-4'/>
      <div className='max-w-sm flex gap-4 flex-wrap sm:flex-nowrap'>
        <button
          onClick={async () => {
            if (google) {
              await disconnect('google')
            } else {
              await signIn('google')
            }
          }}
          type='button'
          className={`capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center bg-white-600 shadow-md rounded-md hover:bg-white flex items-center gap-1 hover:scale-95 duration-300 ${google ? 'text-green-700' : 'text-black'}`}
        >
          <RiGoogleFill className='text-xl' />
          <span>Google</span>
        </button>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
              currently unavailable
            </span>
          }
        >
          <button
          onClick={async () => {
            if (twitter) {
              await disconnect('twitter')
            } else {
              await signIn('twitter')
            }
          }}
          type='button'
          className={`cursor-not-allowed capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center bg-white-600 shadow-md rounded-md hover:bg-white hover:text-red-500 flex items-center gap-1 hover:scale-95 duration-300 ${twitter ? 'text-green-700' : 'text-black'}`}
          disabled={true}
        >
          <RiTwitterLine className='text-xl' />
          <span>Twitter</span>
        </button>
        </Tippy>
        <Tippy
          arrow={false}
          content={
            <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none'>
              currently unavailable
            </span>
          }
        >
          <button
            onClick={async () => {
              if (instagram) {
                await disconnect('instagram')
              } else {
                await signIn('instagram')
              }
            }}
            type='button'
            className={`cursor-not-allowed capitalize w-full tracking-normal px-4 py-3 text-xs font-bold text-center bg-white-600 shadow-md rounded-md hover:text-red-500 hover:bg-white flex items-center gap-1 hover:scale-95 duration-300 ${instagram ? 'text-green-700' : 'text-black'}`}
            disabled={true}
          >
            <RiInstagramLine className='text-xl' />
            <span>Instagram</span>
          </button>
        </Tippy>
      </div>
    </div>
  )
}

Settings.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps ({ req }) {
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const params = new URLSearchParams({
    email: session.user.email
  })

  const token = req.cookies[cookie]
  const uri = `${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user?${params.toString()}`
  const user = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())

  return {
    props: {
      user,
      token: token
    }
  }
}

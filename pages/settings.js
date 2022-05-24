import Layout from '../components/Layout/WithSession'
import { getSession, signIn, signOut } from 'next-auth/react'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'
import Tippy from '@tippyjs/react'

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
      weight: [...user.weight, Number(e.target.weight.value)] || user.weight
    }
    const uri = 'http://localhost:4000/api/user/update-account'
    await fetch(uri, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(query)
    }).then(res => res.json())
  }

  const handleDelete = async () => {
    const uri = 'http://localhost:4000/api/user/delete-account'

    await fetch(uri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email: user.email })
    }).then(() => signOut({ redirect: 'http://localhost:3000' }))
  }

  const disconnect = async (provider) => {
    const uri = 'http://localhost:4000/api/user/disconnect-account'
    await fetch(uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, provider })
    })
  }

  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <form
        method='PUT'
        onSubmit={(e) => handleUpdate(e)}
        className='w-2/3 flex flex-col gap-4'
      >
        <div className='flex gap-4'>
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
        <div className='flex gap-4'>
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
              <option value='vegetarian' selected={user.diet === 'vegetarian'}>vegetarian</option>
            </select>
          </label>
        </div>
        <div className='flex gap-4'>
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
        <div className='flex gap-4'>
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
              defaultValue={user.weight ? user.weight[user.weight.lenght - 1] : null}
              className='px-2.5 py-2 rounded-md bg-white text-black'
              min='5'
              max='250'
            />
          </label>
        </div>
        <div className='flex gap-4'>
          <button
            type='submit'
            className='flex-1 px-2.5 py-2.5 rounded-md bg-green-700 bg-opacity-70 text-white font-bold'
          >
            Save changes
          </button>
          <button
            type='button'
            onClick={() => { handleDelete() }}
            className='flex-1 px-2.5 py-2.5 rounded-md bg-red-700 bg-opacity-70 text-white font-bold'
          >
            delete account
          </button>
        </div>
      </form>
      <hr className='bg-gray-300 border-0 h-0.5 my-4'/>
      <div className='max-w-sm flex gap-4'>
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
  const uri = `http://localhost:4000/api/user?${params.toString()}`
  const user = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      user,
      token: req.cookies['next-auth.session-token']
    }
  }
}

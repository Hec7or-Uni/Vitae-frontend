import Layout from '../components/Layout'
import { getSession } from 'next-auth/react'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'

export default function Settings ({ user, token }) {
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
    console.log(query)
    const uri = 'http://localhost:4000/api/user/update-account'
    await fetch(uri, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }).then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.error(err))
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
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
              placeholder='Steve Solo'
            />
          </label>
          <span className='flex-1'></span>
        </div>
        <div className='flex gap-4'>
          <label htmlFor='birth' className='flex-1 flex flex-col gap-1'>
            <span>Birth</span>
            <input
              id='birth'
              name='birth'
              type='date'
              defaultValue={user.birth} // format: 'yyyy-mm-dd'
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
            />
          </label>
          <label htmlFor='gender' className='flex-1 flex flex-col gap-1'>
            <span>Gender</span>
            <select id='gender' name='gender' className='px-2.5 py-2 rounded-md bg-gray-100 text-black'>
              <option defaultValue={user.gender}></option>
              <option value='male'>male</option>
              <option value='female'>female</option>
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
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
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
              defaultValue={user.weight[user.weight.length - 1]}
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
              min='5'
              max='250'
            />
          </label>
        </div>
        <div className='flex gap-4'>
          <button
            type='submit'
            className='flex-1 px-2.5 py-2.5 rounded-md bg-green-400 text-white font-bold'
          >
            Save changes
          </button>
          <button
            type='button'
            className='flex-1 px-2.5 py-2.5 rounded-md bg-red-400 text-white font-bold'
          >
            delete account
          </button>
        </div>
      </form>
      <hr className='bg-gray-300 border-0 h-0.5 my-4'/>
      <div className='w-2/3 flex gap-4'>
        <button
          onClick={() => {}}
          type='button'
          className='flex-1 px-4 py-2 flex gap-3 items-center bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          <RiGoogleFill className='w-6 h-6' />
          <span>Google</span>
        </button>
        <button
          onClick={() => {}}
          type='button'
          className='flex-1 px-4 py-2 flex gap-3 items-center bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          <RiTwitterLine className='w-6 h-6' />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => {}}
          type='button'
          className='flex-1 px-4 py-2 flex gap-3 items-center bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          <RiInstagramLine className='w-6 h-6' />
          <span>Instagram</span>
        </button>
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
    method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    // }
  }).then(res => res.json())

  return {
    props: {
      user
    }
  }
}

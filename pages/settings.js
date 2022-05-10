import Layout from '../components/Layout'
import { RiGoogleFill, RiTwitterLine, RiInstagramLine } from 'react-icons/ri'

export default function Settings () {
  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <form className='w-2/3 flex flex-col gap-4'>
        <div className='flex gap-4'>
          <label className='flex-1 flex flex-col gap-2'>
            <span>Name</span>
            <input
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
              placeholder='Steve Solo'
            />
          </label>
          <span className='flex-1'></span>
        </div>
        <div className='flex gap-4'>
          <label className='flex-1 flex flex-col gap-1'>
            <span>Birth</span>
            <input type="date" className='px-2.5 py-2 rounded-md bg-gray-100 text-black'/>
          </label>
          <label htmlFor='gender' className='flex-1 flex flex-col gap-1'>
            <span>Gender</span>
            <select id='gender' name='gender' className='px-2.5 py-2 rounded-md bg-gray-100 text-black'>
              <option value=''></option>
              <option value='male'>male</option>
              <option value='female'>female</option>
            </select>
          </label>
        </div>
        <div className='flex gap-4'>
          <label className='flex-1 flex flex-col gap-1'>
            <span>Size <span className='text-xs'>in cm</span></span>
            <input
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
              placeholder='175'
            />
          </label>
          <label className='flex-1 flex flex-col gap-1'>
            <span>Weight <span className='text-xs'>in kg</span></span>
            <input
              className='px-2.5 py-2 rounded-md bg-gray-100 text-black'
              placeholder='62,5'
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
          className='flex-1 px-4 py-2 flex gap-3 items-center bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          <RiGoogleFill className='w-6 h-6' />
          <span>Google</span>
        </button>
        <button
          onClick={() => {}}
          className='flex-1 px-4 py-2 flex gap-3 items-center bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          <RiTwitterLine className='w-6 h-6' />
          <span>Twitter</span>
        </button>
        <button
          onClick={() => {}}
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

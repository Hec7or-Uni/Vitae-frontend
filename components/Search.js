import { FiSearch } from 'react-icons/fi'

export default function Search ({ funct }) {
  return (
    <form
      method='GET'
      onSubmit={(e) => funct(e)}
      className='w-2/3 flex items-center gap-4 border rounded-xl px-3 opacity-70 hover:opacity-80 bg-white'>
      <button
        type='submit'
      >
        <FiSearch className='h-5 w-5 text-gray-700' />
      </button>
      <input
      id='target'
        name='target'
        placeholder='Search menus completely free'
        className='block w-full pr-3 py-2 mt-1 text-gray-700 bg-transparent outline-none'
      />
    </form>
  )
}

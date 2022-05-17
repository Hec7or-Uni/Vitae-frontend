import Layout from '../components/Layout'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Schedule from '../components/Schedule'
import cuid from 'cuid'
import { FiSave, FiTrash, FiX, FiPlusSquare } from 'react-icons/fi'

export default function Planning () {
  const [menu, setMenu] = useState([{ id: cuid(), recipe: '', mealType: '' }])
  const [menuOp, setOp] = useState(true) // true = create | false = generate

  const addRecipe = () => {
    setMenu([...menu, { id: cuid(), recipe: '', mealType: '' }])
  }

  // const saveMenu = (e) => {
  //   e.preventDefault()
  // }

  const delMenu = () => {
    setMenu([{ id: cuid(), recipe: '', mealType: '' }])
  }

  const removeRecipe = (id) => {
    setMenu(menu.filter(item => item.id !== id))
  }

  const handleChangeOp = () => {
    setOp(!menuOp)
  }

  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <form method='post'>
        <div className='w-2/3 flex gap-4 justify-between'>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => handleChangeOp()}
              className='px-5 py-2 bg-gray-200 rounded-md text-lg font-medium'
            >
              Create Menu
            </button>
            <button
              type='button'
              onClick={() => handleChangeOp()}
              className='px-5 py-2 bg-gray-200 rounded-md text-lg font-medium'
            >
              Generate Menu
            </button>
          </div>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => addRecipe()}
              className='p-1 text-blue-500 hover:text-blue-300 rounded-md text-lg font-medium'
            >
              <FiPlusSquare/>
            </button>
            <button
              type='submit'
              onClick={() => {}}
              className='p-1 text-green-500 hover:text-green-300 rounded-md text-lg font-medium'
            >
              <FiSave/>
            </button>
            <button
              type='button'
              onClick={() => delMenu() }
              className='p-1 text-red-500 hover:text-red-300 rounded-md text-lg font-medium'
            >
              <FiTrash/>
            </button>
          </div>
        </div>
        <div className='w-2/3 flex flex-col gap-4 pt-6 pb-10'>
            <div className='flex gap-4'>
              <label htmlFor='name' className='flex-1 flex flex-col gap-1'>
                <span>Name</span>
                <input
                  type="text"
                  name='name'
                  placeholder='Write here your menu&apos;s name '
                  className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'
                />
              </label>
              <label className='flex-1 flex flex-col gap-1'>
                <span>date</span>
                <input type="date" className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'/>
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              {menuOp
                ? <>
                {menu.map(r => {
                  return (
                    <div key={r.id} className='flex gap-4 rounded-md'>
                      <label htmlFor='recipe' className='flex-auto flex flex-col gap-1'>
                        <select id='recipe' name='recipe' className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'>
                          <option value=''>Select a Recipe</option>
                          {[{ id: 1, value: 'ristoranti' }].map(m => <option key={m.id} value={m.value}>{m.value}</option>)}
                        </select>
                      </label>
                      <label htmlFor='mealType' className='flex flex-col gap-1 w-44'>
                        <select id='mealType' name='mealType' className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'>
                          <option value=''>Meal type</option>
                          {[
                            { id: 1, value: 'breakfast' },
                            { id: 2, value: 'lunch' },
                            { id: 3, value: 'snack' },
                            { id: 4, value: 'dinner' }].map(m => <option key={m.id} value={m.value}>{m.value}</option>)}
                        </select>
                      </label>
                      <button type='button' onClick={() => removeRecipe(r.id)}>
                        <FiX className='w-5 h-5 mr-1'/>
                      </button>
                    </div>
                  )
                })}
              </>
                : <>
                {menu.map(r => {
                  return (
                    <div key={r.id} className='flex gap-4 rounded-md'>
                      <label htmlFor='recipe' className='flex-auto flex flex-col gap-1'>
                        <select id='recipe' name='recipe' className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'>
                          <option value=''>Select a Recipe</option>
                          {[{ id: 1, value: 'ristoranti' }].map(m => <option key={m.id} value={m.value}>{m.value}</option>)}
                        </select>
                      </label>
                      <label htmlFor='mealType' className='flex flex-col gap-1 w-44'>
                        <select id='mealType' name='mealType' className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent'>
                          <option value=''>Meal type</option>
                          {[
                            { id: 1, value: 'breakfast' },
                            { id: 2, value: 'lunch' },
                            { id: 3, value: 'snack' },
                            { id: 4, value: 'dinner' }].map(m => <option key={m.id} value={m.value}>{m.value}</option>)}
                        </select>
                      </label>
                      <button type='button' onClick={() => removeRecipe(r.id)}>
                        <FiX className='w-5 h-5 mr-1'/>
                      </button>
                    </div>
                  )
                })}
              </>
              }
            </div>
          </div>
        </form>
      <Schedule />
    </div>
  )
}

Planning.getLayout = function getLayout (page) {
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

  return {
    props: { }
  }
}

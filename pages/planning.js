import Layout from '../components/Layout/WithSession'
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Schedule from '../components/Schedule'
import cuid from 'cuid'
import { FiSave, FiTrash, FiX, FiPlusSquare } from 'react-icons/fi'

export default function Planning ({ menus, email, token, recipes }) {
  const [menu, setMenu] = useState([{ id: cuid(), recipe: '' }])
  const [header, setHeader] = useState({ name: '', date: '' })
  const [menuOp, setOp] = useState(true) // true = create | false = generate

  const addRecipe = () => {
    setMenu([...menu, { id: cuid(), recipe: '' }])
  }

  const editRecipe = (e, id) => {
    const localMenu = menu.map(elem => {
      if (elem.id !== id) return elem
      if (e.target.name === 'recipe') {
        return {
          ...elem,
          recipe: e.target.value
        }
      }
      return elem
    })
    setMenu(localMenu)
  }

  const saveMenu = async (e) => {
    e.preventDefault()
    const data = {
      email: email,
      menu: {
        name: header.name,
        date: header.date,
        recipes: menu.map(m => { return { _id: m.recipe } })
      }
    }

    await fetch('http://localhost:4000/api/inventory/save-menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
  }

  const delMenu = () => {
    setMenu([{ id: cuid(), recipe: '' }])
  }

  const removeRecipe = (id) => {
    setMenu(menu.filter(item => item.id !== id))
  }

  const handleChangeOp = () => {
    if (menuOp && recipes.length !== 0) {
      const newMenu = recipes
        .filter(item => Math.random() > 0.5)
        .map(item => {
          return {
            id: cuid(),
            recipe: item._id,
            title: item.title
          }
        })

      console.log(newMenu)
      setMenu(newMenu)
      setOp(false)
    } else {
      // cambiamos a create
      delMenu()
      setOp(true)
    }
  }

  return (
    <div className='max-w-5xl flex flex-col gap-4 h-full'>
      <form
        method='post'
        onSubmit={(e) => saveMenu(e)}
        className='w-2/3 bg-white rounded-md px-6 py-4'
      >
        <div className='flex gap-4 justify-between'>
          <div className='flex gap-4'>
            <button
              type='button'
              onClick={() => handleChangeOp()}
              className={`px-5 py-2 rounded-md text-lg font-medium shadow-md ${menuOp ? 'bg-[#3a5a40] bg-opacity-40' : 'bg-white'}`}
            >
              Create Menu
            </button>
            <button
              type='button'
              onClick={() => handleChangeOp()}
              className={`px-5 py-2 rounded-md text-lg font-medium shadow-md ${!menuOp ? 'bg-[#3a5a40] bg-opacity-40' : 'bg-white'}`}
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
        <div className='w-full flex flex-col gap-4 pt-6 pb-10'>
            <div className='flex gap-4'>
              <label htmlFor='name' className='flex-1 flex flex-col gap-1'>
                <span>Name</span>
                <input
                  type='text'
                  id='name'
                  name='name'
                  onChange={(e) => setHeader({ ...header, name: e.target.value })}
                  placeholder='Write here your menu&apos;s name '
                  className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input bg-transparent border-black border-opacity-30'
                  required
                />
              </label>
              <label className='flex-1 flex flex-col gap-1'>
                <span>date</span>
                <input
                  type='date'
                  id='date'
                  name='date'
                  onChange={(e) => setHeader({ ...header, date: e.target.value })}
                  className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input bg-transparent border-black border-opacity-30'
                  required
                />
              </label>
            </div>
            <div className='flex flex-col gap-2'>
              {menuOp
                ? <>
                {menu.map(r => {
                  return (
                    <div
                      key={r.id}
                      className='flex gap-4 rounded-md'
                    >
                      <label htmlFor='recipe' className='flex-auto flex flex-col gap-1'>
                        <select
                          id='recipe'
                          name='recipe'
                          className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input bg-transparent border-black border-opacity-30'
                          onChange={(e) => editRecipe(e, r.id)}
                          required
                        >
                          <option value=''>Select a Recipe</option>
                          {recipes.map(m => {
                            return (
                              <option
                                key={m._id}
                                value={m._id}
                              >
                                {m.title}
                              </option>
                            )
                          })}
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
                  console.log(r)
                  return (
                    <div key={r.id} className='flex gap-4 rounded-md'>
                      <label htmlFor='recipe' className='flex-auto flex flex-col gap-1'>
                        <select
                          id='recipe'
                          name='recipe'
                          onChange={(e) => editRecipe(e, r.id)}
                          className='block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input bg-transparent border-black border-opacity-30'
                        >
                          <option value={r._id}>{r.title}</option>
                          {recipes.map(m => {
                            return (
                              <option
                                key={m._id}
                                value={m._id}
                              >
                                {m.title}
                              </option>
                            )
                          })}
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
      <Schedule data={menus} />
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

  const parametros = new URLSearchParams({ email: session.user.email })
  const user = await fetch(`http://localhost:4000/api/user?${parametros}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      menus: user.menus,
      email: session.user.email,
      token: req.cookies['next-auth.session-token'],
      recipes: user.saved_recipes
    }
  }
}

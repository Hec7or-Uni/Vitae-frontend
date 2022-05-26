import { useState } from 'react'

export default function Newsletter () {
  const [active, setActive] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email: String(e.target.email.value) }
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}newsletter`
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const response = await fetch(endpoint, options).catch(err => err)
    if (response.status === 201) setActive(false)
  }

  return (
    <>
      {active
        ? <form
          onSubmit={(e) => handleSubmit(e)}
          className='flex gap-2 items-center'
        >
          <label htmlFor='email'>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Email here...'
              className='w-full px-3 py-2 border rounded-lg text-lg'
            />
          </label>
          <button
            type='submit'
            className='btn-primary'
          >
            Join
          </button>
        </form>
        : <button
          type='button'
          onClick={() => setActive(true)}
          className='btn-primary capitalize mt-2 z-50 px-3 py-2 border rounded-lg text-lg'
        >
          join newsletter
        </button>
      }
    </>
  )
}

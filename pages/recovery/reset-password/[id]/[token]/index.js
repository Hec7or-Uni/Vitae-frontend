import { useRouter } from 'next/router'
import crypto from 'crypto'
import CryptoJS from 'crypto-js'
const jwt = require('jsonwebtoken')

export default function Recovery ({ id }) {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (e.target.password.value !== e.target.password2.value) {
      return
    }

    const salt = crypto.randomBytes(64).toString('hex')
    const data = {
      id: id,
      salt: salt,
      passwd: CryptoJS.SHA512(salt + e.target.password.value).toString()
    }
    await fetch('/api/shop', {
      method: 'PUT',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ data })
    }).then((res) => {
      res.json()
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5  dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
      <div className="w-full max-w-sm p-4 bg-white dark:bg-color-light-neutral-1 rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900 mb-4">
            Cambiar contraseña
          </span>
        </div>
        <span className="text-sm font-normal">
          Introduzca la nueva contraseña para su cuenta.
        </span>
        <form
          method="post"
          onSubmit={(e) => {
            handleSubmit(e)
              .then(() => router.push('/'))
              .catch(() => router.push('/recovery'))
          }
          }
          className="mt-4"
        >
          <label className="block mt-1.5">
            <span className="text-sm text-gray-700">Contraseña</span>
            <input
              type="password"
              id="password"
              name="password"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <label className="block mt-1.5">
            <span className="text-sm text-gray-700">Confirmar contraseña</span>
            <input
              type="password"
              id="password2"
              name="password2"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <div className="mt-8">
            <button
              type="submit"
              className="capitalize w-full tracking-normal py-2.5 px-4 text-sm font-bold text-center text-white bg-black rounded-md"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps (context) {
  const { id, token } = context.params

  // check if this id exists in the database
  const params = new URLSearchParams({ id })
  const user = await fetch(`http://localhost:4000/recovery/validate?${params.toString()}`)
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const secret = process.env.SECRET + user.passwd
  try {
    // eslint-disable-next-line no-unused-vars
    const payload = jwt.verify(token, secret)
  } catch (error) { }
  return {
    props: {
      id: id
    }
  }
}

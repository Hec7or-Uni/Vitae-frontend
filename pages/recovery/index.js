import { getCsrfToken } from 'next-auth/react'
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast'

export default function Recovery ({ csrfToken }) {
  const router = useRouter()

  function handleSubmit (e) {
    e.preventDefault()
    return new Promise(function (resolve, reject) {
      const params = new URLSearchParams({
        email: e.target.email.value
      })
      fetch(`/api/recovery/?${params.toString()}`).then((res) => {
        res.json()
        if (!res.ok) {
          reject(new Error('error'))
        }
        resolve('ok')
      })
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 sm:px-6 flex-col gap-y-5  dark:bg-gradient-to-t dark:from-cm-color dark:via-cm-color dark:to-cm-color2">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-sm p-4 bg-white dark:bg-color-light-neutral-1 rounded-md shadow-md sm:p-6">
        <div className="flex items-center justify-center">
          <span className="text-xl font-medium text-gray-900 mb-4">
            Ayuda - contraseña
          </span>
        </div>
        <span className="text-sm font-normal">
          Introduzca la dirección de correo electrónico asociada con su cuenta.
        </span>
        <form
          method="post"
          onSubmit={(e) => {
            toast
              .promise(handleSubmit(e), {
                loading: 'Enviando email...',
                success: 'Email enviado con éxito.',
                error: 'Error al enviar el email.'
              })
              .then(router.push('/'))
              .catch(router.push('/recovery'))
          }}
          className="mt-4"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label className="block mt-1.5">
            <span className="text-sm text-gray-700">Email</span>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full px-3 py-2 mt-1 text-gray-700 border rounded-md form-input focus:border-blue-600 bg-transparent"
              required
            />
          </label>
          <div className="mt-8">
            <button
              type="submit"
              className="capitalize w-full tracking-normal py-2.5 px-4 text-sm font-bold text-center text-white bg-dark1 hover:black rounded-md"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps (context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}

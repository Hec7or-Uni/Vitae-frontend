import { GoMarkGithub } from 'react-icons/go'

export default function Footer () {
  return (
    <footer className="w-full py-8">
      <div className="w-full mx-auto px-4">
        <ul className="max-w-screen-sm pt-12 mx-auto text-lg font-light flex flex-wrap justify-between">
          <li className="flex justify-center my-1">
            <a
              href="/tos"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Terms of service
            </a>
          </li>
          <li className="flex justify-center my-1">
            <a
              href="/faq"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              FAQ
            </a>
          </li>
          <li className="flex justify-center my-1">
            <a
              href="/privacypolicy"
              className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
            >
              Privacy policy
            </a>
          </li>
        </ul>
        <div className=" flex w-full sm:w-1/3 pt-8 mx-auto items-center justify-around">
          <a
            href="https://github.com/Hec7or-Uni/Vitae-frontend"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
           <GoMarkGithub className='w-5 h-5'/>
          </a>
          <a
            href="https://github.com/Hec7or-Uni/Vitae-backend"
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <GoMarkGithub className='w-5 h-5'/>
          </a>
        </div>
        <div className="text-center text-gray-500 pt-10 sm:pt-12 font-light flex items-center justify-center">
          Developed by
          <span className="px-1 hover:text-gray-900 hover:underline underline-offset-2">
            <a href="https://hec7or.me">Hec7orci7o</a>
          </span>
          <span className="px-1 hover:text-gray-900 hover:underline underline-offset-2">
            <a href="https://github.com/bolumclol">bolumclol</a>
          </span>{' '}
          <span className="px-1 hover:text-gray-900 hover:underline underline-offset-2">
            <a href="https://github.com/Kotopulaki">Kotopulaki</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

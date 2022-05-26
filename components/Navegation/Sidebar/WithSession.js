import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import SButton from './SButton'
import { FiHeart, FiGlobe, FiBox, FiCalendar, FiSettings, FiActivity } from 'react-icons/fi'

export default function Sidebar () {
  const [links, setLinks] = useState([])
  const router = useRouter()

  useEffect(() => {
    let lista
    if (router.asPath !== '/admin') {
      lista = [{
        id: 1,
        link: '/home',
        icon: <FiHeart className='text-xl stroke-2' />,
        text: 'home'
      }, {
        id: 2,
        link: '/discover',
        icon: <FiGlobe className='text-xl stroke-2' />,
        text: 'discover'
      }, {
        id: 3,
        link: '/storage',
        icon: <FiBox className='text-xl stroke-2' />,
        text: 'storage'
      }, {
        id: 4,
        link: '/planning',
        icon: <FiCalendar className='text-xl stroke-2' />,
        text: 'planning'
      }, {
        id: 5,
        link: '/settings',
        icon: <FiSettings className='text-xl stroke-2' />,
        text: 'settings'
      }]
    } else {
      lista = [{
        id: 1,
        link: '/admin',
        icon: <FiActivity className='text-xl stroke-2' />,
        text: 'admin'
      }]
    }
    setLinks(lista)
  }, [router.asPath])

  return (
    <div className='h-full bg-gray-200 bg-opacity-90'>
      {links.map(item => {
        return (
          <SButton
            id={item.id}
            key={item.id}
            link={item.link}
            icon={item.icon}
            text={item.text}
            active={router.asPath === item.link}
          />
        )
      })}
    </div>
  )
}

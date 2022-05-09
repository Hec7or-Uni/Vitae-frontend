import SButton from './sButton'
import { FiHeart, FiGlobe, FiBox, FiCalendar, FiSettings } from 'react-icons/fi'
import { useState } from 'react'

export default function Sidebar () {
  const [active, setActive] = useState(1)

  return (
    <div className='h-full'>
      {[{
        id: 1,
        link: '/home',
        icon: <FiHeart className="text-xl stroke-1" />,
        text: 'home'
      }, {
        id: 2,
        link: '/discover',
        icon: <FiGlobe className="text-xl stroke-1" />,
        text: 'discover'
      }, {
        id: 3,
        link: '/storage',
        icon: <FiBox className="text-xl stroke-1" />,
        text: 'storage'
      }, {
        id: 4,
        link: '/planning',
        icon: <FiCalendar className="text-xl stroke-1" />,
        text: 'planning'
      }, {
        id: 5,
        link: '/settings',
        icon: <FiSettings className="text-xl stroke-1" />,
        text: 'settings'
      }].map(item => <SButton id={item.id} key={item.id} link={item.link} icon={item.icon} text={item.text} active={active} handler={setActive} />)}
    </div>
  )
}

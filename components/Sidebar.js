import SButton from './sButton'
import { FiHeart, FiGlobe, FiBox, FiCalendar, FiSettings } from 'react-icons/fi'

export default function Sidebar () {
  return (
    <div className='h-full'>
      {[{
        link: '/home',
        icon: <FiHeart className="text-xl stroke-1" />,
        text: 'home'
      }, {
        link: '/discover',
        icon: <FiGlobe className="text-xl stroke-1" />,
        text: 'discover'
      }, {
        link: '/storage',
        icon: <FiBox className="text-xl stroke-1" />,
        text: 'storage'
      }, {
        link: '/planning',
        icon: <FiCalendar className="text-xl stroke-1" />,
        text: 'planning'
      }, {
        link: '/settings',
        icon: <FiSettings className="text-xl stroke-1" />,
        text: 'settings'
      }].map(item => <SButton key={item} link={item.link} icon={item.icon} text={item.text} />)}
    </div>
  )
}

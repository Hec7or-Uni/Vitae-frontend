export default function Schedule ({ data }) {
  const hoy = new Date()
  const DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000
  const ayer = new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS)
  const filterData = data.filter(item => item.id > ayer).slice(0, 5)

  return (
    <div className='w-full grid grid-cols-10 divide-x divide-black border-l border-r border-black'>
      {filterData.map(item => {
        return (
          <div key={item.id} className='col-span-2 flex flex-col items-center'>
            <span className='text-2xl font-bold'>{item.dayNumber}</span>
            <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
              {item.menus.map(subitem => {
                return (
                  <span key={subitem.id} className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
                    {subitem.menu}
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

Schedule.defaultProps = {
  data: [
    {
      id: new Date(),
      dayNumber: new Date().getDate(),
      menus: [
        {
          id: 1,
          menu: 'macarrones con queso',
          menuLink: '/menu/1'
        },
        {
          id: 2,
          menu: 'menu2',
          menuLink: '/menu/2'
        }
      ]
    },
    {
      id: new Date(),
      dayNumber: new Date().getDate() + 1,
      menus: [
        {
          id: 2,
          menu: 'pizza 4 quesos',
          menuLink: '/menu/1'
        }
      ]
    }
  ]
}

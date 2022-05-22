export default function Schedule ({ data }) {
  const hoy = new Date()
  const DIA_EN_MILISEGUNDOS = 24 * 60 * 60 * 1000

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className='w-full h-72 grid grid-cols-10 divide-x divide-black border-l border-r border-black'>
        {/* ayer */}
        <div className='col-span-2 flex flex-col items-center'>
          <span className='text-2xl font-bold'>{new Date(hoy.getTime() - DIA_EN_MILISEGUNDOS).getDate()}</span>
          <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
            <span className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
              hola
            </span>
          </div>
        </div>
        {/* hoy */}
        <div className='col-span-2 flex flex-col items-center'>
          <span className='text-2xl font-bold'>{new Date(hoy.getTime()).getDate()}</span>
          <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
            <span className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
              hola
            </span>
          </div>
        </div>
        {/* mañana */}
        <div className='col-span-2 flex flex-col items-center'>
          <span className='text-2xl font-bold'>{new Date(hoy.getTime() + DIA_EN_MILISEGUNDOS).getDate()}</span>
          <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
            <span className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
              hola
            </span>
          </div>
        </div>
        {/* 2 dias despues */}
        <div className='col-span-2 flex flex-col items-center'>
          <span className='text-2xl font-bold'>{new Date(hoy.getTime() + 2 * DIA_EN_MILISEGUNDOS).getDate()}</span>
          <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
            <span className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
              hola
            </span>
          </div>
        </div>
        {/* 3 dias despues */}
        <div className='col-span-2 flex flex-col items-center'>
          <span className='text-2xl font-bold'>{new Date(hoy.getTime() + 3 * DIA_EN_MILISEGUNDOS).getDate()}</span>
          <div className='flex flex-col gap-1.5 mt-4 w-full px-4'>
            <span className='self-center text-center bg-gray-200 px-2.5 py-0.5 rounded-lg text-sm'>
              hola
            </span>
          </div>
        </div>
      </div>
    </div>

  )
}

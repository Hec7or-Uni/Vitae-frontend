import Layout from '../../components/Layout/WithSession'
import Image from 'next/image'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { FiPlus, FiClock, FiHeart } from 'react-icons/fi'
import defaultImage from '../../public/defaultImage.png'
import { zip } from '../../lib/functions'
import Tippy from '@tippyjs/react'

export default function Menu ({ menu }) {
  // para los estimados
  let health = 0; let time = 0; let score = 0
  const recipes = menu.recipes.map(item => item)
  recipes.forEach(element => {
    health = health + element.healthScore || health
    time = time + element.readyInMinutes || time
    score = score + element.spoonacularScore || score
  })

  // para la nutricion
  let nutrition
  let calories = 0; let carbs = 0; let fat = 0; let protein = 0
  if (menu.recipes[0] !== []) {
    nutrition = menu.recipes.map(item => item.nutrition)
    nutrition.forEach(element => {
      calories = calories + Number(element[0].value.substring(0, element[0].value.length - 1)) || calories
      carbs = carbs + Number(element[1].value.substring(0, element[1].value.length - 1)) || carbs
      fat = fat + Number(element[2].value.substring(0, element[2].value.length - 1)) || fat
      protein = protein + Number(element[3].value.substring(0, element[3].value.length - 1)) || protein
    })
    nutrition = [calories, carbs, fat, protein]
  }
  const units = ['k', 'g', 'g', 'g']
  const tag = ['calories', 'carbs', 'fat', 'protein']
  const images = [
    'https://images.unsplash.com/photo-1491273289208-9340cb42e5d9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765',
    'https://images.unsplash.com/photo-1608842850202-06e70ead4c10?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
    'https://images.unsplash.com/photo-1638439430466-b2bb7fdc1d67?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765',
    'https://images.unsplash.com/photo-1587996597484-04743eeb56b4?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'
  ]

  return (
    <div className='max-w-5xl'>
      <div className='w-full h-80 relative'>
        <Image
          src='https://images.unsplash.com/photo-1568031813264-d394c5d474b9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169'
          alt='Picture of the author'
          layout='fill'
          className='object-cover z-0'
        />
        <div className='flex gap-x-4 absolute top-0 right-0 mt-2.5 mr-4 bg-black bg-opacity-70 p-2 rounded-lg'>
          <Tippy
            arrow={false}
            placement= 'bottom'
            content={
              <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none bg-white'>
              Healthy {health / recipes.length}%
            </span>
            }
          >
            <button>
            <FiPlus className='w-5 h-5 text-white'/>
            </button>
          </Tippy>
          <Tippy
            arrow={false}
            placement= 'bottom'
            content={
              <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none bg-white'>
              Preparation time: {time}m
            </span>
            }
          >
            <button>
            <FiClock className='w-5 h-5 text-white cursor-pointer'/>
            </button>
          </Tippy>
          <Tippy
            arrow={false}
            placement= 'bottom'
            content={
              <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none bg-white'>
              score: {score === 0 ? 'unknown' : score}
            </span>
            }
          >
            <button>
              <FiHeart className='w-5 h-5 text-white cursor-pointer'/>
            </button>
          </Tippy>
        </div>
        <h1 className='text-2xl font-medium text-white absolute bottom-0 left-0 mb-2.5 ml-4'>
          {menu.name}
        </h1>
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Recipes
        </h2>
        <div className='flex flex-col'>
          {menu.recipes.map(recipe => {
            return (
              <Link href={'/recipe/' + recipe.spoonId} key={recipe.id} >
                <a className='w-1/2 h-48 bg-gray-200 relative mt-4 truncate p-2'>
                <Image
                  src={recipe.image || defaultImage}
                  alt='Picture of the author'
                  layout='fill'
                  className='object-cover z-0'
                />
                <p className='text-xl absolute bottom-0 left-0 mb-4 ml-4 truncate'>{recipe.title}</p>
                </a>
              </Link>
            )
          })}
        </div>
      </div>
      <div className='my-16 pb-28'>
        <h2 className='text-xl font-medium'>
          Nutrition
        </h2>
        <div className='flex flex-row gap-x-4'>
          {zip(images, nutrition, units, tag).map(item => {
            return (
              <div key={item.name} className='w-full basis-1/4 h-28 bg-black relative mt-4 flex flex-col items-center justify-center p-4'>
                  <Image
                    src={item[0]}
                    alt='Picture of the author'
                    layout='fill'
                    className='w-full h-full object-cover z-0 opacity-50'
                  />
                <p className='text-center text-2xl z-50 font-bold text-white select-none'>{item[1] + item[2]}</p>
                <p className='text-center text-xl z-50 font-bold text-white select-none'>{item[3]}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Menu.getLayout = function getLayout (page) {
  return <Layout>{page}</Layout>
}

export async function getServerSideProps (context) {
  const { params, req } = context
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const token = req.cookies['__Secure-next-auth.session-token']
  const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user?email=${session.user.email}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json()).catch(err => err)

  const menu = user.menus.filter(menu => menu._id === params.id)[0]

  return {
    props: {
      email: session.user.email,
      menu,
      token: token
    }
  }
}

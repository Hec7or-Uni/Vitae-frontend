import Layout from '../../components/Layout/WithSession'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { FiPlus, FiClock, FiHeart, FiBookmark, FiCornerDownRight } from 'react-icons/fi'
import Comment from '../../components/Comment'
import { zip } from '../../lib/functions'
import useSWR from 'swr'
import defaultImage from '../../public/defaultImage.png'
import Tippy from '@tippyjs/react'
import { useState } from 'react'

const fetchWithToken = async (uri, spoonId, token, recipes) => {
  const parametros = new URLSearchParams({ spoonId: spoonId })
  const recipe = await fetch(`${uri}?${parametros.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
  return recipe.comments
}

const images = [
  'https://images.unsplash.com/photo-1491273289208-9340cb42e5d9?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765',
  'https://images.unsplash.com/photo-1608842850202-06e70ead4c10?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687',
  'https://images.unsplash.com/photo-1638439430466-b2bb7fdc1d67?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765',
  'https://images.unsplash.com/photo-1587996597484-04743eeb56b4?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'
]

export default function Recipe ({ email, recipe, token, recipes }) {
  const [saved, setSaved] = useState(false)
  const { data: comments, error } = useSWR([`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user/comments`, recipe.spoonId, token], fetchWithToken, { refreshInterval: 1000 })

  if (error) return <div>failed to load</div>
  if (!comments) return <div>loading...</div>

  const loTenemos = recipes.some(item => item.spoonId === recipe.spoonId)
  const handleSaveRecipe = async () => {
    recipe.nutrition = nutrition
    await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}inventory/save-recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, recipe })
    })
    setSaved(true)
  }

  const nutrition = recipe.nutrition.filter(item => ['calories', 'carbs', 'fat', 'protein'].includes(item.name))

  return (
    <div className='max-w-5xl'>
      <div className='w-full h-80 relative'>
        <Image
          src= {recipe.image || defaultImage}
          alt='Picture of the author'
          layout='fill'
          className='object-cover z-0'
        />
        <div className='flex gap-x-4 absolute top-0 right-0 mt-2.5 mr-4'>
        <div className='flex gap-x-4 absolute top-0 right-0 mt-2.5 mr-4 bg-black bg-opacity-70 p-2 rounded-lg'>
          <Tippy
            arrow={false}
            placement= 'bottom'
            content={
              <span className='tracking-tight font-medium text-xs py-0.5 px-1.5 rounded-md select-none bg-white'>
              Healthy {recipe.healthScore || 0}%
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
              Preparation time: {recipe.readyInMinutes}m
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
              score: unknown
            </span>
            }
          >
            <button>
              <FiHeart className='w-5 h-5 text-white cursor-pointer'/>
            </button>
          </Tippy>
        </div>
        </div>
        <div className={`${saved ? 'hidden' : ''} absolute bottom-0 right-0 mb-2.5 mr-6 flex items-center bg-black bg-opacity-70 p-2 rounded-lg`}>
          <button onClick={() => handleSaveRecipe()} disabled={saved} className={`${loTenemos ? 'hidden' : ''}`}>
            <FiBookmark className='w-5 h-5 text-white'/>
          </button>
        </div>
        <h1 className='text-2xl font-medium text-white absolute bottom-0 left-0 mb-2.5 ml-4'>
          {recipe.title}
        </h1>
      </div>
      {(!recipe.extendedIngredients || recipe.extendedIngredients === []) &&
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Ingredients
        </h2>
        <div className='mt-4 flex flex-wrap gap-4 w-2/3'>
          {recipe.extendedIngredients.map(ingredient => {
            return (
              <div key={ingredient.id} className='h-28 w-28 bg-gray-200 relative flex flex-col items-center justify-center rounded-lg'>
                <span className='select-none w-full h-full z-10 bg-black bg-opacity-0 hover:bg-opacity-20 flex flex-col
                  items-center justify-center rounded-lg '>
                  <p className='z-10 text-center capitalize'>{ingredient.name}</p>
                  <p className='text-center'>{ingredient.amount}</p>
                  <p className='text-center'>{ingredient.unit}</p>
                </span>
                <Image
                  src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                  layout='fill'
                  className='object-cover z-0 rounded-lg'
                />
              </div>
            )
          })}
        </div>
      </div>}
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
        Instructions
        </h2>
        <ol className='mt-4 flex flex-col gap-4 w-2/3 list-decimal'>
          {recipe.analyzedInstructions !== [] && recipe.analyzedInstructions.map(instruction => {
            return (
              <li key={instruction.id} className='flex flex-col'>
                <p>{instruction.name.replaceAll(/step.[0-9]+/gmi, ' ')}</p>
                {instruction.steps.map(step => {
                  return (
                    <li key={step.id} className='flex flex-col'>
                      <p>{step.step.replaceAll(/step.[0-9]+/gmi, ' ')}</p>
                    </li>
                  )
                })}
              </li>
            )
          })}
        </ol>
      </div>
      {nutrition !== [] && nutrition.length === 4 &&
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Nutrition
        </h2>
        <div className='flex flex-row gap-x-4'>
          {zip(images, nutrition).map(item => {
            return (
              <div key={item.name} className='w-full basis-1/4 h-28 bg-black relative mt-4 flex flex-col items-center justify-center p-4'>
                  <Image
                    src={item[0]}
                    alt='Picture of the author'
                    layout='fill'
                    className='w-full h-full object-cover z-0 opacity-50'
                  />
                <p className='text-center text-2xl z-50 font-bold text-white select-none'>{item[1].value}</p>
                <p className='text-center text-2xl z-50 font-bold text-white select-none'>{item[1].name}</p>
              </div>
            )
          })}
        </div>
      </div>}
      <div className='w-full flex flex-col gap-4 justify-start items-start pb-28'>
        <Comment recipeId={recipe.spoonId} user={email} token={token}/>
        {comments.reverse().map(item => {
          return (
              <ul key={item._id} className='w-full flex flex-col justify-start items-start gap-2'>
                <li className='w-full flex flex-col justify-start items-start gap-2'>
                  <Comment
                    recipeId={recipe.spoonId}
                    comment={item}
                    user={email}
                    token={token}
                  />
                  <ul className='flex flex-col gap-2 w-full ml-4'>
                      {item.response.map(item => {
                        return (
                          <li key={item._id} className='flex gap-4'>
                            <FiCornerDownRight className='w-6 h-6 mt-3'/>
                            <Comment
                              recipeId={recipe.spoonId}
                              comment={item}
                              user={email}
                              token={token}
                              child={true}
                            />
                          </li>
                        )
                      })}
                    </ul>
                  </li>
              </ul>
          )
        })}
      </div>
    </div>
  )
}

Recipe.getLayout = function getLayout (page) {
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
  const parametros = new URLSearchParams({ spoonId: Number(params.id) })
  const recipe = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}inventory?${parametros.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())

  const parametros2 = new URLSearchParams({ email: session.user.email })
  const user = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH_BACKEND}user?${parametros2}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())

  return {
    props: {
      email: session.user.email,
      recipe,
      token: token,
      recipes: user.saved_recipes
    }
  }
}

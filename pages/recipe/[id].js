import Layout from '../../components/Layout/WithSession'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import { FiPlus, FiClock, FiHeart, FiBookmark } from 'react-icons/fi'
import { data2 } from '../../lib/temp'

export default function Recipe ({ email, recipe, nutrition, token }) {
  console.log(recipe.spoonId)

  const handleSaveRecipe = async () => {
    recipe.nutrition = nutrition
    await fetch('http://localhost:4000/api/inventory/save-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, recipe })
    })
  }

  return (
    <div className='max-w-5xl'>
      <div className='w-full h-80 relative'>
        <Image
          src= {recipe.image}
          alt='Picture of the author'
          layout='fill'
          className='object-cover z-0'
        />
        <div className='flex gap-x-4 absolute top-0 right-0 mt-2.5 mr-4'>
          <FiPlus className='w-5 h-5 text-black'/>
          <FiClock className='w-5 h-5 text-black'/>
          <FiHeart className='w-5 h-5 text-black'/>
        </div>
        <div className='absolute bottom-0 right-0 mb-2.5 mr-4'>
          <button onClick={() => handleSaveRecipe()}>
            <FiBookmark className='w-5 h-5 text-black'/>
          </button>
        </div>
        <h1 className='text-2xl font-medium text-white absolute bottom-0 left-0 mb-2.5 ml-4'>
          Quis sed amet lectus rhoncus
        </h1>
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Sapien rutrum amet, ac
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
      </div>
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
        Sollicitudin convallis placerat id
        </h2>
        <ol className='mt-4 flex flex-col gap-4 w-2/3 list-decimal'>
          {recipe.analyzedInstructions.map(instruction => {
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
      <div className='my-16'>
        <h2 className='text-xl font-medium'>
          Dignissim et nisl
        </h2>
        <div className='flex flex-row gap-x-4'>
          {nutrition.map(item => {
            return (
              <div key={item.name} className='w-full basis-1/4 h-28 bg-gray-200 relative mt-4 flex flex-col items-center justify-center p-4'>
                <Image
                  src='https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=1&auto=format%2Ccompress&fit=crop&w=2399&h=594%201x,%20https://images.unsplash.com/photo-1649509557437-ed6357197b5e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1vZi10aGUtZGF5fHx8fGVufDB8fHx8&dpr=2&auto=format%2Ccompress&fit=crop&w=2399&h=594%202x'
                  alt='Picture of the author'
                  layout='fill'
                  className='object-cover z-0'
                />
                <p className='text-center text-lg z-50'>{item.value}</p>
                <p className='text-center text-lg z-50'>{item.name}</p>
              </div>
            )
          })}
        </div>
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

  // const recipes = data.recipes
  const nutrition = [
    { name: 'calories', value: data2.calories },
    { name: 'carbs', value: data2.carbs },
    { name: 'fats', value: data2.fat },
    { name: 'proteins', value: data2.protein }]
  // const recipe = recipes[0]

  const parametros = new URLSearchParams({ spoonId: Number(params.id) })
  const recipe = await fetch(`http://localhost:4000/api/inventory?${parametros.toString()}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${req.cookies['next-auth.session-token']}`
    }
  }).then(res => res.json())

  return {
    props: {
      email: session.user.email,
      recipe,
      nutrition,
      token: req.cookies['next-auth.session-token']
    }
  }
}

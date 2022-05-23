import BMICalculator from 'compute-bmi'
import { toDate, toTimestamp, fromTimestamp } from './dates'

const __TODAY = toTimestamp(toDate(new Date()))

export function getUserNut (user) {
  // user.targetWeight
  const imcObjetive = new BMICalculator({ height: user.height, weight: 60 })
  const { nutrients, ...data } = imcObjetive.results()
  data.carbohydrates = nutrients.carbohydrates
  data.protein = nutrients.protein
  data.fat = nutrients.fat
  const goal = data

  // Recorta la informacion de los menus de done se obtendran los nutrientes
  // supeustamente ingeridos por el usuario para una fecha determinada
  let recipes = user.menus
    .map(item => {
      return {
        date: item.date,
        recipes: item.recipes.map(item => {
          return {
            nutrition: item.nutrition
          }
        })
      }
    })
    .map(item => { return { ...item, date: toTimestamp(item.date) } })
    .filter(item => item.date <= __TODAY)
    .sort((a, b) => a.date - b.date)
    .map(item => { return { ...item, date: fromTimestamp(item.date) } })

  if (recipes.length >= 7) {
    recipes = recipes.slice(recipes.length - 7)
  }
  // Calculo agregado de los nutrientes ingeridos por el usuario para X fecha
  const dict = new Map()
  let item = {}
  for (const value of recipes) {
    const _date = value.date // Fecha de un menu
    const _recipes = value.recipes // Lista de recetas de un menu en un fecha
    _recipes.forEach(element => {
      // Objeto de nutrientes
      item = {
        calories: Number(element.nutrition[0].value.substring(0, element.nutrition[0].value.length - 1)) || 0,
        carbs: Number(element.nutrition[1].value.substring(0, element.nutrition[1].value.length - 1)) || 0,
        fat: Number(element.nutrition[2].value.substring(0, element.nutrition[2].value.length - 1)) || 0,
        protein: Number(element.nutrition[3].value.substring(0, element.nutrition[3].value.length - 1)) || 0
      }

      // Calculo de los nutrientes tomados en una fecha
      if (dict.has(_date)) {
        dict.calories = (dict.calories + 0) || dict.calories
        dict.carbs = (dict.carbs + 0) || dict.carbs
        dict.fat = (dict.fat + 0) || dict.fat
        dict.protein = (dict.protein + 0) || dict.protein
      } else {
        dict.set(_date, item)
      }
    })
  }

  // transformacion de los resultados para ser recorridos de forma sencilla
  // map -> [{date, taken{}}]
  let dataList = []
  for (const [date, taken] of dict) {
    dataList.push({ date, taken })
  }

  // Añadimos a dataList los datos de los nutrientes que deberia tomar el usuario en base a su imc
  const userIMC = getUserIMC(user)
  dataList = dataList.map(item => {
    let should
    userIMC.forEach(element => {
      if (item.date === element.date) {
        should = element.imc
      }
    })
    return {
      ...item,
      should,
      goal
    }
  })

  return dataList
}

export function getUserIMC (user) {
  // Ordena los pesos del usuario en base a los timestamp
  let weightList = user.weight
    .map(item => { return { ...item, date: toTimestamp(item.date) } })
    .filter(item => item.date <= __TODAY)
    .sort((a, b) => a.date - b.date)
    .map(item => { return { ...item, date: fromTimestamp(item.date) } })
  // Se queda con los ultimos 7 datos o menos si no tiene mas de 7
  if (weightList.length >= 7) {
    weightList = weightList.slice(weightList.length - 7)
  }
  // Calcula los imc del usuario para cada fecha
  const imcList = weightList.map(item => {
    const calculate = new BMICalculator({ height: user.height, weight: item.weight })
    const { nutrients, ...data } = calculate.results()
    data.carbohydrates = nutrients.carbohydrates
    data.protein = nutrients.protein
    data.fat = nutrients.fat
    return {
      date: item.date,
      imc: data
    }
  })
  return imcList
}

export function getUserPreferences (user) {
  const mealsArray = user.menus.map(item => item.recipes)
  const meals = []
  mealsArray.forEach(array => {
    array.forEach(meal => {
      meals.push({
        // calories: meal.nutrition[0].value,
        carbs: Number(meal.nutrition[1].value.substring(0, meal.nutrition[1].value.length - 1)),
        fat: Number(meal.nutrition[2].value.substring(0, meal.nutrition[2].value.length - 1)),
        protein: Number(meal.nutrition[3].value.substring(0, meal.nutrition[3].value.length - 1))
      })
    })
  })
  return meals
}

/**
 * Recibe un array de objetos como el generado en la funcion: getUserNut()
 * y lo transforma a uno con la siguiente estructura:
 * [{
 *  date: String
 *  values: {
 *    calories: Number,
 *    carbs: Number,
 *    fat: Number,
 *    protein: Number
 *  }
 * }]
 * @param {Array} data
 * @returns {Array}
 */
export function formatData (data) {
  return data.map(item => {
    const values = {
      calories: item.taken.calories / item.should.kcal * 100,
      carbs: item.taken.carbs / item.should.carbohydrates * 100,
      fat: item.taken.fat / item.should.fat * 100,
      protein: item.taken.protein / item.should.protein * 100
    }
    return {
      date: item.date,
      values
    }
  })
}

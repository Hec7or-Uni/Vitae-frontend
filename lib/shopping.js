import { toTimestamp, fromTimestamp, __TODAY } from './dates'

function trunc (x, posiciones = 0) {
  const s = x.toString()
  const l = s.length
  const decimalLength = s.indexOf('.') + 1

  if (l - decimalLength <= posiciones) {
    return x
  }
  // Parte decimal del número
  const isNeg = x < 0
  const decimal = x % 1
  const entera = isNeg ? Math.ceil(x) : Math.floor(x)
  // Parte decimal como número entero
  // Ejemplo: parte decimal = 0.77
  // decimalFormated = 0.77 * (10^posiciones)
  // si posiciones es 2 ==> 0.77 * 100
  // si posiciones es 3 ==> 0.77 * 1000
  const decimalFormated = Math.floor(
    Math.abs(decimal) * Math.pow(10, posiciones)
  )
  // Sustraemos del número original la parte decimal
  // y le sumamos la parte decimal que hemos formateado
  const finalNum = entera +
    ((decimalFormated / Math.pow(10, posiciones)) * (isNeg ? -1 : 1))

  return finalNum
}

export function generateShoppingList (user) {
  const menus = user.menus
    .map(item => { return { ...item, date: toTimestamp(item.date) } })
    .filter(item => item.date >= __TODAY && item.date <= __TODAY + 7 * 3600 * 1000)
    .sort((a, b) => a.date - b.date)
    .map(item => { return { ...item, date: fromTimestamp(item.date) } })

  const tempIngredientes = menus.map(menu => { return menu.recipes.map(recipe => recipe.extendedIngredients) })
  const listaIngrediente = []
  tempIngredientes.forEach(element => {
    element.forEach(subelemment => {
      subelemment.forEach(ingrediente => {
        listaIngrediente.push(ingrediente)
      })
    })
  })
  const dict = new Map()
  let item = {}
  for (const value of listaIngrediente) {
    item = { nombre: value.name, cantidad: Number(value.amount), unidad: value.unit }
    if (dict.has(value.name)) {
      item.cantidad = (dict.get(value.name).cantidad + item.cantidad) || dict.get(value.id).cantidad
    }
    dict.set(value.name, item)
  }

  const lista = []
  // eslint-disable-next-line no-unused-vars
  for (const [key, i] of dict) {
    lista.push({
      text: i.nombre,
      quantity: trunc(i.cantidad, 2),
      unit: i.unidad
    })
  }
  return lista
}

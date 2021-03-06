export function zip () {
  const args = [].slice.call(arguments)
  const shortest = args.length === 0
    ? []
    : args.reduce(function (a, b) {
      return a.length < b.length ? a : b
    })

  return shortest.map(function (_, i) {
    return args.map(function (array) { return array[i] })
  })
}

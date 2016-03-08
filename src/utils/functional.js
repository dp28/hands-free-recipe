export function reduce(initial, array) {
  let fullArray = [initial, ...array]
  return Array.prototype.reduce.bind(fullArray)
}

export function forEach(arrayLike) {
  return Array.prototype.forEach.bind(arrayLike)
}

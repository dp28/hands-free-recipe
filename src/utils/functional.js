export function reduce(initial, array) {
  let fullArray = [initial, ...array]
  return Array.prototype.reduce.bind(fullArray)
}

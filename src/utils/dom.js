export function findArrayOf(element) {
  return selector => asArray(element.querySelectorAll(selector))
}

export function asArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

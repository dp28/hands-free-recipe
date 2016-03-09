export function forEach(arrayLike) {
  return Array.prototype.forEach.bind(arrayLike)
}

export function concat(first, second) {
  return first.concat(second)
}

export function contains(substring) {
  return string => string.includes(substring)
}

export function match(regex) {
  return string => string.match(regex)
}

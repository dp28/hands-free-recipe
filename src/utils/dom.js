export function findArrayOf(element) {
  return selector => asArray(element.querySelectorAll(selector))
}

export function findArrayByXPath(xPath) {
  return element => iteratorToArray(findByXPath(element, xPath))
}

export function asArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

export function forceFullScreen(element) {
  element.setAttribute('class', 'force-full-screen')
}

export function findByXPath(element, xPath) {
  if (element)
    return document.evaluate(xPath, element, null, XPathResult.ANY_TYPE, null)
  else
    return element
}

function iteratorToArray(iterator) {
  let array = []
  let next = iterator ? iterator.iterateNext() : iterator
  while (next) {
    array.push(next)
    next = iterator.iterateNext()
  }
  return array
}

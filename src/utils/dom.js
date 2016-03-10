export function findArrayOf(element) {
  return selector => asArray(element.querySelectorAll(selector))
}

export function findArrayByXPath(xPath) {
  return element => iteratorToArray(findByXPath(element, xPath))
}

export function asArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike)
}

function findByXPath(element, xPath) {
  return document.evaluate(xPath, element, null, XPathResult.ANY_TYPE, null)
}

function iteratorToArray(iterator) {
  let array = []
  let next = iterator.iterateNext()
  while (next) {
    array.push(next)
    next = iterator.iterateNext()
  }
  return array
}

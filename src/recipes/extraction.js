import { findArrayOf, asArray } from '../utils/dom.js'
import { concat, match } from '../utils/functional.js'

export function findMethod() {
  let methodList = lists().find(isMethod)
  if (methodList)
    return findArrayOf(methodList)('li').map(item => item.textContent)
  else
    return null
}

function lists() {
  return ['ol', 'ul'].map(findArrayOf(document)).reduce(concat)
}

function isMethod(list) {
  let includesMethod = match(/method/i)
  let className = list.getAttribute('class')
  return includesMethod(list.id) || (className && includesMethod(className))
}


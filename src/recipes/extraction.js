import { findArrayOf, asArray } from '../utils/dom'
import { concat, match } from '../utils/functional'
import { buildRecipe } from './recipe'

export function extractRecipe() {
  let ingredients = findListBy(isSemantically('ingredients'))
  let method = findListBy(isSemantically('method'))
  return (ingredients && method) ? buildRecipe(ingredients, method) : null
}

function findListBy(isCorrectType) {
  let list = lists().find(isCorrectType)
  if (list)
    return findArrayOf(list)('li').map(item => item.textContent)
  else
    return null
}

function lists() {
  return ['ol', 'ul'].map(findArrayOf(document)).reduce(concat)
}

function isSemantically(typeName) {
  let includesType = match(new RegExp(typeName, 'i'))
  return list => {
    let className = list.getAttribute('class')
    return includesType(list.id) || (className && includesType(className))
  }
}


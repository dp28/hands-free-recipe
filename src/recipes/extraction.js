import { findArrayOf, findArrayByXPath } from '../utils/dom'
import { concat, match } from '../utils/functional'
import { buildRecipe } from './recipe'

export function extractRecipe() {
  let ingredients = findListItemsWithin('ingredients', document.body)
  let method = findListItemsWithin('method', document.body)
  return (ingredients && method) ? buildRecipe(ingredients, method) : null
}

function findListItemsWithin(typeName, element) {
  let listsIn = findListsWhere(isSemantically(typeName))
  return findArrayByXPath('./li')(listsIn(element)[0]).map(textWithoutTooltips)
}

function findListsWhere(subXPath) {
  let listXPath = ".//*[local-name()='ol' or local-name()='ul']"
  return findArrayByXPath(listXPath + subXPath)
}

function isSemantically(typeName) {
  return `[contains(@id, '${typeName}') or contains(@class, '${typeName}')]`
}

function textWithoutTooltips(node) {
  let removeToolTipText = (text, tip) => text.replace(tip.textContent, '')
  let tooltips = findArrayByXPath('.//*[contains(@role, "tooltip")]')(node)
  return tooltips.reduce(removeToolTipText, node.textContent)
}

export default function extractRecipe(element) {
  let ingredients = findListItemsWithin('ingredients', element);
  let instructions = findListItemsWithin('method', element);
  if (nonEmpty(ingredients) && nonEmpty(instructions))
    return { ingredients, instructions };
  else
    return null;
}

function nonEmpty(array) {
  return array && array.length;
}

function findListItemsWithin(typeName, element) {
  let listsIn = findListsWhere(isSemantically(typeName));
  return findArrayByXPath('./li')(listsIn(element)[0]).map(textWithoutTooltips);
}

function findListsWhere(subXPath) {
  let listXPath = './/*[local-name()="ol" or local-name()="ul"]';
  return findArrayByXPath(listXPath + subXPath);
}

function isSemantically(typeName) {
  return `[contains(@id, '${typeName}') or contains(@class, '${typeName}')]`;
}

function textWithoutTooltips(node) {
  let removeToolTipText = (text, tip) => text.replace(tip.textContent, '');
  let tooltips = findArrayByXPath('.//*[contains(@role, "tooltip")]')(node);
  return tooltips.reduce(removeToolTipText, node.textContent);
}

function findArrayByXPath(xPath) {
  return element => iteratorToArray(findByXPath(element, xPath));
}

function findByXPath(element, xPath) {
  if (element)
    return document.evaluate(xPath, element, null, XPathResult.ANY_TYPE, null);
  else
    return element;
}

function iteratorToArray(iterator) {
  let array = [];
  let next = iterator ? iterator.iterateNext() : iterator;
  while (next) {
    array.push(next);
    next = iterator.iterateNext();
  }
  return array;
}

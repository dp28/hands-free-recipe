export function scaleFontSizeToFill(element) {
  let fontSize = getFontSize(element)
  if (isOverflowing(element))
    decreaseFontSizeUntilFits(element, fontSize)
  else
    increaseFontSizeUntilFull(element, fontSize)
}

function decreaseFontSizeUntilFits(element, fontSize) {
  while (isOverflowing(element) && fontSize > 10)
    element.style.fontSize = `${--fontSize}px`
}

function increaseFontSizeUntilFull(element, fontSize) {
  while (!isOverflowing(element))
    element.style.fontSize = `${++fontSize}px`
  element.style.fontSize = `${fontSize - 2}px`
}

function getFontSize(element) {
  let sizeMatch = element.style.fontSize.match(/^(\d+)/)
  return sizeMatch ? sizeMatch[0] : 20
}

function isOverflowing(element) {
  return element.offsetHeight < element.scrollHeight ||
    element.offsetWidth < element.scrollWidth
}

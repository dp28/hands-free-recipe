'use strict';

import { extractRecipe } from './recipes/extraction'
import { findByXPath, forceFullScreen } from './utils/dom'

function say(text) {
  console.log('Saying', text)
  chrome.runtime.sendMessage({ say: text })
}

console.log('loaded')
let recipe = extractRecipe()

if (recipe) {
  console.log(recipe)
  let methodXPath = ".//ol/*[contains(@class, 'method')]"
  let node = findByXPath(document.body, methodXPath).iterateNext()
  console.log(node)
  forceFullScreen(node)
}


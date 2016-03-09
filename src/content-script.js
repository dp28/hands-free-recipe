'use strict';

import { extractRecipe } from './recipes/extraction'

function say(text) {
  console.log('Saying', text)
  chrome.runtime.sendMessage({ say: text })
}

console.log('loaded')
console.log(extractRecipe())


'use strict';

import { extractRecipe } from './recipes/extraction'
import { findByXPath, renderTemplate } from './utils/dom'
import { MessageTypes } from './messaging/message-types'
import { broadcast } from './messaging/messaging'
import Recogniser from './speech/recognition'

function say(text) {
  console.log('Saying', text)
  broadcast(MessageTypes.SAY, text)
}

console.log('loaded')
let recipe = extractRecipe()

if (recipe) {
  let methodXPath = ".//ol/*[contains(@class, 'method')]"

  broadcast(MessageTypes.RECIPE_FOUND, recipe)

  let node = findByXPath(document.body, methodXPath).iterateNext()
  document.body.innerHTML = renderTemplate('recipe', { recipe })
}

(new Recogniser()).start()


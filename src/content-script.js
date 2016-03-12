'use strict';

import { extractRecipe } from './recipes/extraction'
import { findByXPath, renderTemplate } from './utils/dom'
import { MessageTypes } from './messaging/message-types'
import { broadcast } from './messaging/messaging'

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

function buildListener() {
  let listener = new webkitSpeechRecognition()
  let log = message => function() { console.log(message, arguments) }
  listener.onstart = log('starting listening...')
  listener.onresult = log('heard')
  listener.onerror = log('recogntion error')
  listener.onend = log('.. stopping listening...')
  listener.continuous = true
  listener.lang = 'en-GB'
  return listener
}

buildListener().start()


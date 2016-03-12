'use strict';

import { extractRecipe } from './recipes/extraction'
import RecipeManager from './recipes/manager'
import { findByXPath, renderTemplate } from './utils/dom'
import { MessageTypes } from './messaging/message-types'
import { broadcast } from './messaging/messaging'
import { log, logInfo } from './utils/logging'
import Recogniser from './speech/recognition'
import CommandRegistry from './commands/registry'

function say(text) {
  broadcast(MessageTypes.SAY, text)
}

console.log('loaded')

let commands = new CommandRegistry()

let recogniser = new Recogniser(commands.getExecutor())
recogniser.start()

let recipe = extractRecipe()

if (recipe) {
  let methodXPath = ".//ol/*[contains(@class, 'method')]"

  broadcast(MessageTypes.RECIPE_FOUND, recipe)

  let node = findByXPath(document.body, methodXPath).iterateNext()
  document.body.innerHTML = renderTemplate('recipe', { recipe })

  let recipeManager = new RecipeManager(recipe)

  commands.register('read current', () => say(recipeManager.currentMethod))
  commands.register('next', () => say(recipeManager.nextMethod()))
}


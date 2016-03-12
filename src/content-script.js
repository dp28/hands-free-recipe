'use strict';

import { extractRecipe } from './recipes/extraction'
import RecipeManager from './recipes/manager'
import { renderTemplate } from './utils/dom'
import { MessageTypes } from './messaging/message-types'
import { broadcast } from './messaging/messaging'
import { log, logInfo } from './utils/logging'
import Recogniser from './speech/recognition'
import CommandRegistry from './commands/registry'

function say(text) {
  return () => broadcast(MessageTypes.SAY, text)
}

console.log('loaded')

let recipe = extractRecipe()

if (recipe) {
  broadcast(MessageTypes.RECIPE_FOUND, recipe)

  addRecipeOverlay(recipe)

  let commands = new CommandRegistry()
  let recogniser = new Recogniser(commands.getExecutor())
  let recipeManager = new RecipeManager(recipe)

  commands.register('read current', say(recipeManager.currentMethod))
  commands.register('next', say(recipeManager.nextMethod()))
  // recogniser.start()
}

function addRecipeOverlay(recipe) {
  let overlay = document.createElement('div')
  overlay.innerHTML = renderTemplate('recipe', { recipe })
  document.body.appendChild(overlay)
  logInfo('appended')
}

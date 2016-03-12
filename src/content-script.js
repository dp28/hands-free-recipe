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

  render('recipe', { recipe })

  let commands = new CommandRegistry()
  let recogniser = new Recogniser(commands.getExecutor())
  let recipeManager = new RecipeManager(recipe)

  commands.register('read current', say(recipeManager.currentMethod))
  commands.register('next', say(recipeManager.nextMethod()))
  // recogniser.start()
}

function render(templateName, data) {
  findOverlay().innerHTML = renderTemplate(templateName, data)
}

const OVERLAY_ID = 'recipe-content-overlay'

function findOverlay() {
  let overlay = document.getElementById(OVERLAY_ID)
  if (overlay)
    return overlay
  overlay = document.createElement('div')
  document.body.appendChild(overlay)
  return overlay
}

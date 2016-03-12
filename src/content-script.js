'use strict';

import { extractRecipe } from './recipes/extraction'
import RecipeManager from './recipes/manager'
import { renderOverlay } from './rendering/templating'
import { MessageTypes } from './messaging/message-types'
import { broadcast, handleMessages } from './messaging/messaging'
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

  renderOverlay('recipe', { recipe })

  let commands = new CommandRegistry()
  let recogniser = new Recogniser(commands.getExecutor())
  let recipeManager = new RecipeManager(recipe)

  commands.register('read current', say(recipeManager.currentMethod))
  commands.register('next', say(recipeManager.nextMethod()))
  // recogniser.start()

  handleMessages({
    [MessageTypes.NEXT_METHOD]: function() {
      renderOverlay('focused', { text: recipeManager.nextMethod() })
    }
  })
}

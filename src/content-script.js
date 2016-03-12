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
  broadcast(MessageTypes.SAY, text)
}

console.log('loaded')

let recipe = extractRecipe()

if (recipe) {
  broadcast(MessageTypes.RECIPE_FOUND, recipe)

  renderOverlay('recipe', { recipe })

  let commands = new CommandRegistry()
  let recogniser = new Recogniser(commands.getExecutor())
  let recipeManager = new RecipeManager(recipe)

  commands.register('read current', () => say(recipeManager.currentMethod))
  commands.register('next', () => say(recipeManager.nextMethod()))
  // recogniser.start()

  function focus(methodType) {
    return () => {
      let context = { text: recipeManager[`${methodType}Method`]() }
      renderOverlay('focused', context)
    }
  }

  handleMessages({
    [MessageTypes.NEXT_METHOD]: focus('next'),
    [MessageTypes.FOCUS_METHOD]: focus('current'),
    [MessageTypes.PREVIOUS_METHOD]: focus('previous')
  })
}

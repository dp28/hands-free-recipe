'use strict';

import { extractRecipe } from './recipes/extraction'
import RecipeManager from './recipes/manager'
import { renderOverlay } from './dom/rendering'
import { onClickId } from './dom/event-handlers'
import { scaleFontSizeToFill } from './dom/fit-to-size'
import { MessageTypes } from './messaging/message-types'
import { broadcast, handleMessages } from './messaging/messaging'
import { log, logInfo } from './utils/logging'
import CommandRegistry from './commands/registry'

function say(text) {
  broadcast(MessageTypes.SAY, text)
}

console.log('loaded')

let recipe = extractRecipe()

if (recipe) {
  broadcast(MessageTypes.RECIPE_FOUND, recipe)

  renderOverlay('recipe', { recipe })

  let recipeManager = new RecipeManager(recipe)

  function focus(methodType) {
    return () => {
      let context = {
        text: recipeManager[`${methodType}Method`](),
        index: recipeManager.currentMethodIndex + 1
      }
      let overlay = renderOverlay('focused', context)
      let content = overlay.getElementsByClassName('content-overlay')[0]
      scaleFontSizeToFill(content)
      say(context.text)

      onClickId('next', focus('next'))
      onClickId('previous', focus('previous'))
    }
  }

  let commands = new CommandRegistry();

  ['next', 'current', 'previous'].forEach(command => {
    commands.register(command, focus(command))
  })

  handleMessages({
    [MessageTypes.NEXT_METHOD]: focus('next'),
    [MessageTypes.FOCUS_METHOD]: focus('current'),
    [MessageTypes.PREVIOUS_METHOD]: focus('previous'),
    [MessageTypes.SPEECH_INPUT]: commands.getExecutor()
  })
}

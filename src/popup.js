'use strict';

import { handleMessages, broadcast } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'
import { renderTemplate } from './dom/rendering'
import { onClickBroadcast } from './dom/event-handlers'

(() => {

  function replaceHtml(context) {
    document.body.innerHTML = renderTemplate('popup', context)
    onClickBroadcast('next', MessageTypes.NEXT_METHOD)
    onClickBroadcast('focus', MessageTypes.FOCUS_METHOD)
    onClickBroadcast('previous', MessageTypes.PREVIOUS_METHOD)
  }

  document.addEventListener('DOMContentLoaded', () => {
    replaceHtml({ title: 'Hello, world!' })
  })

  let recipe = null

  handleMessages({
    [MessageTypes.RECIPE_FOUND]: function(newRecipe) {
      recipe = newRecipe
      replaceHtml({ title: 'Recipe found' })
    }
  })

})()

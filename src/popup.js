'use strict';

import { handleMessages } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'
import { renderTemplate } from './utils/dom'

(() => {

  function replaceHtml(context) {
    document.body.innerHTML = renderTemplate('popup', context)
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

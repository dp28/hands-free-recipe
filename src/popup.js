'use strict';

import { handleMessages, broadcast } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'
import { renderTemplate } from './rendering/templating'

(() => {

  function replaceHtml(context) {
    document.body.innerHTML = renderTemplate('popup', context)
    document.getElementById('next').onclick = () => {
      broadcast(MessageTypes.NEXT_METHOD)
    }
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

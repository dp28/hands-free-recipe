'use strict';

import { handleMessages } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'
import popupTemplate from 'jade!./templates/popup.jade'

(() => {

  function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = popupTemplate({ title: 'Hello, world!' })
  })

  let recipe = null

  handleMessages({
    [MessageTypes.RECIPE_FOUND]: function(newRecipe) {
      recipe = newRecipe
      document.getElementById('recipe').innerHTML = recipe
    }
  })

})()

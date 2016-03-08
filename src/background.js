'use strict';
import say from './speech/say'

console.log('Starting background script')

chrome.runtime.onMessage.addListener(request => {
  console.log(request)
  if (request.say)
    say(request.say)
})

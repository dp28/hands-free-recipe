'use strict';

console.log('Starting background script')

function say(text) {
  chrome.tts.speak(text, { lang: 'en-GB' })
}


chrome.runtime.onMessage.addListener(function(request) {
  console.log(request)
  if (request.say)
    say(request.say)
});

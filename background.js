'use strict';

console.log('Starting background script')

function say(text) {
  text.split(/[\.,;]/).forEach(textChunk => {
    chrome.tts.speak(textChunk, { lang: 'en-GB', enqueue: true })
  })
}

chrome.runtime.onMessage.addListener(function(request) {
  console.log(request)
  if (request.say)
    say(request.say)
});

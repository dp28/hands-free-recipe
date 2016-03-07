'use strict';

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}
function say(text) {
  chrome.tts.speak(text, { lang: 'en-GB' })
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('Hello, world!')

  say('back again')

});

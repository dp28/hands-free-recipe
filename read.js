'use strict';

function say(text) {
  chrome.runtime.sendMessage({ say: text })
}

say('loaded')



'use strict';

import { forEach } from './utils/functional'

function say(text) {
  console.log('Saying', text)
  chrome.runtime.sendMessage({ say: text })
}

var nodes = document.querySelector('ol').querySelectorAll('li')

console.log('Reading', nodes.length, 'nodes')
forEach(nodes)(node => say(node.textContent))


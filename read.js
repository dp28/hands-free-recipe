'use strict';

function say(text) {
  console.log('Saying', text)
  chrome.runtime.sendMessage({ say: text })
}

function forEachNode(nodes) {
  return Array.prototype.forEach.bind(nodes)
}

var nodes = document.querySelector('ol').querySelectorAll('li')

console.log('Reading', nodes.length, 'nodes')
forEachNode(nodes)(node => say(node.textContent))


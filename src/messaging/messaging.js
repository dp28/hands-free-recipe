export function broadcast(messageType, data) {
  let message = { messageType, data }
  console.log('sending', message)
  chrome.runtime.sendMessage(message)
  sendMessagetoActiveTab(message)
}

export function handleMessages(handler) {
  console.log('registering', handler)
  chrome.runtime.onMessage.addListener(handleMessage(handler))
}

function handleMessage(handler) {
  return message => {
    console.log('received', message)
    let handlerFunction = handler[message.messageType]
    handlerFunction ? handlerFunction(message.data) : null
  }
}

function sendMessagetoActiveTab(message) {
  if (chrome.tabs) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message)
    })
  }
}

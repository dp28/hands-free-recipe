export function broadcast(messageType, data) {
  chrome.runtime.sendMessage({ messageType, data })
}

export function handleMessages(handler) {
  chrome.runtime.onMessage.addListener(handleMessage(handler))
}

function handleMessage(handler) {
  return message =>
    console.log('received', message)
    let handlerFunction = handler[message.messageType]
    handlerFunction ? handlerFunction(data) : null
}

import { broadcast } from '../messaging/messaging'

export function onClickBroadcast(id, messageType) {
  document.getElementById(id).onclick = () => broadcast(messageType)
}

export function onClickId(id, handler) {
  document.getElementById(id).onclick = handler
}

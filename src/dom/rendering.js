import { onClickId } from './event-handlers'

export function renderOverlay(templateName, context) {
  findOverlay(templateName).innerHTML = renderTemplate(templateName, context)
  onClickClose(templateName)
}

export function renderTemplate(templateName, context) {
  return require(`../templates/${templateName}.jade`)(context)
}

function onClickClose(templateName) {
  onClickId(`close-${templateName}`, () => {
    let overlay = document.getElementById('content-overlay-' + templateName)
    overlay.innerHTML = ''
  })
}

function findOverlay(templateName) {
  let id = `content-overlay-${templateName}`
  let overlay = document.getElementById(id)
  if (overlay)
    return overlay
  overlay = document.createElement('div')
  overlay.id = id
  document.body.appendChild(overlay)
  return overlay
}

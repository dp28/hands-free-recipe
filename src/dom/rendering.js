import { onClickId } from './event-handlers'

export function renderOverlay(templateName, context) {
  context.overlayId = overlayId(templateName)
  let overlay = findOverlay(templateName)
  overlay.innerHTML = renderTemplate(templateName, context)
  onClickClose(templateName)
  return overlay
}

export function renderTemplate(templateName, context) {
  return require(`../templates/${templateName}.jade`)(context)
}

function onClickClose(templateName) {
  onClickId(`close-${templateName}`, () => {
    document.getElementById(overlayId(templateName)).innerHTML = ''
  })
}

function overlayId(templateName) {
  return `content-overlay-${templateName}`
}

function findOverlay(templateName) {
  let id = overlayId(templateName)
  let overlay = document.getElementById(id)
  if (overlay)
    return overlay
  overlay = document.createElement('div')
  overlay.id = id
  document.body.appendChild(overlay)
  return overlay
}

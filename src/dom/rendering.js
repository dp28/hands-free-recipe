export function renderOverlay(templateName, context) {
  findOverlay(templateName).innerHTML = renderTemplate(templateName, context)
}

export function closeOverlay(templateName) {
  document.getElementById('content-overlay-' + templateName).innerHTML = ''
}

export function renderTemplate(templateName, context) {
  return require(`../templates/${templateName}.jade`)(context)
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

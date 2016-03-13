export function log(tag) {
  return function(...messages) {
    console.log(tag, ...messages)
  }
}

export const logError = log('Error:')

export const logInfo = log('Info:')

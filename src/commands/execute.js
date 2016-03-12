import { log, logError } from '../utils/logging'

export default function execute(commandString) {
  let command = parseCommand(commandString)
  let handler = commands[command]
  handler ? handler() : logError(`Command "${command}" not handled`)
}

function parseCommand(rawCommand) {
  return rawCommand.trim()
}

const commands = {
  test: log('You passed the test'),
  next: log('Now what?')
}

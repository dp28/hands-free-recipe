import { log, logError } from '../utils/logging'

export default class Registry {

  constructor() {
    this.commands = { test: log('It works') }
  }

  register(command, handler) {
    this.commands[command] = handler
  }

  getExecutor() {
    return this.executeCommand.bind(this)
  }

  executeCommand(commandName) {
    let command = this.parseCommand(commandName)
    let handler = this.commands[command]
    handler ? handler() : logError(`Command "${command}" not handled`)
  }

  parseCommand(rawCommand) {
    return rawCommand.trim()
  }

}

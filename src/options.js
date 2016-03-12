'use strict';

import Recogniser from './speech/recognition'
import CommandRegistry from './commands/registry'

console.log('loaded')

let commands = new CommandRegistry()
let recogniser = new Recogniser(commands.getExecutor())

recogniser.start()

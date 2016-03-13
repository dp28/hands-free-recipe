'use strict';

import Recogniser from './speech/recognition'
import { broadcast } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'

console.log('loaded')

function broadcastSpeechInput(input) {
  broadcast(MessageTypes.SPEECH_INPUT, input)
}

let recogniser = new Recogniser(broadcastSpeechInput)

recogniser.start()

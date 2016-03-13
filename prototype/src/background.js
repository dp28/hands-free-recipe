'use strict';
import say from './speech/say'
import { handleMessages } from './messaging/messaging'
import { MessageTypes } from './messaging/message-types'

console.log('Starting background script')

handleMessages({
  [MessageTypes.SAY]: say
})

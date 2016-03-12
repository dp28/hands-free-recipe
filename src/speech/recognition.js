import { logError, logInfo } from '../utils/logging'

export default class Recogniser {

  constructor(resultHandlerCallback) {
    this.recognition = new webkitSpeechRecognition()
    this.resultHandlerCallback = resultHandlerCallback
    this.recognition.onresult = this.handleResult.bind(this)
    this.recognition.onerror = logError
    this.recognition.lang = 'en-GB'
    this.continuouslyListen()
  }

  continuouslyListen() {
    this.recognition.continuous = true
    this.recognition.onend = this.restart.bind(this)
  }

  start() {
    logInfo('starting recognition')
    this.recognition.start()
  }

  restart() {
    logInfo('restarting')
    this.recognition.stop()
    this.start()
  }

  handleResult(recognitionEvent) {
    this.resultHandlerCallback(this.extractTranscript(recognitionEvent))
  }
  extractTranscript(recognitionEvent) {
    let result = recognitionEvent.results[recognitionEvent.resultIndex]
    return result[0].transcript
  }

}

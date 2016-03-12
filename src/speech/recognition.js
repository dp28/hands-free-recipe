import { logError } from '../utils/logging'

export default class Recogniser {

  constructor() {
    this.recognition = new webkitSpeechRecognition()
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
    console.log('starting recognition')
    this.recognition.start()
  }

  restart() {
    console.log('restarting')
    this.recognition.stop()
    this.start()
  }

  handleResult(recognitionEvent) {
    console.log(this.extractTranscript(recognitionEvent))
  }
  extractTranscript(recognitionEvent) {
    let result = recognitionEvent.results[recognitionEvent.resultIndex]
    return result[0].transcript
  }

}

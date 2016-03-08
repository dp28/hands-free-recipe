import { reduce } from '../utils/functional'

// Chrome only seems able to say a small number of words for a single call to
// the speech API. Over the limit, it cuts out and will not work until
//
//   chrome.tts.stop()
//
// is called. This number of characters seems to be below the limit.
const MAX_SPEECH_LENGTH_IN_CHARACTERS = 250

export default function say(text) {
  speakableChunks(text).forEach(textChunk => {
    chrome.tts.speak(textChunk, { lang: 'en-GB', enqueue: true })
  })
}

function speakableChunks(text) {
  return text.split(/[\.,;]/)
    .map(asChunksSmallEnoughForChrome)
    .reduce((all, next) => all.concat(next))
}

function asChunksSmallEnoughForChrome(text) {
  if (!tooLongForChrome(text))
    return [text]
  return reduce([], text.split(' '))((sentences, word) => {
    return sentences.concat(chromeSizedSentences(sentences.pop() || '', word))
  })
}

function chromeSizedSentences(sentence, word) {
  let sentenceAndWord = `${sentence} ${word}`
  return tooLongForChrome(sentenceAndWord) ? [sentence, word] : [sentenceAndWord]
}

function tooLongForChrome(text) {
  return text.length > MAX_SPEECH_LENGTH_IN_CHARACTERS
}

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// Chrome only seems able to say a small number of words for a single call to
	// the speech API. Over the limit, it cuts out and will not work until
	//
	//   chrome.tts.stop()
	//
	// is called. This number of characters seems to be below the limit.

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var MAX_SPEECH_LENGTH_IN_CHARACTERS = 250;

	console.log('Starting background script');

	chrome.runtime.onMessage.addListener(function (request) {
	  console.log(request);
	  if (request.say) say(request.say);
	});

	function say(text) {
	  speakableChunks(text).forEach(function (textChunk) {
	    chrome.tts.speak(textChunk, { lang: 'en-GB', enqueue: true });
	  });
	}

	function speakableChunks(text) {
	  return text.split(/[\.,;]/).map(asChunksSmallEnoughForChrome).reduce(function (all, next) {
	    return all.concat(next);
	  });
	}

	function asChunksSmallEnoughForChrome(text) {
	  if (!tooLongForChrome(text)) return [text];
	  return reduce([], text.split(' '))(function (sentences, word) {
	    return sentences.concat(chromeSizedSentences(sentences.pop() || '', word));
	  });
	}

	function chromeSizedSentences(sentence, word) {
	  var sentenceAndWord = sentence + ' ' + word;
	  return tooLongForChrome(sentenceAndWord) ? [sentence, word] : [sentenceAndWord];
	}

	function tooLongForChrome(text) {
	  return text.length > MAX_SPEECH_LENGTH_IN_CHARACTERS;
	}

	function reduce(initial, array) {
	  var fullArray = [initial].concat(_toConsumableArray(array));
	  return Array.prototype.reduce.bind(fullArray);
	}

/***/ }
/******/ ]);
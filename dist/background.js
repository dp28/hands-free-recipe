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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _say = __webpack_require__(2);

	var _say2 = _interopRequireDefault(_say);

	var _messaging = __webpack_require__(3);

	var _messageTypes = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	console.log('Starting background script');

	(0, _messaging.handleMessages)(_defineProperty({}, _messageTypes.MessageTypes.SAY, _say2.default));

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = say;
	// Chrome only seems able to say a small number of words for a single call to
	// the speech API. Over the limit, it cuts out and will not work until
	//
	//   chrome.tts.stop()
	//
	// is called. This number of characters seems to be below the limit.
	var MAX_SPEECH_LENGTH_IN_CHARACTERS = 250;

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
	  return text.split(' ').reduce(function (sentences, word) {
	    return sentences.concat(chromeSizedSentences(sentences.pop() || '', word));
	  }, []);
	}

	function chromeSizedSentences(sentence, word) {
	  var sentenceAndWord = sentence + ' ' + word;
	  return tooLongForChrome(sentenceAndWord) ? [sentence, word] : [sentenceAndWord];
	}

	function tooLongForChrome(text) {
	  return text.length > MAX_SPEECH_LENGTH_IN_CHARACTERS;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.broadcast = broadcast;
	exports.handleMessages = handleMessages;
	function broadcast(messageType, data) {
	  var message = { messageType: messageType, data: data };
	  console.log('sending', message);
	  chrome.runtime.sendMessage(message);
	  sendMessagetoActiveTab(message);
	}

	function handleMessages(handler) {
	  console.log('registering', handler);
	  chrome.runtime.onMessage.addListener(handleMessage(handler));
	}

	function handleMessage(handler) {
	  return function (message) {
	    console.log('received', message);
	    var handlerFunction = handler[message.messageType];
	    handlerFunction ? handlerFunction(message.data) : null;
	  };
	}

	function sendMessagetoActiveTab(message) {
	  if (chrome.tabs) {
	    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	      chrome.tabs.sendMessage(tabs[0].id, message);
	    });
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MessageTypes = exports.MessageTypes = {
	  RECIPE_FOUND: 'recipe_found',
	  NEXT_METHOD: 'next_method',
	  PREVIOUS_METHOD: 'previous_method',
	  FOCUS_METHOD: 'focus_method',
	  SAY: 'say'
	};

/***/ }
/******/ ]);
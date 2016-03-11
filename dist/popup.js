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
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _messaging = __webpack_require__(11);

	var _messageTypes = __webpack_require__(12);

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	(function () {

	  function renderStatus(statusText) {
	    document.getElementById('status').textContent = statusText;
	  }

	  document.addEventListener('DOMContentLoaded', function () {
	    renderStatus('Hello, world!');
	  });

	  var recipe = null;

	  (0, _messaging.handleMessages)(_defineProperty({}, _messageTypes.MessageTypes.RECIPE_FOUND, function (newRecipe) {
	    recipe = newRecipe;
	    document.getElementById('recipe').innerHTML = recipe;
	  }));
	})();

/***/ },

/***/ 11:
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

/***/ },

/***/ 12:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MessageTypes = exports.MessageTypes = {
	  RECIPE_FOUND: 'recipe_found',
	  SAY: 'say'
	};

/***/ }

/******/ });
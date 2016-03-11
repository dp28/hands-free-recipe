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

	var _extraction = __webpack_require__(2);

	var _dom = __webpack_require__(3);

	var _messageTypes = __webpack_require__(12);

	var _messaging = __webpack_require__(11);

	function say(text) {
	  console.log('Saying', text);
	  (0, _messaging.broadcast)(_messageTypes.MessageTypes.SAY, text);
	}

	console.log('loaded');
	var recipe = (0, _extraction.extractRecipe)();

	if (recipe) {
	  var methodXPath = ".//ol/*[contains(@class, 'method')]";

	  (0, _messaging.broadcast)(_messageTypes.MessageTypes.RECIPE_FOUND, recipe);

	  var node = (0, _dom.findByXPath)(document.body, methodXPath).iterateNext();
	  (0, _dom.forceFullScreen)(node);
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.extractRecipe = extractRecipe;

	var _dom = __webpack_require__(3);

	var _functional = __webpack_require__(4);

	var _recipe = __webpack_require__(5);

	function extractRecipe() {
	  var ingredients = findListItemsWithin('ingredients', document.body);
	  var method = findListItemsWithin('method', document.body);
	  return (0, _recipe.buildRecipe)(ingredients, method);
	}

	function findListItemsWithin(typeName, element) {
	  var listsIn = findListsWhere(isSemantically(typeName));
	  return (0, _dom.findArrayByXPath)('./li')(listsIn(element)[0]).map(textWithoutTooltips);
	}

	function findListsWhere(subXPath) {
	  var listXPath = ".//*[local-name()='ol' or local-name()='ul']";
	  return (0, _dom.findArrayByXPath)(listXPath + subXPath);
	}

	function isSemantically(typeName) {
	  return '[contains(@id, \'' + typeName + '\') or contains(@class, \'' + typeName + '\')]';
	}

	function textWithoutTooltips(node) {
	  var removeToolTipText = function removeToolTipText(text, tip) {
	    return text.replace(tip.textContent, '');
	  };
	  var tooltips = (0, _dom.findArrayByXPath)('.//*[contains(@role, "tooltip")]')(node);
	  return tooltips.reduce(removeToolTipText, node.textContent);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.findArrayOf = findArrayOf;
	exports.findArrayByXPath = findArrayByXPath;
	exports.asArray = asArray;
	exports.findByXPath = findByXPath;
	function findArrayOf(element) {
	  return function (selector) {
	    return asArray(element.querySelectorAll(selector));
	  };
	}

	function findArrayByXPath(xPath) {
	  return function (element) {
	    return iteratorToArray(findByXPath(element, xPath));
	  };
	}

	function asArray(arrayLike) {
	  return Array.prototype.slice.call(arrayLike);
	}

	function findByXPath(element, xPath) {
	  if (element) return document.evaluate(xPath, element, null, XPathResult.ANY_TYPE, null);else return element;
	}

	function iteratorToArray(iterator) {
	  var array = [];
	  var next = iterator ? iterator.iterateNext() : iterator;
	  while (next) {
	    array.push(next);
	    next = iterator.iterateNext();
	  }
	  return array;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.forEach = forEach;
	exports.concat = concat;
	exports.contains = contains;
	exports.match = match;
	function forEach(arrayLike) {
	  return Array.prototype.forEach.bind(arrayLike);
	}

	function concat(first, second) {
	  return first.concat(second);
	}

	function contains(substring) {
	  return function (string) {
	    return string.includes(substring);
	  };
	}

	function match(regex) {
	  return function (string) {
	    return string.match(regex);
	  };
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.buildRecipe = buildRecipe;
	function buildRecipe(ingredients, methods) {
	  if (canBuildRecipe(ingredients, methods)) return buildRecipeFromParts(ingredients, methods);
	  return null;
	}

	function canBuildRecipe(ingredients, method) {
	  return nonEmpty(ingredients) && nonEmpty(method);
	}

	function nonEmpty(list) {
	  return list && list.length;
	}

	function buildRecipeFromParts(ingredients, methods) {
	  return {
	    ingredients: ingredients,
	    methods: methods
	  };
	}

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 12 */
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
/******/ ]);
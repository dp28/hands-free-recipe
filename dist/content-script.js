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

	function say(text) {
	  console.log('Saying', text);
	  chrome.runtime.sendMessage({ say: text });
	}

	console.log('loaded');
	console.log((0, _extraction.extractRecipe)());

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
	  var ingredients = findListBy(isSemantically('ingredients'));
	  var method = findListBy(isSemantically('method'));
	  return ingredients && method ? (0, _recipe.buildRecipe)(ingredients, method) : null;
	}

	function findListBy(isCorrectType) {
	  var list = lists().find(isCorrectType);
	  if (list) return (0, _dom.findArrayOf)(list)('li').map(function (item) {
	    return item.textContent;
	  });else return null;
	}

	function lists() {
	  return ['ol', 'ul'].map((0, _dom.findArrayOf)(document)).reduce(_functional.concat);
	}

	function isSemantically(typeName) {
	  var includesType = (0, _functional.match)(new RegExp(typeName, 'i'));
	  return function (list) {
	    var className = list.getAttribute('class');
	    return includesType(list.id) || className && includesType(className);
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.findArrayOf = findArrayOf;
	exports.asArray = asArray;
	function findArrayOf(element) {
	  return function (selector) {
	    return asArray(element.querySelectorAll(selector));
	  };
	}

	function asArray(arrayLike) {
	  return Array.prototype.slice.call(arrayLike);
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
	  return {
	    ingredients: ingredients,
	    methods: methods
	  };
	}

/***/ }
/******/ ]);
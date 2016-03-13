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

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _extractRecipe = __webpack_require__(1);

	var _extractRecipe2 = _interopRequireDefault(_extractRecipe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ContentScriptController = function () {
	  function ContentScriptController() {
	    _classCallCheck(this, ContentScriptController);
	  }

	  _createClass(ContentScriptController, [{
	    key: 'start',
	    value: function start() {
	      console.debug('starting');
	      this.recipe = (0, _extractRecipe2.default)(document.body);
	      console.debug('found', this.recipe);
	    }
	  }]);

	  return ContentScriptController;
	}();

	var controller = new ContentScriptController();
	controller.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extractRecipe;

	var _recipe = __webpack_require__(2);

	var _recipe2 = _interopRequireDefault(_recipe);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function extractRecipe(element) {
	  var ingredients = findListItemsWithin('ingredients', element);
	  var instructions = findListItemsWithin('method', element);
	  if (nonEmpty(ingredients) && nonEmpty(instructions)) return new _recipe2.default(ingredients, instructions);else return null;
	}

	function nonEmpty(array) {
	  return array && array.length;
	}

	function findListItemsWithin(typeName, element) {
	  var listsIn = findListsWhere(isSemantically(typeName));
	  return findArrayByXPath('./li')(listsIn(element)[0]).map(textWithoutTooltips);
	}

	function findListsWhere(subXPath) {
	  var listXPath = './/*[local-name()="ol" or local-name()="ul"]';
	  return findArrayByXPath(listXPath + subXPath);
	}

	function isSemantically(typeName) {
	  return '[contains(@id, \'' + typeName + '\') or contains(@class, \'' + typeName + '\')]';
	}

	function textWithoutTooltips(node) {
	  var removeToolTipText = function removeToolTipText(text, tip) {
	    return text.replace(tip.textContent, '');
	  };
	  var tooltips = findArrayByXPath('.//*[contains(@role, "tooltip")]')(node);
	  return tooltips.reduce(removeToolTipText, node.textContent);
	}

	function findArrayByXPath(xPath) {
	  return function (element) {
	    return iteratorToArray(findByXPath(element, xPath));
	  };
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
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Recipe = function () {
	  function Recipe(ingredients, instructions) {
	    _classCallCheck(this, Recipe);

	    this.ingredients = ingredients;
	    this.instructions = instructions;
	    this.instructionIndex = 0;
	  }

	  _createClass(Recipe, [{
	    key: "currentInstruction",
	    value: function currentInstruction() {
	      return this.instructions[this.instructionIndex];
	    }
	  }, {
	    key: "nextInstruction",
	    value: function nextInstruction() {
	      if (this.instructionIndex < this.instructions.length - 1) this.instructionIndex++;
	      return this.currentInstruction();
	    }
	  }, {
	    key: "previousInstruction",
	    value: function previousInstruction() {
	      if (this.instructionIndex > 0) this.instructionIndex--;
	      return this.currentInstruction();
	    }
	  }]);

	  return Recipe;
	}();

	exports.default = Recipe;

/***/ }
/******/ ]);
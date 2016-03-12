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

	var _extraction = __webpack_require__(5);

	var _manager = __webpack_require__(16);

	var _manager2 = _interopRequireDefault(_manager);

	var _rendering = __webpack_require__(22);

	var _eventHandlers = __webpack_require__(23);

	var _fitToSize = __webpack_require__(24);

	var _messageTypes = __webpack_require__(4);

	var _messaging = __webpack_require__(3);

	var _logging = __webpack_require__(17);

	var _registry = __webpack_require__(19);

	var _registry2 = _interopRequireDefault(_registry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function say(text) {
	  (0, _messaging.broadcast)(_messageTypes.MessageTypes.SAY, text);
	}

	console.log('loaded');

	var recipe = (0, _extraction.extractRecipe)();

	if (recipe) {
	  (function () {
	    var _handleMessages;

	    // recogniser.start()

	    var focus = function focus(methodType) {
	      return function () {
	        var context = {
	          text: recipeManager[methodType + 'Method'](),
	          index: recipeManager.currentMethodIndex + 1
	        };
	        var overlay = (0, _rendering.renderOverlay)('focused', context);
	        var content = overlay.getElementsByClassName('content-overlay')[0];
	        (0, _fitToSize.scaleFontSizeToFill)(content);

	        (0, _eventHandlers.onClickId)('next', focus('next'));
	        (0, _eventHandlers.onClickId)('previous', focus('previous'));
	      };
	    };

	    (0, _messaging.broadcast)(_messageTypes.MessageTypes.RECIPE_FOUND, recipe);

	    (0, _rendering.renderOverlay)('recipe', { recipe: recipe });

	    var commands = new _registry2.default();
	    var recipeManager = new _manager2.default(recipe);

	    commands.register('read current', function () {
	      return say(recipeManager.currentMethod);
	    });
	    commands.register('next', function () {
	      return say(recipeManager.nextMethod());
	    });

	    (0, _messaging.handleMessages)((_handleMessages = {}, _defineProperty(_handleMessages, _messageTypes.MessageTypes.NEXT_METHOD, focus('next')), _defineProperty(_handleMessages, _messageTypes.MessageTypes.FOCUS_METHOD, focus('current')), _defineProperty(_handleMessages, _messageTypes.MessageTypes.PREVIOUS_METHOD, focus('previous')), _defineProperty(_handleMessages, _messageTypes.MessageTypes.SPEECH_INPUT, commands.getExecutor()), _handleMessages));
	  })();
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.broadcast = broadcast;
	exports.handleMessages = handleMessages;

	var _logging = __webpack_require__(17);

	function broadcast(messageType, data) {
	  var message = { messageType: messageType, data: data };
	  (0, _logging.logInfo)('sending', message);
	  chrome.runtime.sendMessage(message);
	  sendMessagetoActiveTab(message);
	}

	function handleMessages(handler) {
	  console.log('registering', handler);
	  chrome.runtime.onMessage.addListener(handleMessage(handler));
	}

	function handleMessage(handler) {
	  return function (message) {
	    (0, _logging.logInfo)('received', message);
	    var handlerFunction = handler[message.messageType];
	    handlerFunction ? handlerFunction(message.data) : null;
	  };
	}

	function sendMessagetoActiveTab(message) {
	  if (chrome.tabs) {
	    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	      (0, _logging.logInfo)('sending to active tab');
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
	  SPEECH_INPUT: 'speech_input',
	  SAY: 'say'
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.extractRecipe = extractRecipe;

	var _finders = __webpack_require__(21);

	var _functional = __webpack_require__(14);

	var _recipe = __webpack_require__(15);

	function extractRecipe() {
	  var ingredients = findListItemsWithin('ingredients', document.body);
	  var method = findListItemsWithin('method', document.body);
	  return (0, _recipe.buildRecipe)(ingredients, method);
	}

	function findListItemsWithin(typeName, element) {
	  var listsIn = findListsWhere(isSemantically(typeName));
	  return (0, _finders.findArrayByXPath)('./li')(listsIn(element)[0]).map(textWithoutTooltips);
	}

	function findListsWhere(subXPath) {
	  var listXPath = ".//*[local-name()='ol' or local-name()='ul']";
	  return (0, _finders.findArrayByXPath)(listXPath + subXPath);
	}

	function isSemantically(typeName) {
	  return '[contains(@id, \'' + typeName + '\') or contains(@class, \'' + typeName + '\')]';
	}

	function textWithoutTooltips(node) {
	  var removeToolTipText = function removeToolTipText(text, tip) {
	    return text.replace(tip.textContent, '');
	  };
	  var tooltips = (0, _finders.findArrayByXPath)('.//*[contains(@role, "tooltip")]')(node);
	  return tooltips.reduce(removeToolTipText, node.textContent);
	}

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./focused.jade": 8,
		"./layouts/overlay.jade": 11,
		"./popup.jade": 12,
		"./recipe.jade": 13
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 7;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(9);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (index, overlayId, text) {
	buf.push("<div class=\"content-mask\"></div><div" + (jade.attr("id", overlayId, true, true)) + " class=\"content-overlay\"><input id=\"close-focused\" type=\"button\" value=\"Close\"><input id=\"previous\" type=\"button\" value=\"previous\"><input id=\"next\" type=\"button\" value=\"next\"><div id=\"focused-text\"><span class=\"index\">" + (jade.escape((jade_interp = index + '.') == null ? '' : jade_interp)) + "</span><span class=\"text\">" + (jade.escape((jade_interp = text) == null ? '' : jade_interp)) + "</span></div></div>");}.call(this,"index" in locals_for_with?locals_for_with.index:typeof index!=="undefined"?index:undefined,"overlayId" in locals_for_with?locals_for_with.overlayId:typeof overlayId!=="undefined"?overlayId:undefined,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined));;return buf.join("");
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */

	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];

	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }

	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }

	  return a;
	};

	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */

	function nulls(val) {
	  return val != null && val !== '';
	}

	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) :
	    (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
	    [val]).filter(nulls).join(' ');
	}

	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};


	exports.style = function (val) {
	  if (val && typeof val === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
	                   'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' +
	                   'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};

	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse){
	  var buf = [];

	  var keys = Object.keys(obj);

	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i]
	        , val = obj[key];

	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }

	  return buf.join('');
	};

	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */

	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;

	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}

	exports.escape = jade_escape;
	function jade_escape(html){
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;
	  else return result;
	};

	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */

	exports.rethrow = function rethrow(err, filename, lineno, str){
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(10).readFileSync(filename, 'utf8')
	  } catch (ex) {
	    rethrow(err, null, lineno)
	  }
	  var context = 3
	    , lines = str.split('\n')
	    , start = Math.max(lineno - context, 0)
	    , end = Math.min(lines.length, lineno + context);

	  // Error context
	  var context = lines.slice(start, end).map(function(line, i){
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ')
	      + curr
	      + '| '
	      + line;
	  }).join('\n');

	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno
	    + '\n' + context + '\n\n' + err.message;
	  throw err;
	};

	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(9);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (overlayId) {
	buf.push("<div class=\"content-mask\"></div><div" + (jade.attr("id", overlayId, true, true)) + " class=\"content-overlay\"></div>");}.call(this,"overlayId" in locals_for_with?locals_for_with.overlayId:typeof overlayId!=="undefined"?overlayId:undefined));;return buf.join("");
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(9);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (title) {
	buf.push("<div class=\"popup\"><div id=\"title\">" + (jade.escape((jade_interp = title) == null ? '' : jade_interp)) + "</div><input id=\"focus\" type=\"button\" value=\"focus\"><input id=\"next\" type=\"button\" value=\"next\"><input id=\"previous\" type=\"button\" value=\"previous\"></div>");}.call(this,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined));;return buf.join("");
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(9);

	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (overlayId, recipe, undefined) {
	buf.push("<div class=\"content-mask\"></div><div" + (jade.attr("id", overlayId, true, true)) + " class=\"content-overlay\"><div id=\"recipe\"><h1>Recipe</h1><input id=\"close-recipe\" type=\"button\" value=\"Close\"><h2>Ingredients</h2><ul id=\"ingredients\">");
	// iterate recipe.ingredients
	;(function(){
	  var $$obj = recipe.ingredients;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var ingredient = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = ingredient) == null ? '' : jade_interp)) + "</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var ingredient = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = ingredient) == null ? '' : jade_interp)) + "</li>");
	    }

	  }
	}).call(this);

	buf.push("</ul><h2>Method</h2><ol id=\"methods\">");
	// iterate recipe.methods
	;(function(){
	  var $$obj = recipe.methods;
	  if ('number' == typeof $$obj.length) {

	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var method = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = method) == null ? '' : jade_interp)) + "</li>");
	    }

	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var method = $$obj[$index];

	buf.push("<li>" + (jade.escape((jade_interp = method) == null ? '' : jade_interp)) + "</li>");
	    }

	  }
	}).call(this);

	buf.push("</ol></div></div>");}.call(this,"overlayId" in locals_for_with?locals_for_with.overlayId:typeof overlayId!=="undefined"?overlayId:undefined,"recipe" in locals_for_with?locals_for_with.recipe:typeof recipe!=="undefined"?recipe:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var RecipeManager = function () {
	  function RecipeManager(recipe) {
	    _classCallCheck(this, RecipeManager);

	    this.recipe = recipe;
	    this.currentMethodIndex = 0;
	  }

	  _createClass(RecipeManager, [{
	    key: "currentMethod",
	    value: function currentMethod() {
	      return this.recipe.methods[this.currentMethodIndex];
	    }
	  }, {
	    key: "nextMethod",
	    value: function nextMethod() {
	      if (this.currentMethodIndex < this.recipe.methods.length - 1) this.currentMethodIndex++;
	      return this.currentMethod();
	    }
	  }, {
	    key: "previousMethod",
	    value: function previousMethod() {
	      if (this.currentMethodIndex > 0) this.currentMethodIndex--;
	      return this.currentMethod();
	    }
	  }]);

	  return RecipeManager;
	}();

	exports.default = RecipeManager;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.log = log;
	function log(tag) {
	  return function () {
	    var _console;

	    for (var _len = arguments.length, messages = Array(_len), _key = 0; _key < _len; _key++) {
	      messages[_key] = arguments[_key];
	    }

	    (_console = console).log.apply(_console, [tag].concat(messages));
	  };
	}

	var logError = exports.logError = log('Error:');

	var logInfo = exports.logInfo = log('Info:');

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _logging = __webpack_require__(17);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Registry = function () {
	  function Registry() {
	    _classCallCheck(this, Registry);

	    this.commands = { test: (0, _logging.log)('It works') };
	  }

	  _createClass(Registry, [{
	    key: 'register',
	    value: function register(command, handler) {
	      this.commands[command] = handler;
	    }
	  }, {
	    key: 'getExecutor',
	    value: function getExecutor() {
	      return this.executeCommand.bind(this);
	    }
	  }, {
	    key: 'executeCommand',
	    value: function executeCommand(commandName) {
	      var command = this.parseCommand(commandName);
	      var handler = this.commands[command];
	      handler ? handler() : (0, _logging.logError)('Command "' + command + '" not handled');
	    }
	  }, {
	    key: 'parseCommand',
	    value: function parseCommand(rawCommand) {
	      return rawCommand.trim();
	    }
	  }]);

	  return Registry;
	}();

	exports.default = Registry;

/***/ },
/* 20 */,
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.renderOverlay = renderOverlay;
	exports.renderTemplate = renderTemplate;

	var _eventHandlers = __webpack_require__(23);

	function renderOverlay(templateName, context) {
	  context.overlayId = overlayId(templateName);
	  var overlay = findOverlay(templateName);
	  overlay.innerHTML = renderTemplate(templateName, context);
	  onClickClose(templateName);
	  return overlay;
	}

	function renderTemplate(templateName, context) {
	  return __webpack_require__(7)("./" + templateName + '.jade')(context);
	}

	function onClickClose(templateName) {
	  (0, _eventHandlers.onClickId)('close-' + templateName, function () {
	    document.getElementById(overlayId(templateName)).innerHTML = '';
	  });
	}

	function overlayId(templateName) {
	  return 'content-overlay-' + templateName;
	}

	function findOverlay(templateName) {
	  var id = overlayId(templateName);
	  var overlay = document.getElementById(id);
	  if (overlay) return overlay;
	  overlay = document.createElement('div');
	  overlay.id = id;
	  document.body.appendChild(overlay);
	  return overlay;
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.onClickBroadcast = onClickBroadcast;
	exports.onClickId = onClickId;

	var _messaging = __webpack_require__(3);

	function onClickBroadcast(id, messageType) {
	  document.getElementById(id).onclick = function () {
	    return (0, _messaging.broadcast)(messageType);
	  };
	}

	function onClickId(id, handler) {
	  var button = document.getElementById(id);
	  if (button) button.onclick = handler;
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.scaleFontSizeToFill = scaleFontSizeToFill;
	function scaleFontSizeToFill(element) {
	  var fontSize = getFontSize(element);
	  if (isOverflowing(element)) decreaseFontSizeUntilFits(element, fontSize);else increaseFontSizeUntilFull(element, fontSize);
	}

	function decreaseFontSizeUntilFits(element, fontSize) {
	  while (isOverflowing(element) && fontSize > 10) {
	    element.style.fontSize = --fontSize + "px";
	  }
	}

	function increaseFontSizeUntilFull(element, fontSize) {
	  while (!isOverflowing(element)) {
	    element.style.fontSize = ++fontSize + "px";
	  }element.style.fontSize = fontSize - 2 + "px";
	}

	function getFontSize(element) {
	  var sizeMatch = element.style.fontSize.match(/^(\d+)/);
	  return sizeMatch ? sizeMatch[0] : 20;
	}

	function isOverflowing(element) {
	  return element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth;
	}

/***/ }
/******/ ]);
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

	var _recognition = __webpack_require__(15);

	var _recognition2 = _interopRequireDefault(_recognition);

	var _registry = __webpack_require__(16);

	var _registry2 = _interopRequireDefault(_registry);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('loaded');

	var commands = new _registry2.default();
	var recogniser = new _recognition2.default(commands.getExecutor());

	recogniser.start();

/***/ },

/***/ 14:
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

/***/ 15:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _logging = __webpack_require__(14);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Recogniser = function () {
	  function Recogniser(resultHandlerCallback) {
	    _classCallCheck(this, Recogniser);

	    this.recognition = new webkitSpeechRecognition();
	    this.resultHandlerCallback = resultHandlerCallback;
	    this.recognition.onresult = this.handleResult.bind(this);
	    this.recognition.onerror = _logging.logError;
	    this.recognition.lang = 'en-GB';
	    this.continuouslyListen();
	  }

	  _createClass(Recogniser, [{
	    key: 'continuouslyListen',
	    value: function continuouslyListen() {
	      this.recognition.continuous = true;
	      this.recognition.onend = this.restart.bind(this);
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      (0, _logging.logInfo)('starting recognition');
	      this.recognition.start();
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      (0, _logging.logInfo)('restarting');
	      (0, _logging.logInfo)(arguments);
	      this.recognition.stop();
	      this.start();
	    }
	  }, {
	    key: 'handleResult',
	    value: function handleResult(recognitionEvent) {
	      (0, _logging.log)('result')(recognitionEvent);
	      this.resultHandlerCallback(this.extractTranscript(recognitionEvent));
	    }
	  }, {
	    key: 'extractTranscript',
	    value: function extractTranscript(recognitionEvent) {
	      var result = recognitionEvent.results[recognitionEvent.resultIndex];
	      return result[0].transcript;
	    }
	  }]);

	  return Recogniser;
	}();

	exports.default = Recogniser;

/***/ },

/***/ 16:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _logging = __webpack_require__(14);

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

/***/ }

/******/ });
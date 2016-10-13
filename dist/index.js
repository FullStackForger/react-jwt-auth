(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Auth = exports.Google = exports.Facebook = undefined;

	var _shared = __webpack_require__(1);

	var _local = __webpack_require__(7);

	var _user = __webpack_require__(8);

	var _facebook = __webpack_require__(9);

	var _facebook2 = _interopRequireDefault(_facebook);

	var _google = __webpack_require__(13);

	var _google2 = _interopRequireDefault(_google);

	var _auth = __webpack_require__(14);

	var _auth2 = _interopRequireDefault(_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Facebook = _facebook2.default;
	exports.Google = _google2.default;
	exports.Auth = _auth2.default;
	exports.default = {
		Auth: _auth2.default,
		Facebook: _facebook2.default,
		Google: _google2.default,
		isAuthenticated: _shared.isAuthenticated,
		login: _local.login,
		logout: _local.logout,
		signup: _local.signup,
		getToken: _shared.getToken,
		setToken: _shared.setToken,
		refreshToken: _local.refreshToken,
		getAuthHeader: _shared.getAuthHeader,
		getProfile: _user.getProfile,
		updateProfile: _user.updateProfile
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isAuthenticated = exports.getAuthHeader = exports.removeToken = exports.getToken = exports.setToken = undefined;

	var _storage = __webpack_require__(2);

	var _storage2 = _interopRequireDefault(_storage);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var setToken = exports.setToken = function setToken(token) {
	    return _storage2.default.set(_config2.default.tokenName, token);
	};

	var getToken = exports.getToken = function getToken() {
	    var asJSON = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	    var token = _storage2.default.get(_config2.default.tokenName);
	    if (asJSON) return (0, _utils.parseJWT)(token);
	    return token;
	};

	var removeToken = exports.removeToken = function removeToken() {
	    _storage2.default.remove(_config2.default.tokenName);
	};

	var getAuthHeader = exports.getAuthHeader = function getAuthHeader() {
	    var token = void 0;
	    if (isAuthenticated() && _config2.default.authHeader && _config2.default.authToken) {
	        var _token = _config2.default.authToken + ' ' + getToken();
	        return _defineProperty({}, _config2.default.authHeader, _token);
	    }
	    return {};
	};

	var isAuthenticated = exports.isAuthenticated = function isAuthenticated() {
	    var token = (0, _utils.parseJWT)(getToken());
	    if (!token) return false;

	    var exp = token.payload.exp;
	    if (!exp) return true;

	    var isExpTimestamp = typeof exp === 'number';
	    if (!isExpTimestamp) return false;
	    return Math.round(new Date().getTime() / 1000) < exp;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _storage = __webpack_require__(3);

	var _storage2 = _interopRequireDefault(_storage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = new _storage2.default({
		storage: window.localStorage ? localStorage : null
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var cache = {};

	var Storage = function Storage() {
		var _this = this;

		var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Storage);

		Object.keys(Storage.defaults).map(function (key) {
			_this[key] = opts.hasOwnProperty(key) ? opts[key] : Storage.defaults[key];
		});
	};

	exports.default = Storage;


	Storage.defaults = {
		storage: window.localStorage || null };

	Storage.create = function (opts) {
		return new Storage(opts);
	};

	Storage.cache = cache;

	Storage.prototype.cache = cache;

	Storage.prototype.get = function (key) {
		try {
			return this.storage.getItem(key);
		} catch (e) {
			return this.cache[key];
		}
	};

	Storage.prototype.set = function (key, value) {
		try {
			this.storage.setItem(key, value);
			return value;
		} catch (e) {
			return this.cache[key] = value;
		}
	};

	Storage.prototype.remove = function (key) {
		try {
			this.storage.removeItem(key);
		} catch (e) {
			delete this.cache[key];
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _defaults = __webpack_require__(5);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Config = function Config() {
	    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _defaults.configOpts;

	    _classCallCheck(this, Config);

	    this.assign(opts);
	};

	Config.prototype.defaults = _defaults.configOpts;

	Config.prototype.assign = function (opts) {
	    var config = this;
	    Object.keys(_defaults.configOpts).map(function (key) {
	        config[key] = opts.hasOwnProperty(key) ? opts[key] : _defaults.configOpts[key];
	    });
	};

	exports.default = new Config();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var configOpts = exports.configOpts = {
		tokenName: 'if-token',
		authHeader: 'Authorization',
		authToken: 'Bearer',
		baseUrl: '/',
		loginUrl: 'auth/login',
		signupUrl: 'auth/signup',
		refreshUrl: 'auth/refresh',
		oauthUrl: 'auth/{provider}', // dynamic
		profileUrl: 'me'
	};

	var fetchOpts = exports.fetchOpts = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var checkResponseStatus = exports.checkResponseStatus = function checkResponseStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response;
	  } else {
	    var error = new Error(response.statusText);
	    error.response = response;
	    throw error;
	  }
	};

	var parseResponseToJSON = exports.parseResponseToJSON = function parseResponseToJSON(response) {
	  return response.json();
	};

	var parseJWT = exports.parseJWT = function parseJWT(token) {
	  if (!token) return null;
	  var base64Url = token;
	  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

	  var parts = base64.split('.');
	  if (parts.length != 3) return null;

	  try {
	    var _parts = _slicedToArray(parts, 3);

	    var headerRaw = _parts[0];
	    var payloadRaw = _parts[1];
	    var signatureRaw = _parts[2];


	    var header = JSON.parse(atob(headerRaw));
	    var payload = JSON.parse(atob(payloadRaw));
	    var signature = atob(signatureRaw);
	    return {
	      header: header,
	      payload: payload,
	      signature: signature
	    };
	  } catch (err) {
	    console.error(err);
	    return null;
	  }
	};

	var isDefined = exports.isDefined = function isDefined(value) {
	  return value !== undefined && value !== null;
	};

	var parseQueryString = exports.parseQueryString = function parseQueryString(str) {
	  var obj = {};
	  var key = void 0;
	  var value = void 0;
	  (str || '').split('&').forEach(function (keyValue) {
	    if (keyValue) {
	      value = keyValue.split('=');
	      key = decodeURIComponent(value[0]);
	      obj[key] = isDefined(value[1]) ? decodeURIComponent(value[1]) : true;
	    }
	  });
	  return obj;
	};

	// HotFix: Facebook redirects back with '_=_' hash which breaks the app
	var preventBadFacebookHash = exports.preventBadFacebookHash = function preventBadFacebookHash() {
	  var fbHashAppendix = /_=_/;
	  if (fbHashAppendix.test(window.location.hash)) {
	    window.location.hash = window.location.hash.replace(fbHashAppendix, '');
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.exchangeCodeForToken = exports.refreshToken = exports.logout = exports.login = exports.signup = undefined;

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _defaults = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var _shared = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var signup = exports.signup = function signup(userData, options) {
		var baseUrl = _config2.default.baseUrl;
		var signupUrl = _config2.default.signupUrl;

		var url = baseUrl + signupUrl;
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'POST',
			body: JSON.stringify(userData)
		});

		return fetch(url, opts).then(_utils.checkResponseStatus).then(_utils.parseResponseToJSON).then(function (data) {
			return { token: (0, _shared.setToken)(data.token) };
		});
	};

	var login = exports.login = function login(userData, options) {
		var baseUrl = _config2.default.baseUrl;
		var loginUrl = _config2.default.loginUrl;

		var url = baseUrl + loginUrl;
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'POST',
			body: JSON.stringify(userData)
		}, options);

		return fetch(url, opts).then(_utils.checkResponseStatus).then(_utils.parseResponseToJSON).then(function (data) {
			return { token: (0, _shared.setToken)(data.token) };
		});
	};

	var logout = exports.logout = function logout() {
		return new Promise(function (resolve, reject) {
			setTimeout(function () {
				if (!!(0, _shared.getToken)()) {
					(0, _shared.removeToken)();
					resolve({ success: true });
				} else {
					reject(new Error('You are trying to log out unauthenticated user.'));
				}
			});
		});
	};

	var refreshToken = exports.refreshToken = function refreshToken(options) {
		var baseUrl = _config2.default.baseUrl;
		var refreshUrl = _config2.default.refreshUrl;

		var url = baseUrl + refreshUrl;
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'GET',
			headers: Object.assign({}, _defaults.fetchOpts.headers, (0, _shared.getAuthHeader)())
		}, options);
		return fetch(url, opts).then(_utils.checkResponseStatus).then(_utils.parseResponseToJSON).then(function (data) {
			return { token: (0, _shared.setToken)(data.token) };
		});
	};

	var exchangeCodeForToken = exports.exchangeCodeForToken = function exchangeCodeForToken(provider, oauthData, options) {
		var baseUrl = _config2.default.baseUrl;
		var oauthUrl = _config2.default.oauthUrl;

		var url = baseUrl + oauthUrl.replace('{provider}', provider);
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'POST',
			body: JSON.stringify(oauthData)
		}, options);
		return fetch(url, opts).then(_utils.checkResponseStatus).then(_utils.parseResponseToJSON).then(function (data) {
			return { token: (0, _shared.setToken)(data.token) };
		});
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.updateProfile = exports.getProfile = undefined;

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _defaults = __webpack_require__(5);

	var _utils = __webpack_require__(6);

	var _shared = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getProfile = exports.getProfile = function getProfile(options) {
		var baseUrl = _config2.default.baseUrl;
		var profileUrl = _config2.default.profileUrl;

		var url = baseUrl + profileUrl;
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'GET',
			headers: Object.assign({}, _defaults.fetchOpts.headers, (0, _shared.getAuthHeader)())
		}, options);
		return fetch(url, opts).then(_utils.checkResponseStatus).then(_utils.parseResponseToJSON);
	};

	var updateProfile = exports.updateProfile = function updateProfile(profileData, options) {
		var baseUrl = _config2.default.baseUrl;
		var profileUrl = _config2.default.profileUrl;

		var url = baseUrl + profileUrl;
		var opts = Object.assign({}, _defaults.fetchOpts, {
			method: 'PUT',
			headers: Object.assign({}, _defaults.fetchOpts.headers, (0, _shared.getAuthHeader)()),
			body: JSON.stringify(profileData)
		}, options);
		return fetch(url, opts).then(_utils.checkResponseStatus);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _oauth = __webpack_require__(11);

	var _oauth2 = _interopRequireDefault(_oauth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultProps = {
		clientId: null,
		name: 'facebook',
		label: 'Sign in with Facebook',
		tokenEndpoint: '/auth/facebook',
		oauthProvider: 'facebook',
		oauthEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
		redirectUri: window.location.origin + '/', // FB requires be followed by trailing slash for FB
		requiredUrlParams: ['display', 'scope'],
		scope: ['email'],
		scopeDelimiter: ',',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 580, height: 400 },
		style: {
			color: '#fff',
			backgroundColor: '#3b5998',
			border: '1px solid #335190',
			padding: '5px 15px'
		},
		className: 'btn btn-md'
	};

	var Facebook = function (_Component) {
		_inherits(Facebook, _Component);

		function Facebook() {
			_classCallCheck(this, Facebook);

			return _possibleConstructorReturn(this, (Facebook.__proto__ || Object.getPrototypeOf(Facebook)).apply(this, arguments));
		}

		_createClass(Facebook, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_oauth2.default,
					this.props,
					this.props.children || null
				);
			}
		}]);

		return Facebook;
	}(_react.Component);

	exports.default = Facebook;


	Facebook.defaultProps = defaultProps;
	Facebook.propTypes = _oauth2.default.propTypes;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _storage = __webpack_require__(2);

	var _storage2 = _interopRequireDefault(_storage);

	var _popupButton = __webpack_require__(12);

	var _popupButton2 = _interopRequireDefault(_popupButton);

	var _local = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
		name: _react.PropTypes.string.isRequired,
		label: _react.PropTypes.string,
		clientId: _react.PropTypes.string.isRequired,
		onSignIn: _react.PropTypes.func,
		onSignInSuccess: _react.PropTypes.func,
		onSignInFailed: _react.PropTypes.func,
		tokenEndpoint: _react.PropTypes.string.isRequired,
		oauthProvider: _react.PropTypes.string.isRequired,
		oauthEndpoint: _react.PropTypes.string.isRequired,
		redirectUri: _react.PropTypes.string,
		scope: _react.PropTypes.arrayOf(_react.PropTypes.string),
		scopePrefix: _react.PropTypes.string,
		scopeDelimiter: _react.PropTypes.string,
		state: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
		requiredUrlParams: _react.PropTypes.arrayOf(_react.PropTypes.string),
		defaultUrlParams: _react.PropTypes.arrayOf(_react.PropTypes.string),
		responseType: _react.PropTypes.string,
		responseParams: _react.PropTypes.arrayOf(_react.PropTypes.string),
		oauthType: _react.PropTypes.string,
		popupOptions: _react.PropTypes.shape({
			width: _react.PropTypes.number,
			height: _react.PropTypes.number
		}),
		style: _react.PropTypes.object,
		polling: _react.PropTypes.bool
	};

	var defaultProps = {
		defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
		responseType: 'code',
		responseParams: ['code', 'clientId', 'redirectUri'],
		oauthType: '2.0',
		style: {},
		popupOptions: { width: 500, height: 500 },
		polling: true
	};

	var OAuth2 = function (_Component) {
		_inherits(OAuth2, _Component);

		function OAuth2(props) {
			_classCallCheck(this, OAuth2);

			//const { name, state, popupOptions, redirectUri, responseType } = params
			var _this = _possibleConstructorReturn(this, (OAuth2.__proto__ || Object.getPrototypeOf(OAuth2)).call(this, props));

			_this.onClick = _this.onClick.bind(_this);
			_this.onClose = _this.onClose.bind(_this);
			return _this;
		}

		_createClass(OAuth2, [{
			key: 'buildQueryString',
			value: function buildQueryString() {
				var props = this.props;
				var urlParamsCategories = ['defaultUrlParams', 'requiredUrlParams', 'optionalUrlParams'];
				var keyValuePairs = [];

				urlParamsCategories.forEach(function (paramsCategory) {

					if (!props[paramsCategory] || !props[paramsCategory].forEach) {
						return;
					}

					props[paramsCategory].forEach(function (paramName) {

						var paramValue = typeof props[paramName] === 'function' ? props[paramName]() : props[OAuth2.camelCase(paramName)];

						if (paramName === 'redirect_uri' && !paramValue) {
							return;
						}

						if (paramName === 'state') {
							var stateName = props.name + '_state';
							paramValue = encodeURIComponent(_storage2.default.get(stateName));
						}

						if (paramName === 'scope' && Array.isArray(paramValue)) {
							paramValue = paramValue.join(props.scopeDelimiter);
							if (props.scopePrefix) {
								paramValue = [props.scopePrefix, paramValue].join(props.scopeDelimiter);
							}
						}

						keyValuePairs.push([paramName, paramValue]);
					});
				});

				return keyValuePairs.map(function (pair) {
					return pair.join('=');
				}).join('&');
			}
		}, {
			key: 'onClick',
			value: function onClick() {
				if (this.onSignIn) {
					this.onSignIn(Object.assign({}, this.props));
				}
			}
		}, {
			key: 'onClose',
			value: function onClose(queryStringData) {
				var _this2 = this;

				if (!queryStringData.error) {
					(function () {
						var oauthData = {};
						var provider = _this2.props.oauthProvider;
						_this2.props.responseParams.forEach(function (prop) {
							switch (prop) {
								case 'code':
									oauthData[prop] = queryStringData.code;
									break;
								case 'clientId':
								case 'redirectUri':
									oauthData[prop] = _this2.props[prop];
									break;
								default:
									oauthData[prop] = queryStringData[key];
							}
						});

						(0, _local.exchangeCodeForToken)(provider, oauthData).then(function (token) {
							if (_this2.props.onSignInSuccess) {
								_this2.props.onSignInSuccess({ token: token });
							}
						}).catch(function (error) {
							if (_this2.props.onSignInFailed) {
								_this2.props.onSignInFailed(error);
							}
						});
					})();
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var popupProps = {
					label: props.label,
					width: props.width,
					height: props.height,
					popupUrl: [props.oauthEndpoint, this.buildQueryString()].join('?'),
					redirectUri: props.redirectUri, // todo: remove coupling with popup
					polling: props.polling,
					onClick: this.onClick,
					onClose: this.onClose,
					style: props.style,
					className: props.className
				};

				return _react2.default.createElement(
					_popupButton2.default,
					popupProps,
					this.props.children || null
				);
			}
		}]);

		return OAuth2;
	}(_react.Component);

	exports.default = OAuth2;


	OAuth2.camelCase = function (name) {
		return name.replace(/([\:\-\_]+(.))/g, function (_, separator, letter, offset) {
			return offset ? letter.toUpperCase() : letter;
		});
	};

	OAuth2.propTypes = propTypes;
	OAuth2.defaultProps = defaultProps;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var propTypes = {
		style: _react.PropTypes.object,
		width: _react.PropTypes.number,
		height: _react.PropTypes.number,
		popupUrl: _react.PropTypes.string.isRequired,
		autoClose: _react.PropTypes.bool,
		autoCloseUri: _react.PropTypes.string,
		onClick: _react.PropTypes.func,
		onClose: _react.PropTypes.func,
		polling: _react.PropTypes.bool
	};

	var defaultProps = {
		style: {},
		width: 500,
		height: 500,
		polling: true,
		autoClose: true
	};

	var PopupButton = function (_React$Component) {
		_inherits(PopupButton, _React$Component);

		function PopupButton(props) {
			_classCallCheck(this, PopupButton);

			var _this = _possibleConstructorReturn(this, (PopupButton.__proto__ || Object.getPrototypeOf(PopupButton)).call(this, props));

			_this.state = {
				open: false
			};

			_this.onClick = _this.onClick.bind(_this);
			return _this;
		}

		_createClass(PopupButton, [{
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				if (this.state.open) {
					this.open();
				}
			}
		}, {
			key: 'onClick',
			value: function onClick() {
				this.setState({ open: true });
				if (this.props.onClick) {
					this.props.onClick();
				}
			}
		}, {
			key: 'onClose',
			value: function onClose(queryStringData) {
				this.setState({ open: false });
				if (this.props.onClose) {
					this.props.onClose(queryStringData);
				}
			}
		}, {
			key: 'open',
			value: function open() {
				var _props = this.props;
				var height = _props.height;
				var width = _props.width;

				var options = {
					width: width,
					height: height,
					top: window.screenY + (window.outerHeight - height) / 2.5,
					left: window.screenX + (window.outerWidth - width) / 2,
					resizable: 0, // IE only
					scrollbars: 0 // IE, Firefox & Opera only
				};

				var popup = window.open(this.props.popupUrl, '_blank', PopupButton.generateSpec(options));
				popup.focus();

				if (this.props.popupUrl === 'about:blank') {
					popup.document.body.innerHTML = 'Loading...';
				}

				if (this.props.polling) {
					this.pollPopup(popup);
				}
			}
		}, {
			key: 'pollPopup',
			value: function pollPopup(window) {
				var _this2 = this;

				var autoCloseUriPath = !this.props.autoCloseUri ? document.location.origin + document.location.pathname : this.props.autoCloseUri;

				var queryStringData = {};
				var closing = false;

				var polling = setInterval(function () {
					if (!window || window.closed || closing) {
						clearInterval(polling);
						if (queryStringData.error) {
							console.error(queryStringData.error);
						}
						_this2.onClose(queryStringData);
						window.close();
					}
					try {
						var popupUrlPath = window.location.origin + window.location.pathname;

						// todo: decouple, use handler to this outside
						if (popupUrlPath === autoCloseUriPath) {
							if (window.location.search || window.location.hash) {
								var query = (0, _utils.parseQueryString)(window.location.search.substring(1).replace(/\/$/, ''));
								var hash = (0, _utils.parseQueryString)(window.location.hash.substring(1).replace(/[\/$]/, ''));
								queryStringData = Object.assign({}, query, hash);
								closing = _this2.props.autoClose;
							} else {
								console.info('OAuth redirect has occurred but no query or hash parameters were found.');
							}
						}
					} catch (error) {
						// Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
						// A hack to get around same-origin security policy errors in Internet Explorer.
					}
				}, 250);
			}
		}, {
			key: 'renderInternalElement',
			value: function renderInternalElement() {
				if (this.props.children instanceof Array) {
					return this.props.children;
				}
				return _react2.default.cloneElement(this.props.children, {
					onClick: this.onClick
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return this.props.children ? this.renderInternalElement(this.props) : _react2.default.createElement(
					'button',
					{ onClick: this.onClick,
						style: this.props.style,
						className: this.props.className
					},
					this.props.label
				);
			}
		}]);

		return PopupButton;
	}(_react2.default.Component);

	PopupButton.generateSpec = function (options) {
		return Object.keys(options).reduce(function (previous, current, index) {
			var final = index == 1 ? previous + '=' + options[previous] : previous;
			return final + ',' + current + '=' + options[current];
		});
	};

	PopupButton.defaultProps = defaultProps;
	PopupButton.propTypes = propTypes;

	exports.default = PopupButton;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _oauth = __webpack_require__(11);

	var _oauth2 = _interopRequireDefault(_oauth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultProps = {
		clientId: null,
		name: 'google',
		label: 'Sign in with Google',
		tokenEndpoint: '/auth/google',
		oauthProvider: 'google',
		oauthEndpoint: 'https://accounts.google.com/o/oauth2/auth',
		redirectUri: window.location.origin,
		requiredUrlParams: ['scope'],
		optionalUrlParams: ['display', 'state'],
		scope: ['profile', 'email'],
		scopePrefix: 'openid',
		scopeDelimiter: ' ',
		display: 'popup',
		oauthType: '2.0',
		popupOptions: { width: 452, height: 533 },
		style: {
			color: '#fff',
			backgroundColor: '#dd4b39',
			border: '1px solid #d54331',
			padding: '5px 15px'
		},
		state: function state() {
			return encodeURIComponent(Math.random().toString(36).substr(2));
		}
	};

	var Google = function (_Component) {
		_inherits(Google, _Component);

		function Google() {
			_classCallCheck(this, Google);

			return _possibleConstructorReturn(this, (Google.__proto__ || Object.getPrototypeOf(Google)).apply(this, arguments));
		}

		_createClass(Google, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement(
					_oauth2.default,
					this.props,
					this.props.children || null
				);
			}
		}]);

		return Google;
	}(_react.Component);

	exports.default = Google;


	Google.defaultProps = defaultProps;
	Google.propTypes = _oauth2.default.propTypes;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(10);

	var _react2 = _interopRequireDefault(_react);

	var _config = __webpack_require__(4);

	var _config2 = _interopRequireDefault(_config);

	var _utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Auth = function (_Component) {
		_inherits(Auth, _Component);

		function Auth(props) {
			_classCallCheck(this, Auth);

			var _this = _possibleConstructorReturn(this, (Auth.__proto__ || Object.getPrototypeOf(Auth)).call(this, props));

			_config2.default.assign(props);
			return _this;
		}

		_createClass(Auth, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				(0, _utils.preventBadFacebookHash)();
			}
		}, {
			key: 'render',
			value: function render() {
				return this.props.children;
			}
		}]);

		return Auth;
	}(_react.Component);

	exports.default = Auth;

/***/ }
/******/ ])));
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Will render an html input with autocomplete to remote api src
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Marc Rice 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class Autocomplete configured to load from an external json api with structure: [{key: mykey, value: myvalue}]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * key is visible to the user and value is the selected value
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param String src remote url to target
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @param Integer minLength 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @return HTML autocompleteinput
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');

var Autocomplete = function (_React$Component) {
	_inherits(Autocomplete, _React$Component);

	function Autocomplete() {
		_classCallCheck(this, Autocomplete);

		return _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).apply(this, arguments));
	}

	_createClass(Autocomplete, [{
		key: 'componentDidMount',
		value: function componentDidMount() {

			//avoid crashing servers with a minLength property
			this.optionalMinLength = this.props.minLength || null;
		}
	}, {
		key: 'handleChange',
		value: function handleChange(url) {

			var inputText = document.getElementsByClassName('autocomplete')[0].value;

			if (inputText.length >= this.optionalMinLength) {
				var request = new XMLHttpRequest();

				request.open('GET', this.props.src + "?search=" + inputText, true);

				request.onload = function () {

					//if request returns successfully
					if (request.status >= 200 && request.status < 400) {

						var data = JSON.parse(request.responseText);
						var autocompleteInput = document.getElementsByClassName('autocomplete')[0];
						var resultsContainer = document.getElementsByClassName('autocomplete-results')[0];

						resultsContainer.innerHTML = '';
						autocompleteInput.setAttribute('selected', '');

						Array.prototype.forEach.call(data, function (el, i) {

							var result = document.createElement('a');
							result.setAttribute('value', el.value);
							result.innerHTML = el.key;
							result.onclick = function () {
								autocompleteInput.value = el.key;
								autocompleteInput.selected = el.value;
								resultsContainer.innerHTML = '';
							};
							resultsContainer.appendChild(result);
						});

						//TODO: handle failed response
					} else {}
				};

				request.onerror = function () {
					//TODO: replace with styled dialog boxes https://github.com/reactjs/react-modal
					console.log('connection failed');
				};

				request.send();
			} else {
				var resultsContainer = document.getElementsByClassName('autocomplete-results')[0];
				resultsContainer.innerHTML = '';
			}
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				{ className: 'autocomplete-box' },
				_react2.default.createElement('input', { type: 'text', onChange: this.handleChange.bind(this), className: 'autocomplete' }),
				_react2.default.createElement('div', { className: 'autocomplete-results' })
			);
		}
	}]);

	return Autocomplete;
}(_react2.default.Component);

module.exports = Autocomplete;
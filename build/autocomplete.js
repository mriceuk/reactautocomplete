'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 * @description Will render an html input with autocomplete to remote api src
 * @author Marc Rice 
 * @class Autocomplete configured to load from an external json api with structure: [{key: mykey, value: myvalue}]
 * key is visible to the user and value is the selected value
 * @param String src remote url to target
 * @param Integer minLength 
 * @return HTML autocompleteinput
 */

var React = require('react');

var Autocomplete = exports.Autocomplete = function (_React$Component) {
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
			this.submitBtn = this.props.submitBtn || false;
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
					//TODO: replace with styled dialog boxes 
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

			var submitBtnEl = null;
			console.log(this.submitBtn);
			if (this.submitBtn !== false) {
				submitBtnEl = React.createElement(
					'button',
					{ className: 'autocomplete-submit' },
					this.submitBtn
				);
			}

			return React.createElement(
				'div',
				{ className: 'autocomplete-box' },
				React.createElement('input', { type: 'text', onChange: this.handleChange.bind(this), className: 'autocomplete' }),
				React.createElement('div', { className: 'autocomplete-results' }),
				submitBtnEl
			);
		}
	}]);

	return Autocomplete;
}(React.Component);

module.exports = Autocomplete;
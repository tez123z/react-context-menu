'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContextMenu = function (_React$Component) {
  _inherits(ContextMenu, _React$Component);

  function ContextMenu(props) {
    _classCallCheck(this, ContextMenu);

    var _this = _possibleConstructorReturn(this, (ContextMenu.__proto__ || Object.getPrototypeOf(ContextMenu)).call(this, props));

    _this.openContextMenu = function (event) {
      event.preventDefault();
      _this.setState({ target: event.target });

      var xOffset = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
      var yOffset = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

      var menu = document.getElementById('contextMenu');

      menu.style.cssText = 'left: ' + (event.clientX + xOffset) + 'px;' + 'top: ' + (event.clientY + yOffset) + 'px;' + 'visibility: visible;';
    };

    _this.closeContextMenu = function () {
      var menu = document.getElementById('contextMenu');
      menu.style.cssText = 'visibility: hidden;';
    };

    _this.state = {
      target: ''
    };
    return _this;
  }

  _createClass(ContextMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var context = document.getElementById(this.props.contextID);
      context.addEventListener('contextmenu', function (event) {
        _this2.openContextMenu(event);
      });

      var menu = document.getElementById('contextMenu');
      menu.addEventListener('mouseleave', function () {
        _this2.closeContextMenu();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { id: 'contextMenu' },
        this.props.items.map(function (item) {
          var clickHandler = function clickHandler() {
            _this3.closeContextMenu();
            item.function(_this3.state.target);
          };
          var label = item.label;
          var icon = item.icon;
          return _react2.default.createElement(
            'span',
            { onClick: clickHandler, key: label },
            icon && _react2.default.createElement('img', { className: 'icon', src: icon, role: 'presentation' }),
            label
          );
        })
      );
    }
  }]);

  return ContextMenu;
}(_react2.default.Component);

exports.default = ContextMenu;

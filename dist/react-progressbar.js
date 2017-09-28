(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'prop-types', 'lodash.isequal', 'progressbar.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('prop-types'), require('lodash.isequal'), require('progressbar.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.propTypes, global.lodash, global.progressbar);
        global.main = mod.exports;
    }
})(this, function (exports, _react, _propTypes, _lodash, _progressbar) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SemiCircle = exports.Circle = exports.Line = exports.Shape = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _propTypes2 = _interopRequireDefault(_propTypes);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _progressbar2 = _interopRequireDefault(_progressbar);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Shape = exports.Shape = function (_React$Component) {
        _inherits(Shape, _React$Component);

        function Shape() {
            _classCallCheck(this, Shape);

            return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).apply(this, arguments));
        }

        _createClass(Shape, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                this.shape = null;
                this.create(this.props);
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (!(0, _lodash2.default)(this.props.options, nextProps.options)) {
                    this.destroy();
                    this.create(nextProps, this.props);
                    return false;
                }

                this.animateProgress(nextProps.progress);
                this.setText(nextProps.text);
                return true;
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.destroy();
            }
        }, {
            key: 'setProgress',
            value: function setProgress(progress) {
                this.shape.set(progress);
            }
        }, {
            key: 'setText',
            value: function setText(text) {
                if (text) {
                    this.shape.setText(text);
                }
            }
        }, {
            key: 'create',
            value: function create(nextProps, oldProps) {
                if (this.shape !== null) {
                    throw new Error('Progressbar is already created');
                }

                this.shape = new nextProps.ShapeClass(this.progressBar, nextProps.options);

                if (nextProps.initialAnimate) {
                    if (oldProps) {
                        this.setProgress(oldProps.progress);
                    }

                    this.animateProgress(nextProps.progress);
                } else {
                    this.setProgress(nextProps.progress);
                }

                this.setText(nextProps.text);
            }
        }, {
            key: 'animateProgress',
            value: function animateProgress(progress) {
                this.shape.animate(progress);
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                if (this.shape) {
                    this.shape.destroy();
                    this.shape = null;
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var style = this.props.containerStyle;
                var className = this.props.containerClassName;
                return _react2.default.createElement('div', {
                    className: className,
                    style: style,
                    ref: function ref(node) {
                        _this2.progressBar = node;
                    }
                });
            }
        }]);

        return Shape;
    }(_react2.default.Component);

    Shape.defaultProps = {
        ShapeClass: null,
        options: {},
        progress: 0,
        text: null,
        initialAnimate: false,
        containerStyle: {},
        containerClassName: '.progressbar-container'
    };

    Shape.propTypes = {
        ShapeClass: _propTypes2.default.oneOf([_progressbar2.default.Circle]),
        options: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.object])),
        progress: _propTypes2.default.number,
        text: _propTypes2.default.string,
        initialAnimate: _propTypes2.default.bool,
        containerStyle: _propTypes2.default.objectOf(_propTypes2.default.string),
        containerClassName: _propTypes2.default.string
    };

    var Line = exports.Line = function Line(props) {
        return _react2.default.createElement(Shape, _extends({}, props, { ShapeClass: _progressbar2.default.Line }));
    };

    var Circle = exports.Circle = function Circle(props) {
        return _react2.default.createElement(Shape, _extends({}, props, { ShapeClass: _progressbar2.default.Circle }));
    };

    var SemiCircle = exports.SemiCircle = function SemiCircle(props) {
        return _react2.default.createElement(Shape, _extends({}, props, { ShapeClass: _progressbar2.default.SemiCircle }));
    };
});

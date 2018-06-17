(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'react', 'react-dom', 'lodash/isEqual', 'progressbar.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('react'), require('react-dom'), require('lodash/isEqual'), require('progressbar.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.react, global.reactDom, global.isEqual, global.progressbar);
        global.main = mod.exports;
    }
})(this, function (module, _react, _reactDom, _isEqual, _progressbar) {
    'use strict';

    var _react2 = _interopRequireDefault(_react);

    var _isEqual2 = _interopRequireDefault(_isEqual);

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

    var Shape = function (_Component) {
        _inherits(Shape, _Component);

        function Shape(props) {
            _classCallCheck(this, Shape);

            var _this = _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).call(this, props));

            _this.state = {
                shape: null
            };
            return _this;
        }

        _createClass(Shape, [{
            key: 'render',
            value: function render() {
                var _props = this.props,
                    containerStyle = _props.containerStyle,
                    containerClassName = _props.containerClassName;


                return _react2.default.createElement('div', { className: containerClassName, style: containerStyle, ref: 'progressBar' });
            }
        }, {
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                if (!(0, _isEqual2.default)(this.props.options, nextProps.options)) {
                    this._destroy();
                    this._create(nextProps, this.props);

                    return;
                }

                this._animateProgress(nextProps.progress);
                this._setText(nextProps.text);
            }
        }, {
            key: 'componentDidMount',
            value: function componentDidMount() {
                this._create(this.props);
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this._destroy();
            }
        }, {
            key: '_create',
            value: function _create(props, oldProps) {
                if (this.state.shape !== null) {
                    throw new Error('Progressbar is already created');
                }

                // setState function is not used to prevent a new render cycle
                // This handling happens outside of React component's lifecycle
                var container = (0, _reactDom.findDOMNode)(this.refs.progressBar);

                this.state.shape = new props.ShapeClass(container, props.options);

                if (props.initialAnimate) {
                    if (oldProps) {
                        this._setProgress(oldProps.progress);
                    }

                    this._animateProgress(props.progress);
                } else {
                    this._setProgress(props.progress);
                }

                this._setText(props.text);
            }
        }, {
            key: '_destroy',
            value: function _destroy() {
                if (this.state.shape) {
                    this.state.shape.destroy();
                    this.state.shape = null;
                }
            }
        }, {
            key: '_animateProgress',
            value: function _animateProgress(progress) {
                this.state.shape.animate(progress);
            }
        }, {
            key: '_setProgress',
            value: function _setProgress(progress) {
                this.state.shape.set(progress);
            }
        }, {
            key: '_setText',
            value: function _setText(text) {
                if (text) {
                    this.state.shape.setText(text);
                }
            }
        }]);

        return Shape;
    }(_react.Component);

    ;

    var Line = function (_Component2) {
        _inherits(Line, _Component2);

        function Line() {
            _classCallCheck(this, Line);

            return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).apply(this, arguments));
        }

        _createClass(Line, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Shape, _extends({}, this.props, { ShapeClass: _progressbar2.default.Line }));
            }
        }]);

        return Line;
    }(_react.Component);

    ;

    var Circle = function (_Component3) {
        _inherits(Circle, _Component3);

        function Circle() {
            _classCallCheck(this, Circle);

            return _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).apply(this, arguments));
        }

        _createClass(Circle, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Shape, _extends({}, this.props, { ShapeClass: _progressbar2.default.Circle }));
            }
        }]);

        return Circle;
    }(_react.Component);

    ;

    var SemiCircle = function (_Component4) {
        _inherits(SemiCircle, _Component4);

        function SemiCircle() {
            _classCallCheck(this, SemiCircle);

            return _possibleConstructorReturn(this, (SemiCircle.__proto__ || Object.getPrototypeOf(SemiCircle)).apply(this, arguments));
        }

        _createClass(SemiCircle, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(Shape, _extends({}, this.props, { ShapeClass: _progressbar2.default.SemiCircle }));
            }
        }]);

        return SemiCircle;
    }(_react.Component);

    ;

    module.exports = {
        Line: Line,
        Circle: Circle,
        SemiCircle: SemiCircle
    };
});

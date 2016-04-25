(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'react', 'react-dom', 'lodash.isequal', 'progressbar.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('react'), require('react-dom'), require('lodash.isequal'), require('progressbar.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.react, global.reactDom, global.lodash, global.progressbar);
        global.main = mod.exports;
    }
})(this, function (module, React, ReactDom, isEqual, ProgressBar) {
    'use strict';

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

    var Shape = React.createClass({
        displayName: 'Shape',

        getDefaultProps: function getDefaultProps() {
            return {
                ShapeClass: null,
                options: {},
                progress: 0,
                text: null,
                initialAnimate: false,
                containerStyle: {},
                containerClassName: '.progressbar-container'
            };
        },

        getInitialState: function getInitialState() {
            return {
                shape: null
            };
        },

        render: function render() {
            var style = this.props.containerStyle;
            var className = this.props.containerClassName;

            return React.createElement('div', { className: className, style: style, ref: 'progressBar' });
        },

        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (!isEqual(this.props.options, nextProps.options)) {
                this._destroy();
                this._create(nextProps, this.props);
                return;
            }

            this._animateProgress(nextProps.progress);
            this._setText(nextProps.text);
        },

        componentDidMount: function componentDidMount() {
            this._create(this.props);
        },

        componentWillUnmount: function componentWillUnmount() {
            this._destroy();
        },

        _create: function _create(props, oldProps) {
            if (this.state.shape !== null) {
                throw new Error('Progressbar is already created');
            }

            // setState function is not used to prevent a new render cycle
            // This handling happens outside of React component's lifecycle
            var container = ReactDom.findDOMNode(this.refs.progressBar);
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
        },

        _destroy: function _destroy() {
            if (this.state.shape) {
                this.state.shape.destroy();
                this.state.shape = null;
            }
        },

        _animateProgress: function _animateProgress(progress) {
            this.state.shape.animate(progress);
        },

        _setProgress: function _setProgress(progress) {
            this.state.shape.set(progress);
        },

        _setText: function _setText(text) {
            if (text) {
                this.state.shape.setText(text);
            }
        }
    });

    var Line = React.createClass({
        displayName: 'Line',
        render: function render() {
            return React.createElement(Shape, _extends({}, this.props, { ShapeClass: ProgressBar.Line }));
        }
    });

    var Circle = React.createClass({
        displayName: 'Circle',
        render: function render() {
            return React.createElement(Shape, _extends({}, this.props, { ShapeClass: ProgressBar.Circle }));
        }
    });

    var SemiCircle = React.createClass({
        displayName: 'SemiCircle',
        render: function render() {
            return React.createElement(Shape, _extends({}, this.props, { ShapeClass: ProgressBar.SemiCircle }));
        }
    });

    module.exports = {
        Line: Line,
        Circle: Circle,
        SemiCircle: SemiCircle
    };
});

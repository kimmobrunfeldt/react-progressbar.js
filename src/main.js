var React = require('react');
var ReactDom = require('react-dom');
var isEqual = require('lodash.isequal');
var ProgressBar = require('progressbar.js');

var Shape = React.createClass({
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

        return <div className={className} style={style} ref="progressBar"></div>;
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
        this._destroy()
    },

    _create: function _create(props, oldProps) {
        if (this.state.shape !== null) {
            throw new Error('Progressbar is already created');
        }

        // setState function is not used to prevent a new render cycle
        // This handling happens outside of React component's lifecycle
        var container = ReactDom.findDOMNode(this.refs.progressBar);
        this.state.shape = new props.ShapeClass(
            container,
            props.options
        );

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
    render() {
        return <Shape {...this.props} ShapeClass={ProgressBar.Line} />;
    }
});

var Circle = React.createClass({
    render() {
        return <Shape {...this.props} ShapeClass={ProgressBar.Circle} />;
    }
});

var SemiCircle = React.createClass({
    render() {
        return <Shape {...this.props} ShapeClass={ProgressBar.SemiCircle} />;
    }
});

module.exports = {
    Line: Line,
    Circle: Circle,
    SemiCircle: SemiCircle
};

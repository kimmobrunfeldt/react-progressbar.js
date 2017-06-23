var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDom = require('react-dom');
var isEqual = require('lodash.isequal');
var ProgressBar = require('progressbar.js');

class Shape extends React.Component {
    static get defaultProps() {
        return {
            ShapeClass: null,
            options: {},
            progress: 0,
            text: null,
            initialAnimate: false,
            containerStyle: {},
            containerClassName: '.progressbar-container',
            svgPath: null
        };
    }

    get _isPath() {
        return this.props.ShapeClass instanceof ProgressBar.Path;
    }

    constructor(props) {
        super(props);

        this.state = {
            shape: null
        };
    }

    render() {
        var style = this.props.containerStyle;
        var className = this.props.containerClassName;

        return React.createElement('div', { className: className, style: style, ref: 'progressBar' });
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.options, nextProps.options)) {
            this._destroy();
            this._create(nextProps, this.props);
            return;
        }

        this.animateProgress(nextProps.progress);
        this.setText(nextProps.text);
    }

    componentDidMount() {
        this._create(this.props);
    }

    componentWillUnmount() {
        this._destroy();
    }

    _create(props, oldProps) {
        if (this.state.shape !== null) {
            throw new Error('Progressbar is already created');
        }

        // setState function is not used to prevent a new render cycle
        // This handling happens outside of React component's lifecycle
        var container = ReactDom.findDOMNode(this.refs.progressBar);
        this.state.shape = new props.ShapeClass(this._isPath ? this.props.svgPath : container, props.options);

        if (props.initialAnimate) {
            if (oldProps) {
                this.setProgress(oldProps.progress);
            }

            this.animateProgress(props.progress);
        } else {
            this.setProgress(props.progress);
        }

        this.setText(props.text);
    }

    _destroy() {
        if (this.state.shape) {
            this.state.shape.destroy();
            this.state.shape = null;
        }
    }

    animateProgress(progress) {
        this.state.shape.animate(progress);
    }

    setProgress(progress) {
        this.state.shape.set(progress);
    }

    setText(text) {
        if (text) {
            this.state.shape.setText(text);
        }
    }
}

class Line extends React.Component {
    get _shape() {
        return this.refs.shape;
    }

    render() {
        return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Line }));
    }
}

class Circle extends React.Component {
    get _shape() {
        return this.refs.shape;
    }

    render() {
        return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Circle }));
    }
}

class SemiCircle extends React.Component {
    get _shape() {
        return this.refs.shape;
    }

    render() {
        return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.SemiCircle }));
    }
}

class Path extends React.Component {
    get _shape() {
        return this.refs.shape;
    }

    render() {
        return React.createElement(Shape, _extends({}, this.props, { ref: 'shape', ShapeClass: ProgressBar.Path }));
    }
}

module.exports = {
    Shape: Shape,
    Line: Line,
    Circle: Circle,
    SemiCircle: SemiCircle
};

var React = require('react');
var ReactDom = require('react-dom');
var isEqual = require('lodash.isequal');
var ProgressBar = require('progressbar.js');

class Shape extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shpae: null
        }
    }

    render() {
        const style = this.props.containerStyle;
        const className = this.props.containerClassName;

        return (<div className={className} style={style} ref="progressBar"></div>);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.options, nextProps.options)) {
            this._destroy();
            this._create(nextProps, this.props);
            return;
        }

        this._animateProgress(nextProps.progress);
        this._setText(nextProps.text);
    }

    componentDidMount() {
        this._create(this.props);
    }

    componentWillUnmount() {
        this._destroy()
    }

    _create(props, oldProps) {
        if (this.state.shape !== null) {
            throw new Error('Progressbar is already created');
        }

        // setState function is not used to prevent a new render cycle
        // This handling happens outside of React component's lifecycle
        const container = ReactDom.findDOMNode(this.refs.progressBar);
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
    }

    _destroy() {
        if (this.state.shape) {
            this.state.shape.destroy();
            this.state.shape = null;
        }
    }

    _animateProgress(progress) {
        this.state.shape.animate(progress);
    }

    _setProgress(progress) {
        this.state.shape.set(progress);
    }

    _setText(text) {
        if (text) {
            this.state.shape.setText(text);
        }
    }
}

Shape.defaultProps = {
    ShapeClass: null,
    options: {},
    progress: 0,
    text: null,
    initialAnimate: false,
    containerStyle: {},
    containerClassName: '.progressbar-container'
};


function Line(props) {
    return <Shape {...props} ShapeClass={ProgressBar.Line} />;
}

function Circle(props) {
    return <Shape {...props} ShapeClass={ProgressBar.Circle}/>;
}

function SemiCircle(props) {
    return <Shape {...props} ShapeClass={ProgressBar.SemiCircle} />;
}

module.exports = {
    Line: Line,
    Circle: Circle,
    SemiCircle: SemiCircle
};

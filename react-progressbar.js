import React from 'react';
import uniqueId from 'lodash.uniqueid';
import ProgressBar from 'progressbar.js';

class Shape extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: uniqueId('progressbar'),
            shape: null
        };
    }

    render() {
        const style = {
            width: '300px',
            height: '300px'
        };

        return <div style={style} id={this.state.id}></div>;
    }

    componentWillReceiveProps(nextProps) {
        this._setProgess(nextProps.progress);
        this._setText(nextProps.text);
    }

    componentDidMount() {
        //console.log(this.props)
        // setState function is not used to prevent a new render cycle
        // This handling happens outside of React component's lifecycle
        var containerId = '#' + this.state.id;
        this.state.shape = new this.props.Shape(containerId, this.props.options);
        this._setProgress(this.props.progress);
    }

    componentWillUnmount() {
        if (this.state.shape) {
            this.state.shape.destroy();
        }
    }

    _setProgress(progress) {
        this.state.shape.animate(progress);
    }

    _setText(text) {
        if (text) {
            this.state.shape.setText(text);
        }
    }
}
Shape.defaultProps = {
    Shape: null,
    options: {},
    progress: 0,
    text: null
};

class Circle extends Shape {}
Circle.defaultProps = {
    Shape: ProgressBar.Circle
};

export {
    Circle
};

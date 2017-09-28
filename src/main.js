import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import ProgressBar from 'progressbar.js';

export class Shape extends React.Component {
    componentDidMount() {
        this.shape = null;
        this.create(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.options, nextProps.options)) {
            this.destroy();
            this.create(nextProps, this.props);
            return false;
        }

        this.animateProgress(nextProps.progress);
        this.setText(nextProps.text);
        return true;
    }

    componentWillUnmount() {
        this.destroy();
    }

    setProgress(progress) {
        this.shape.set(progress);
    }

    setText(text) {
        if (text) {
            this.shape.setText(text);
        }
    }

    create(nextProps, oldProps) {
        if (this.shape !== null) {
            throw new Error('Progressbar is already created');
        }

        this.shape = new nextProps.ShapeClass(
            this.progressBar,
            nextProps.options,
        );

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

    animateProgress(progress) {
        this.shape.animate(progress);
    }

    destroy() {
        if (this.shape) {
            this.shape.destroy();
            this.shape = null;
        }
    }

    render() {
        const style = this.props.containerStyle;
        const className = this.props.containerClassName;
        return (
            <div
                className={className}
                style={style}
                ref={(node) => {
                    this.progressBar = node;
                }}
            />
        );
    }
}

Shape.defaultProps = {
    ShapeClass: null,
    options: {},
    progress: 0,
    text: null,
    initialAnimate: false,
    containerStyle: {},
    containerClassName: '.progressbar-container',
};

Shape.propTypes = {
    ShapeClass: PropTypes.oneOf([ProgressBar.Circle]),
    options: PropTypes.objectOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.object,
    ])),
    progress: PropTypes.number,
    text: PropTypes.string,
    initialAnimate: PropTypes.bool,
    containerStyle: PropTypes.objectOf(PropTypes.string),
    containerClassName: PropTypes.string,
};

export const Line = props => <Shape {...props} ShapeClass={ProgressBar.Line} />;

export const Circle = props => <Shape {...props} ShapeClass={ProgressBar.Circle} />;

export const SemiCircle = props => <Shape {...props} ShapeClass={ProgressBar.SemiCircle} />;

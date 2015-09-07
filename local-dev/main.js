var React = require('react');
var ProgressBar = require('../src/main.js');
var Circle = ProgressBar.Circle;

var App = React.createClass({
    getInitialState: function() {
        return {
            progress: 0.1,
            options: {}
        };
    },

    render: function() {
        return <Circle initialAnimate={this.state.initialAnimate} options={this.state.options} progress={this.state.progress} />;
    },

    componentDidMount: function() {
        var self = this;
        setTimeout(function() {
            console.log('setstate')
            self.setState({
                progress: 1
            });
        }, 1000);

        setTimeout(function() {
            console.log('setstate')
            self.setState({
                initialAnimate: true,
                progress: 1
            });
        }, 500);

    }
});

React.render(
    <App />,
    document.querySelector('body')
);

var React = require('react');
var ReactDom = require('react-dom');
var ProgressBar = require('../src/main.js');
var Circle = ProgressBar.Circle;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0.1,
            options: {}
        };
    }

    render() {
        console.log("render");
        return <Circle initialAnimate={this.state.initialAnimate} options={this.state.options} progress={this.state.progress} />;
    }

    componentDidMount() {
        // var self = this;
        // setTimeout(function() {
        //     console.log('setstate')
        //     self.setState({
        //         progress: 1
        //     });
        // }, 1000);

        // setTimeout(function() {
        //     console.log('setstate')
        //     self.setState({
        //         initialAnimate: true,
        //         progress: 1
        //     });
        // }, 500);
    }
}

ReactDom.render(
    <App />,
    document.querySelector('#progress')
);

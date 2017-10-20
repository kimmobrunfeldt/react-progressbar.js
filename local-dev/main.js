import React, { Component } from 'react';
import { render } from 'react-dom';
import { Circle } from '../src/main.js';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0.1,
            options: {}
        };
    }

    render() {
        return <Circle initialAnimate={this.state.initialAnimate} options={this.state.options} progress={this.state.progress} />;
    }

    componentDidMount() {
        const self = this;
        
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
};

render(
    <App />,
    document.querySelector('#progress')
);

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Circle,Path } from '../src/main.js';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0.1,
            options: {}
        };
    }

    render() {
        return (
            <div>
                <Circle initialAnimate={this.state.initialAnimate} options={this.state.options} progress={this.state.progress} />

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                  <path id="heart-path" fillOpacity="0" strokeWidth="3" stroke="#ED6A5A" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                </svg>
                <Path customShape='#heart-path' initialAnimate={this.state.initialAnimate} options={this.state.options} progress={this.state.progress} />

            </div>
        );
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

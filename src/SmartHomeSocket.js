import React, { Component } from "react";

import App from './App';

class SmartHomeSocket extends Component {
    
    constructor() {
        super();
        this.state = {lightOn: false};
      }

    componentDidMount() {
        // GET request using fetch with error handling
        fetch('http://192.168.4.232:8000', {  mode: 'no-cors' })
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                console.log(data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    toggle = () => {
        if(this.state.lightOn){
            console.log("turn off light");
            fetch('http://192.168.4.232:8000/light/off', {  mode: 'no-cors' });
            this.setState({lightOn: false});
        }

        else{
            console.log("turn on light");
            fetch('http://192.168.4.232:8000/light/on', {  mode: 'no-cors' });
            this.setState({lightOn: true});
        }
    }

    render () {
        return(
            <App toggle={this.toggle} lightOn={this.state.lightOn}></App>
        )
    }
}

export default SmartHomeSocket;
import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lightOn: false,
            url: 'https://6eefac6cdbfb.ngrok.io/'
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        // GET request using fetch with error handling
        fetch(this.state.url, {  mode: 'no-cors' })
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
    
                console.log(data);
                // this.setState({ lightOn: data.status })
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
      }

    async toggle() {
        if(this.state.lightOn){
          console.log("turn off light");
          await fetch(this.state.url + 'light/off', {  mode: 'no-cors' });
          this.setState({lightOn: false});
    
        }
    
        else{
          console.log("turn on light");
          await fetch(this.state.url + 'light/on', {  mode: 'no-cors' });
          this.setState({lightOn: true});
    
        }
      }

    render() {
        return(
            <Entity>
                <Entity>
                    <Entity
                        id="lightbulb" 
                        gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf" 
                        position={{ x: 2.04, y: 0.936, z: -3.043}} 
                        scale={{ x: 0.001, y: 0.001 , z: 0.001}}
                        rotation={{ x: 0, y: 90, z: 0 }}>
                    
                        <Entity
                            id="lightbulbLight"
                            visible={this.state.lightOn}
                            >
                            <a-sphere color="blue" radius="69.130" position="-0.176 141.959 0" material="blending:  multiply"></a-sphere>

                            <a-light type="point" color="blue" intensity="0.6" light="castShadow: true" decay="1.2" distance="5.0"></a-light>
                        </Entity>
                    </Entity>

                    <a-gui-button
                        id="toggleLightButton"
                        width="0.75" height="0.25" 
                        position="1.97 1.5 -3.027"
                        rotation="0 -90 0"
                        onClick={this.toggle}
                        value="Toggle Light"
                        font-family="Arial"
                        font-size="30px"
                        margin="0 0 0.05 0">
                    </a-gui-button>
                </Entity>
            </Entity>
        )
    }
}

export default Device;
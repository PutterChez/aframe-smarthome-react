import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://ff4827428103.ngrok.io/',
            lightOn: false,
        };
        this.toggle = this.toggle.bind(this);
    }

    async toggle() {
        if(this.state.lightOn){
            console.log("turn off light");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.props.tag, value: 0 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
                this.setState({lightOn: false});
        }

        else{
            console.log("turn on light");
            console.log(this.props.tag)

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.props.tag, value: 1 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
                this.setState({lightOn: true});

        }
    }

    slider() {
        console.log("slider test");
    }

    render() {
        return(
            <Entity id="device" position={this.props.position} >
                <Entity
                    id="lightbulb" 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf" 
                    
                    scale={{ x: 0.001, y: 0.001 , z: 0.001}}
                    rotation={{ x: 0, y: 90, z: 0 }}
                    shadow={{cast: true}}>

                    <Entity
                        id="lightbulbLight"
                        visible={this.state.lightOn}
                        >
                        <a-sphere color="blue" radius="69.130" position="-0.176 141.959 0" emissive="blue"></a-sphere>

                        <a-light type="point" color="blue" intensity="0.6" light="castShadow: true" decay="1.2" distance="5.0"></a-light>
                        
                    </Entity>
                </Entity>
                
                <a-gui-flex-container
                    flex-direction="column" 
                    justify-content="center" 
                    align-items="normal" 
                    component-padding="0.1" 
                    opacity="0.7" 
                    width="3.5" 
                    height="4.5"
                    rotation="0 -90 0"
                    position="0 1 0"
                    scale="0.3 0.3 0.3"
                    >
                    

                    <a-gui-button
                        id="toggleLightButton"
                        width="2.5" height="0.75"
                        onClick={this.toggle}
                        value="Toggle Light"
                        font-family="Arial"
                        font-size="150px"
                        margin="0 0 0.05 0">
                    </a-gui-button>

                    <a-gui-label
                        width="2.5" height="0.75"
                        value="Brightness"
                        margin="0 0 0.05 0"
                        font-size="150px"
                    >
                    </a-gui-label>

                    <a-gui-slider
                        width="2.5" height="0.75"
                        onClick={this.slider}
                        percent="0.3"
                        margin="0 0 0.05 0"
                    >
                    </a-gui-slider>

                    <a-gui-label
                        width="2.5" height="0.75"
                        value="Color"
                        margin="0 0 0.05 0"
                        font-size="150px"
                    ></a-gui-label>

                    <a-gui-input id="test_input"
                        width="2.5" height="0.75"
                        onclick="testInputAction"
                        value="Input Color"
                        font-size="160px"
                        font-color="#212121"
                        border-color="#212121"
                        border-hover-color="#424242"
                        background-color="#FAFAFA"
                        hover-color="#F5F5F5"
                        active-color="#FFEB3B"
                    >
                    </a-gui-input>

                </a-gui-flex-container>
            </Entity>
        )
    }
}

export default Device;
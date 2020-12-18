import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://523619f360bf.ngrok.io/',
            tvOn: false,
            volume: 0,
        };
        this.toggle = this.toggle.bind(this);
    }

    async toggle() {
        if(this.state.lightOn){
            console.log("turn off TV");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.props.tag, value: 0 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
                this.setState({tvOn: false});
        }

        else{
            console.log("turn on TV");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.props.tag, value: 1 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
                this.setState({tvOn: true});

        }
    }

    render() {
        return(
            <Entity id="device" position={this.props.position} >
                <Entity
                    id="lightbulb" 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/TV_01.gltf" 
                    
                    scale={{ x: 0.06, y: 0.06 , z: 0.06}}
                    rotation={this.props.rotation}
                    shadow={{cast: true}}>
                </Entity>
                
                <a-gui-flex-container
                    flex-direction="column" 
                    justify-content="center" 
                    align-items="normal" 
                    component-padding="0.1" 
                    opacity="0.7" 
                    width="3.5" 
                    height="4.5"
                    rotation={this.props.rotation}
                    position="0 1.35 0"
                    scale="0.3 0.3 0.3"
                    >
                    

                    <a-gui-button
                        id="toggleTVButton"
                        width="2.5" height="0.75"
                        onClick={this.toggle}
                        value="Toggle TV"
                        font-family="Arial"
                        font-size="150px"
                        margin="0 0 0.05 0">
                    </a-gui-button>
                    
                    <a-gui-button
                        id="upChannel"
                        width="2.5" height="0.75"
                        onClick={this.toggle}
                        value="+"
                        font-family="Arial"
                        font-size="150px"
                        margin="0 0 0.05 0">
                    </a-gui-button>
                    
                    <a-gui-button
                        id="downChannel"
                        width="2.5" height="0.75"
                        onClick={this.toggle}
                        value="-"
                        font-family="Arial"
                        font-size="150px"
                        margin="0 0 0.05 0">
                    </a-gui-button>
                    

                </a-gui-flex-container>
            </Entity>
        )
    }
}

export default Device;
import React, { PureComponent } from "react";
import { Entity } from "aframe-react";
import DOMPurify from 'dompurify'

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lightOn: false,
            url: 'https://5fad9889e2f6.ngrok.io/',
            zodbWidget: '',
        };
        this.toggle = this.toggle.bind(this);
    }

    async componentDidMount() {
        // GET request using fetch with error handling
        fetch(this.state.url + 'zodb/get/')
            .then(async response => {
                const data = await response.json();
                const zodbData = JSON.stringify(JSON.parse(data));
                const zodbDataFormmated =  zodbData.replace(/"([^"]+)":/g, '$1:').replace(/,/g,' ').replace(/:\s*/g,"=");
                const zobdDataFinal = zodbDataFormmated.substring(1, zodbDataFormmated.length-1);

                const bracket1 = zobdDataFinal.indexOf("{");
                const slice1 = zobdDataFinal.slice(0, bracket1-1) + zobdDataFinal.slice(bracket1);

                const bracket2 = slice1.indexOf("}");
                const slice2 = slice1.slice(0, bracket2+1) + slice1.slice(bracket2 + 2);
                
                const formattedData = '<a-gui-button ' + slice2 + '> </a-gui-button>'

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                
                this.setState({ zodbWidget: formattedData });
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

    slider() {
        console.log("slider test");
    }

    render() {

        console.log("FINAL ZODB: " + this.state.zodbWidget);
        return(
            <Entity id="device" position={{ x: 2.04, y: 0.936, z: -3.043}} >
                <Entity
                    id="lightbulb" 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf" 
                    
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
                    dangerouslySetInnerHTML={{__html: this.state.zodbWidget}}
                    >
                    

                    {/* <a-gui-button
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
                    </a-gui-input> */}

                </a-gui-flex-container>
            </Entity>
        )
    }
}

export default Device;
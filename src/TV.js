import React, { Component } from "react";
import { Entity } from "aframe-react";

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://a28bc3f35b14.ngrok.io/',
            tvOn: false,
            channel: "",
            volume: "",
            channelTag: "",
            volumeTag: "",
        };
        this.channelUp = this.channelUp.bind(this);
        this.channelDown = this.channelDown.bind(this);
        this.volumeSlider = this.volumeSlider.bind(this);
    }

    componentDidMount() {
        for (let tag of this.props.tags){

            if(tag.widget === "channel_button"){
                
                this.setState({channelTag: tag.tag})
                this.setState({channel: tag.value})
            }

            else if(tag.widget === "volume_slider")
                this.setState({volumeTag: tag.tag, volume: tag.value})
        }
    }

    async channelUp() {
        const upChannel = (parseInt(this.state.channel) + 1) + '';
        console.log(upChannel);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.channelTag, value: upChannel })
        };
        fetch(this.state.url + 'mock/sendTag/', requestOptions)

        this.setState({channel: upChannel})
    }   

    async channelDown() {
        console.log("channel down");
        const downChannel = (parseInt(this.state.channel) - 1) + '';

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.channelTag, value: downChannel })
        };
        fetch(this.state.url + 'mock/sendTag/', requestOptions)

        this.setState({channel: downChannel})
    }   

    async changeVolume() {
        console.log("change volume: " +  this.state.volume);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.volumeTag, value: this.state.volume })
        };
        fetch(this.state.url + 'mock/sendTag/', requestOptions)
    }

    volumeSlider = (e) => {
        const percent = e.currentTarget.getAttribute('gui-slider').percent;
        const value = parseInt(percent * 100);

        this.setState({volume: value})
        this.changeVolume()
    }

    render() {
        return(
            <Entity id={this.props.id} position={this.props.position} >
                <Entity
                    id="TV" 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/TV_01.gltf" 
                    
                    scale={{ x: 0.06, y: 0.06 , z: 0.06}}
                    rotation={this.props.rotation}
                    shadow={{cast: true}}
                    event-set__mouseenter="_target: #deviceUI; visible: true">
                </Entity>
                
                
                <a-gui-flex-container
                    id="deviceUI"
                    visible="true"
                    flex-direction="column" 
                    justify-content="center" 
                    align-items="normal" 
                    component-padding="0.1" 
                    opacity="0.7" 
                    width="3.5" 
                    height="2.5"
                    rotation={this.props.rotation}
                    position="0 1.1 0"
                    scale="0.3 0.3 0.3">
                    
                    <a-gui-flex-container
                        flex-direction="row" 
                        justify-content="center" 
                        align-items="normal" 
                        component-padding="0" 
                        opacity="0" 
                        width="3.5" 
                        height="1.5"
                        >
                        
                        <a-gui-button
                            id="upChannel"
                            width="1" height="0.75"
                            onClick={this.channelUp}
                            value="+"
                            font-family="Arial"
                            font-size="150px"
                            margin="0 0 0.05 0">
                        </a-gui-button>
                        
                        <a-gui-label
                            width="1" height="0.75"
                            value={this.state.channel}
                            margin="0 0 0.05 0"
                            font-size="150px"
                        >
                        </a-gui-label>

                        <a-gui-button
                            id="downChannel"
                            width="1" height="0.75"
                            onClick={this.channelDown}
                            value="-"
                            font-family="Arial"
                            font-size="150px"
                            margin="0 0 0.05 0">
                        </a-gui-button>
                    </a-gui-flex-container>

                    <a-gui-label
                        width="2.5" height="0.3"
                        value={this.state.volume}
                        margin="0 0 0.05 0"
                        font-size="150px"
                    >
                    </a-gui-label>

                    <a-gui-slider
                        width="2.5" height="0.4"
                        onClick={this.volumeSlider}
                        percent="0.3"
                        margin="0 0 0.05 0"
                    >
                    </a-gui-slider>
                </a-gui-flex-container>

                <Entity id="uiInfo" >
                    <a-gui-flex-container
                        visible="true"
                        flex-direction="column" 
                        justify-content="center" 
                        align-items="normal" 
                        component-padding="0.1" 
                        opacity="0.7" 
                        width="3.5" 
                        height="4.5"
                        rotation="0 -90 0"
                        position="0.5 1.1 -0.8"
                        scale="0.3 0.3 0.3"
                        >
                        
                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"Device name: " + this.props.id}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>

                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"TV Status: " + (this.state.tvOn ? 'On' : 'Off')}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>

                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"Channel Status: " + this.state.channel}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>

                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"Volume Status: " + this.state.volume}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>
                    </a-gui-flex-container>
                </Entity>
            </Entity>
        )
    }
}

export default Device;
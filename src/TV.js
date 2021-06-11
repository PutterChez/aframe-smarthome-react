import React, { Component } from "react";
import { Entity } from "aframe-react";

require('./on-hover')

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tvOn: false,
            channel: "",
            volume: "",
            channelTag: "",
            volumeTag: "",
            menuOpen: false,
        };
        this.channelUp = this.channelUp.bind(this);
        this.channelDown = this.channelDown.bind(this);
        this.volumeSlider = this.volumeSlider.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
    }

    componentDidMount() {
        for (let tag of this.props.tags){

            if(tag.widget === "channel_button"){
                
                this.setState({channelTag: tag.tags})
                this.setState({channel: tag.value})
            }

            else if(tag.widget === "volume_slider")
                this.setState({volumeTag: tag.tags, volume: tag.value})
        }
    }

    updateDevice(tag, value) {
        if(tag === this.state.channelTag){
            this.setState({channel: value});
            this.changeChannel(value);
        }
        else if(tag === this.state.volumeTag){
            this.setState({volume: value});
            this.changeVolume();
        }
    }

    async changeChannel() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.channelTag, value: this.state.channel })
        };
        fetch(this.props.url + 'mock/sendTag/', requestOptions)
    }

    async channelUp() {
        const upChannel = (parseInt(this.state.channel) + 1) + '';
        console.log(upChannel);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.channelTag, value: upChannel })
        };
        fetch(this.props.url + 'mock/sendTag/', requestOptions)

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
        fetch(this.props.url + 'mock/sendTag/', requestOptions)

        this.setState({channel: downChannel})
    }   

    async changeVolume() {
        console.log("change volume: " +  this.state.volume);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.volumeTag, value: this.state.volume })
        };
        fetch(this.props.url + 'mock/sendTag/', requestOptions)
    }

    async moveObject() {
        var object = document.getElementById(this.props.id).getAttribute("position");
        var objectModel = document.getElementById(this.props.id + "-model").getAttribute("position");
        var newX = object.x + objectModel.x;
        var newY = object.y + objectModel.y;
        var newZ = object.z + objectModel.z;

        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ room: "ICTLab", floor: 7, building: "ECCBuilding", name: "Light01", location: {x: newX, y: newY, z: newZ} })
        };
            console.log(requestOptions);
            fetch(this.props.url + 'mock/update/', requestOptions)   
    }

    volumeSlider = (e) => {
        const percent = e.currentTarget.getAttribute('gui-slider').percent;
        const value = parseInt(percent * 100);

        this.setState({volume: value})
        this.changeVolume()
    }

    
    closeMenu() {
        this.setState({menuOpen: false})
    }

    openMenu() {
        this.setState({menuOpen: true})
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
                    on-hover={{clickActionFunctionName: this.openMenu}}
                >
                </Entity>
                
                <Entity position={this.state.menuOpen ? "0 0 0": "0 -4 0"}>
                    
                    <a-gui-icon-button
                            height="0.5"
                            onClick={this.closeMenu}
                            icon="f00d"
                            icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                            align="right"
                            rotation={this.props.rotation}
                            scale="0.3 0.3 0.3"
                            position= "-0.36 1.5 0.28"
                        >
                    </a-gui-icon-button>

                    <a-gui-flex-container
                        id="deviceUI"
                        visible="true"
                        flex-direction="column" 
                        justify-content="center" 
                        align-items="normal" 
                        component-padding="0.1" 
                        opacity="0.4" 
                        width="3.5" 
                        height="3.7"
                        rotation={this.props.rotation}
                        position= "0 1.1 0"
                        scale="0.3 0.3 0.3"
                        panel-color="#2effd5"
                        panel-rounded="0.3">
                    
                        <a-gui-button
                            id="moveObjectButton"
                            width="2.5" height="0.75"
                            onClick={this.moveObject}
                            value="Move Object"

                            font-family="Arial"
                            font-size="150px"
                            margin="0 0 0.15 0"
                            opacity="0.4" 

                            font-color="#2effd5"
                            active-color="#4f8278"
                            hover-color="#81dbca"
                            border-color="#2effd5"
                            background-color="#2a8d7a"
                            >
                        </a-gui-button>

                        <a-gui-flex-container
                            flex-direction="row" 
                            justify-content="center" 
                            align-items="normal" 
                            component-padding="0" 
                            opacity="0.4" 
                            width="3.5" 
                            height="1.5"
                            panel-color="#2effd5"
                            panel-rounded="0.3"
                            >
                            
                            <a-gui-button
                                id="downChannel"
                                width="1" height="0.75"
                                onClick={this.channelDown}
                                value="-"
                                font-family="Arial"
                                font-size="150px"
                                margin="0 0 0.05 0"
                                font-color="#2effd5"
                                active-color="#4f8278"
                                hover-color="#81dbca"
                                border-color="#2effd5"
                                background-color="#2a8d7a">
                            </a-gui-button>
                            
                            <a-gui-label
                                width="1" height="0.75"
                                value={this.state.channel}
                                margin="0 0 0.05 0"
                                font-size="150px"
                                font-color="#2effd5"
                                active-color="#2a8d7a"
                                hover-color="#2a8d7a"
                                border-color="#2a8d7a"
                                background-color="#2a8d7a"
                            >
                            </a-gui-label>
                            
                            <a-gui-button
                                id="upChannel"
                                width="1" height="0.75"
                                onClick={this.channelUp}
                                value="+"
                                font-family="Arial"
                                font-size="150px"
                                margin="0 0 0.05 0"
                                font-color="#2effd5"
                                active-color="#4f8278"
                                hover-color="#81dbca"
                                border-color="#2effd5"
                                background-color="#2a8d7a">
                            </a-gui-button>
                        </a-gui-flex-container>

                        <a-gui-label
                            width="2.5" height="0.3"
                            value={this.state.volume}
                            margin="0 0 0.05 0"
                            font-size="150px"
                            font-color="#2effd5"
                            active-color="#2a8d7a"
                            hover-color="#2a8d7a"
                            border-color="#2a8d7a"
                            background-color="#2a8d7a"
                        >
                        </a-gui-label>

                        <a-gui-slider
                            width="2.5" height="0.4"
                            onClick={this.volumeSlider}
                            percent="0.3"
                            margin="0 0 0.05 0"
                            font-color="#2effd5"
                            background-color="#2a8d7a"
                            active-color="grey"
                            border-color="#2effd5"
                        >
                        </a-gui-slider>
                    </a-gui-flex-container>
                </Entity>

                <Entity id="uiInfo" visible="false">
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
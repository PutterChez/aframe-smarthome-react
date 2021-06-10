import React, { Component } from "react";
import { Entity } from "aframe-react";

require('./on-hover');
require('super-hands');

class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lightOn: false,
            pickingColor: false,
            finalColor: "#ffffff",
            brightness: 0,
            redColor: 0,
            greenColor: 0,
            blueColor: 0,
            lightTag: "",
            brightTag: "",
            colorTag: "",
            menuOpen: false,
        };
        this.toggle = this.toggle.bind(this);
        this.colorPicker = this.colorPicker.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.moveObject = this.moveObject.bind(this);
    }

    componentDidMount() {
        this.setState({name: this.props.id});

        for (let tag of this.props.tags){

            if(tag.widget === "button"){
                if(tag.value == 0)
                    this.setState({lightOn: false})
                else if(tag.value == 1)
                    this.setState({lightOn: true})

                this.setState({lightTag: tag.tags})
            }

            else if(tag.widget === "rgb_slider"){
                this.setState({colorTag: tag.tags, finalColor: tag.value})
            }

            else if(tag.widget === "brightness_slider"){
                this.setState({brightTag: tag.tags, brightness: tag.value})
            }
        }
    }

    updateDevice(tag, value) {
        console.log(tag + " === " + this.state.colorTag);
        if(tag === this.state.lightTag){
            this.toggle();
        }
        else if(tag === this.state.colorTag){
            this.setState({finalColor: value});
            console.log("FINAL COLOR: " + this.state.finalColor);
            this.changeColor();
        }
        else if(tag === this.state.brightTag){
            this.setState({brightness: value});
            this.changeBright();
        }
    }

    async toggle() {
        if(this.state.lightOn){
            console.log("turn off light");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.state.lightTag, value: 0.0 })
            };
            fetch(this.props.url + 'mock/sendTag/', requestOptions)
                this.setState({lightOn: false});
        }

        else{
            console.log("turn on light");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.state.lightTag, value: 1.0 })
            };
            fetch(this.props.url + 'mock/sendTag/', requestOptions)
                this.setState({lightOn: true});

        }
    }   

    async changeBright() {
        console.log("change bright: " +  this.state.brightness);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.brightTag, value: this.state.brightness })
        };
            fetch(this.props.url + 'mock/sendTag/', requestOptions)
        
    }

    setBrightness(value) {
        this.setState({brightness: value})
    }

    brightnessSlider = (e) => {
        const percent = e.currentTarget.getAttribute('gui-slider').percent;
        const value = parseInt(percent * 200);

        this.setState({brightness: value})
        this.changeBright();
    }

    async changeColor() {
        console.log("change color");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.colorTag, value: this.state.finalColor })
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

    colorPicker() {
        
        if(this.state.pickingColor){
            this.setState({pickingColor: false});
            this.changeColor();
        }
        
        else
            this.setState({pickingColor: true});
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        console.log("R: " + r, ", G: " + g + ", B: " + b);
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    sliderClick = (e) => {
        const sliderID = e.currentTarget.getAttribute('id');
        const percent = e.currentTarget.getAttribute('gui-slider').percent;
        const value = parseInt(percent * 255);

        switch(sliderID){
            case 'redSlider':
                this.setState({redColor: value});
                break;
            case 'greenSlider':
                this.setState({greenColor: value});
                break;
            case 'blueSlider':
                this.setState({blueColor: value});
                break;
            default:
        }

        this.setState( {finalColor: this.rgbToHex(this.state.redColor, this.state.greenColor, this.state.blueColor)} );
        console.log(this.state.finalColor);
    }

    closeMenu() {
        this.setState({menuOpen: false})
    }

    openMenu() {
        this.setState({menuOpen: true})
    }

    render() {
        const lightTag = this.state.lightTag;
        // console.log("Tag:" + lightTag)
        // console.log("Color:" + this.state.pickingColor)

        return(
            <Entity id={this.props.id} position={this.props.position}>
                <Entity
                    id={this.props.id + "-model"} 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf" 
                    class="stickyMove" 
                    grabbable=""
                    ondragend={this.moveObject}

                    position="0 0 0"
                    scale={{ x: 0.001, y: 0.001 , z: 0.001}}
                    rotation={this.props.rotation}
                    shadow={{cast: true}}
                    on-hover={{clickActionFunctionName: this.openMenu}}
                    >
                            
                    <Entity
                        id="lightbulbLight"
            
                        visible={this.state.lightOn}
                        >
                        <a-sphere color={this.state.finalColor} radius="69.130" position="-0.176 141.959 0" emissive={this.state.finalColor}></a-sphere>

                        {/* <a-light type="point" color={this.state.finalColor} intensity={this.state.brightness/100} light="castShadow: true" decay="1.2" distance="5.0"></a-light> */}
                        
                    </Entity>
                </Entity>
                
                <Entity id="uiPage1" position={this.state.menuOpen ? "0 0 0": "0 -3 0"}>
                    <a-gui-icon-button
                        height="0.5"
                        onClick={this.closeMenu}
                        icon="f00d"
                        icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                        align="right"
                        rotation="0 -90 0"
                        scale="0.3 0.3 0.3"
                        position="0 1.65 0.5"
                    >
                    </a-gui-icon-button>

                    {!this.state.pickingColor ? 
                    
                        <a-gui-flex-container
                            flex-direction="column" 
                            justify-content="center" 
                            align-items="normal" 
                            component-padding="0.1" 
                            opacity="0.4" 
                            width="3.5" 
                            height="4.5"
                            rotation="0 -90 0"
                            position="0 1 0"
                            scale="0.3 0.3 0.3"
                            panel-color="#2effd5"
                            panel-rounded="0.3"
                            >

                        <a-gui-button
                            id="toggleLightButton"
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

                            {this.state.lightTag != "" ?
                                <a-gui-icon-button
                                    id="toggleLightButton"
                                    width="2.5" height="0.75"
                                    onClick={this.toggle}
                                    icon="f011"
                                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"

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
                                </a-gui-icon-button>
                            : ''}
                            
                            {this.state.brightTag != "" ?
                                <a-gui-icon-label-button
                                    width="2.5" height="0.75"
                                    value="Brightness"
                                    
                                    icon="f0eb"
                                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                                    margin="0 0 0.05 0"
                                    font-size="150px"
                                    font-color="#2effd5"
                                    active-color="#2a8d7a"
                                    hover-color="#2a8d7a"
                                    border-color="#2a8d7a"
                                    background-color="#2a8d7a"
                                >
                                </a-gui-icon-label-button>
                            : ''}

                            
                            {this.state.brightTag != "" ?
                                <a-gui-slider
                                    width="2.5" height="0.75"
                                    onClick={this.brightnessSlider}
                                    percent="0.3"
                                    margin="0 0 0.05 0"
                                    font-color="#2effd5"
                                    background-color="#2a8d7a"
                                    active-color="grey"
                                    border-color="#2effd5"
                                >
                                </a-gui-slider>
                            : ''}
                            
                            {this.state.colorTag != "" ?
                                <a-gui-icon-button
                                    id="changeMenuButton"
                                    width="2.5" height="0.75"
                                    onClick={this.colorPicker}
                                    value="Change Color"
                                    font-family="Arial"
                                    font-size="150px"
                                    margin="0 0 0.15 0"
                                    icon="f53f"
                                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                                    
                                    font-color="#2effd5"
                                    active-color="#4f8278"
                                    hover-color="#81dbca"
                                    border-color="#2effd5"
                                    background-color="#2a8d7a"
                                    >
                                </a-gui-icon-button>
                            : ''}

                        </a-gui-flex-container>
                    :
                       
                        <a-gui-flex-container
                            visible="true"
                            id="uiPage2"
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
                            panel-color="#2effd5"
                            panel-rounded="0.3"
                        >
                            <a-gui-label
                                width="2.5" height="0.75"
                                value="RGB Color Slider"
                                margin="0 0 0.05 0"
                                font-size="150px"
                                font-color="#2effd5"
                                background-color="#2a8d7a"
                            ></a-gui-label>

                            <a-gui-slider
                                width="2.5" height="0.4"
                                id="redSlider"
                                onClick={this.sliderClick}
                                background-color="red"
                                percent="0.01"
                                margin="0 0 0.05 0"
                            >
                            </a-gui-slider>
                            
                            <a-gui-slider
                                width="2.5" height="0.4"
                                id="greenSlider"
                                onClick={this.sliderClick}
                                background-color="green"
                                percent="0.01"
                                margin="0 0 0.05 0"
                            >
                            </a-gui-slider>

                            <a-gui-slider
                                width="2.5" height="0.4"
                                id="blueSlider"
                                onClick={this.sliderClick}
                                background-color="blue"
                                percent="0.01"
                                margin="0 0 0.05 0"
                            >
                            </a-gui-slider>

                            <a-gui-label
                                width="2.5" height="0.50"
                                value="Selected Color"
                                font-color={this.state.finalColor}
                                margin="0 0 0.05 0"
                                font-size="150px"
                            ></a-gui-label>

                            <a-gui-button
                                id="changeMenuButton"
                                width="2.5" height="0.75"
                                onClick={this.colorPicker}
                                value="Confirm Color"
                                font-family="Arial"
                                font-size="150px"
                                margin="0 0 0.05 0"
                                
                                font-color="#2effd5"
                                active-color="#4f8278"
                                hover-color="#81dbca"
                                border-color="#2effd5"
                                background-color="#2a8d7a"
                                >
                            </a-gui-button>
                        </a-gui-flex-container>
                    
                    }
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
                        rotation="0 -40 0"
                        position="-0.56 1 -1"
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
                            value={"Light Status: " + (this.state.lightOn ? 'On' : 'Off')}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>

                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"Brightness Status: " + this.state.brightness}
                            margin="0 0 0.05 0"
                            font-size="120px"
                        >
                        </a-gui-label>

                        <a-gui-label
                            width="2.5" height="0.75"
                            value={"Current Color: "}
                            margin="0 0 0.05 0"
                            font-size="120px"
                            background-color={this.state.finalColor}
                        >
                        </a-gui-label>
                    </a-gui-flex-container>
                </Entity>
                
            </Entity>
        )
    }
}

export default Device;
import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class Device extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://1b08d3614b60.ngrok.io/',
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
            
        };
        this.toggle = this.toggle.bind(this);
        this.colorPicker = this.colorPicker.bind(this);
    }

    componentDidMount() {

        for (let tag of this.props.tags){

            if(tag.widget === "button"){
                if(tag.value == 0)
                    this.setState({lightOn: false})
                else if(tag.value == 1)
                    this.setState({lightOn: true})

                this.setState({lightTag: tag.tag})
            }

            else if(tag.widget === "rgb_slider")
                this.setState({colorTag: tag.tag, finalColor: tag.value})

            else if(tag.widget === "brightness_slider")
                this.setState({brightTag: tag.tag, brightness: tag.value})
        }
    }

    async toggle() {
        if(this.state.lightOn){
            console.log("turn off light");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.state.lightTag, value: 0 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
                this.setState({lightOn: false});
        }

        else{
            console.log("turn on light");

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag: this.state.lightTag, value: 1 })
            };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
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
            fetch(this.state.url + 'mock/sendTag/', requestOptions)
        
    }

    brightnessSlider = (e) => {
        const percent = e.currentTarget.getAttribute('gui-slider').percent;
        const value = parseInt(percent * 200);

        this.setState({brightness: value})
        this.changeBright()
    }

    async changeColor() {
        console.log("change color");

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tag: this.state.colorTag, value: this.state.finalColor })
        };
            fetch(this.state.url + 'mock/sendTag/', requestOptions)   
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

    render() {
        console.log("Render: " + this.state.lightOn);
        return(
            <Entity id="device" position={this.props.position} >
                <Entity
                    id="lightbulb" 
                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf" 
                    
                    scale={{ x: 0.001, y: 0.001 , z: 0.001}}
                    rotation={this.props.rotation}
                    shadow={{cast: true}}
                    >

                    <Entity
                        id="lightbulbLight"
            
                        visible={this.state.lightOn}
                        >
                        <a-sphere color={this.state.finalColor} radius="69.130" position="-0.176 141.959 0" emissive={this.state.finalColor}></a-sphere>

                        <a-light type="point" color={this.state.finalColor} intensity={this.state.brightness/100} light="castShadow: true" decay="1.2" distance="5.0"></a-light>
                        
                    </Entity>
                </Entity>
                
                <a-gui-flex-container
                    id="deviceUI"
                    visible={!this.state.pickingColor}
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
                        onClick={this.brightnessSlider}
                        percent="0.3"
                        margin="0 0 0.05 0"
                    >
                    </a-gui-slider>

                    <a-gui-button
                        id="changeMenuButton"
                        width="2.5" height="0.75"
                        onClick={this.colorPicker}
                        value="Change Color"
                        font-family="Arial"
                        font-size="150px"
                        margin="0 0 0.05 0">
                    </a-gui-button>

                </a-gui-flex-container>

                <a-gui-flex-container
                    visible={this.state.pickingColor}
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
                    <a-gui-label
                        width="2.5" height="0.75"
                        value="RGB Color Slider"
                        margin="0 0 0.05 0"
                        font-size="150px"
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
                        background-color={this.state.finalColor}
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
                        margin="0 0 0.05 0">
                    </a-gui-button>
                </a-gui-flex-container>
            </Entity>
        )
    }
}

export default Device;
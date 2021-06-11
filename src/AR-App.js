import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";
import loadAR from "./loadAR";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");
require("aframe-event-set-component");

require("./rotation-reader");

class ARApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            callibrated: false,
            preview: true,
            callibratedPos: "0 0 0",
        };
    }

    componentDidMount() {
        loadAR(() => {
            console.log('AR scripts loaded')
            this.setState({loaded: true});
            
            var labModel = document.getElementById('rotationWrapper');
            var scale = labModel.getAttribute('scale');
            var position = labModel.getAttribute('position');

            var button = document.getElementById('callibrate');
            button.addEventListener("click", (e)=> {
                console.log('calibrating');
                labModel.setAttribute('rotation-reader', {'enabled' : false});

                var positionModel = labModel.getAttribute('position');

                console.log('position: ' + positionModel.x + ',' + positionModel.y + ',' + positionModel.z);
                
                this.setState({callibratedPos: positionModel.x + " " + positionModel.y + " " + positionModel.z})
                this.setState({callibrated: true});
              })
            
            var showARButton = document.getElementById('showAR');
            showARButton.addEventListener("click", (e)=> {
                this.setState({preview: false});
            })

            var scaleXButton = document.getElementById('scale');
            scaleXButton.addEventListener("click", (e)=> {
                labModel.setAttribute('scale', '' + (scale.x + 0.25) + ' ' + (scale.y + 0.25) + ' ' + (scale.z + 0.25) );
            })

            var scaleXDownButton = document.getElementById('scaleDown');
            scaleXDownButton.addEventListener("click", (e)=> {
                labModel.setAttribute('scale', '' + (scale.x - 0.25) + ' ' + (scale.y - 0.25) + ' ' + (scale.z - 0.25) );
            })

            var moveXButton = document.getElementById('moveX');
            moveXButton.addEventListener("click", (e)=> {
                labModel.setAttribute('position', '' + (position.x + 0.5) + ' ' + (position.y) + ' ' + (position.z) );
            })

            var moveXBackButton = document.getElementById('moveXBack');
            moveXBackButton.addEventListener("click", (e)=> {
                labModel.setAttribute('position', '' + (position.x - 0.5) + ' ' + (position.y) + ' ' + (position.z) );
            })

            var moveZButton = document.getElementById('moveZ');
            moveZButton.addEventListener("click", (e)=> {
                labModel.setAttribute('position', '' + (position.x) + ' ' + (position.y) + ' ' + (position.z + 0.5) );
            })

            var moveZBackButton = document.getElementById('moveZBack');
            moveZBackButton.addEventListener("click", (e)=> {
                labModel.setAttribute('position', '' + (position.x) + ' ' + (position.y) + ' ' + (position.z - 0.5) );
            })
            
        });
    }

    componentDidUpdate() {
        if(this.state.loaded){
            var room = document.getElementById('rotationWrapper')
            
            // console.log("update", this.props);
            room.setAttribute('rotation-reader', {   
                enabled: this.state.callibrated,   
                x: this.props.x,
                y: this.props.y,
                z: this.props.z,
                w: this.props.w
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.loaded ? <div>
                    <div style={{display: 'none', position: 'fixed', top: '10px', width:'100%', textAlign: 'center', zIndex: 1}}>
                        <button id='moveX' style={{width: '80%'}}> Move X Front </button>
                        <button id='moveXBack' style={{width: '80%'}}> Move X Back </button>
                        <button id='moveZ' style={{width: '80%'}}> Move Z Front </button>
                        <button id='moveZBack' style={{width: '80%'}}> Move Z Back </button>
                        <button id='scale' style={{width: '80%'}}> Scale </button>
                        <button id='scaleDown' style={{width: '80%'}}> Scale Down </button>
                    </div>

                    <div style={{position: 'fixed', top: '10px', width:'100%', textAlign: 'center', zIndex: 1}}>
                        <button id='callibrate' style={{width: '80%'}}> Callibrate </button>
                        <button id='showAR' style={{width: '80%'}}> Show AR </button>
                    </div>

                    {/* gesture-detector={{}} to Scene for gesture */}
                    <Scene arjs="sourceType: webcam; debugUIEnabled: false;" >

                        <Entity 
                            id="rayCamera"
                            camera raycaster="objects: .clickable; showLine: true; far: 20"
                            emitevents="true"
                            cursor="fuse: false; rayOrigin: mouse;">
                        </Entity>

                        <a-marker preset="hiro">
                            <Entity
                                visible={!this.state.callibrated}
                                id="previewModel"
                                gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
                                position="0 0 0"
                                scale='0.5 0.5 0.5'
                            />
                        </a-marker>
                        
                        <Entity id="rotationWrapper" position="0 0 0" rotation-reader="enabled: false">
                            <Entity
                                id="labAll"
                                position="-5 -1.2 5.4"
                                scale='2 2 2' 
                                visible={this.state.preview}
                            >
                                <Entity id="arUI" visible={this.state.callibrated} rotation="0 0 0">
                                    <Entity position="0 0 0" 
                                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
                                    >
                                    </Entity>
                                    <Entity id="device" position="0.234 2.5 -3.3" rotation="0 90 0">
                                        <Entity
                                            id="aircon"
                                            gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/devices/Air%20conditioner%201.gltf"
                                            scale="0.0025 0.0025 0.0025"
                                            class="clickable"
                                            event-set__1="_event: mouseenter; _target:#deviceUI; visible: true"
                                        />
                                        
                                        <a-gui-flex-container
                                            flex-direction="column" 
                                            justify-content="center" 
                                            align-items="normal" 
                                            component-padding="0.1" 
                                            opacity="0.4" 
                                            width="3.5" 
                                            height="4.5"
                                            position="0.5 -0.8 1.5"
                                            scale="0.3 0.3 0.3"
                                            panel-color="#2effd5"
                                            panel-rounded="0.3"
                                            >

                                            <a-gui-icon-button
                                                id="toggleLightButton"
                                                width="2.5" height="0.75"
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

                                            
                                            <a-gui-slider
                                                width="2.5" height="0.75"
                                                percent="0.3"
                                                margin="0 0 0.05 0"
                                                font-color="#2effd5"
                                                background-color="#2a8d7a"
                                                active-color="grey"
                                                border-color="#2effd5"
                                            >
                                            </a-gui-slider>
                                            
                                            <a-gui-icon-button
                                                id="changeMenuButton"
                                                width="2.5" height="0.75"
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

                                        </a-gui-flex-container>
                                    </Entity>
                                </Entity>
                            </Entity>
                        </Entity>

                    </Scene> 
                </div> : ''}
            </div>
        );
    }
}

export default ARApp;

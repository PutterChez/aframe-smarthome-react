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
                
                this.setState({callibratedPos: "positionModel.x " + "positionModel.y " + "positionModel.z"})
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
                                scale='2 2 2'
                            />
                        </a-marker>
                        
                        <Entity id="rotationWrapper" position="0 0 0" rotation-reader="enabled: false">
                            <Entity
                                id="labAll"
                                position={this.state.callibratedPos}
                                scale='2 2 2'
                            >
                                <Entity id="arUI" visible={this.state.callibrated}>
                                    <Entity id="device" position="0.234 2.5 -3.3">
                                        <Entity
                                            id="aircon"
                                            gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                                            scale="0.0025 0.0025 0.0025"
                                            rotation="0 90 0"
                                            class="clickable"
                                            event-set__1="_event: mouseenter; _target:#deviceUI; visible: true"
                                        />
                                        
                                        <a-gui-flex-container
                                            id="deviceUI"
                                            visible="false"
                                            flex-direction="column" 
                                            justify-content="center" 
                                            align-items="normal" 
                                            component-padding="0.1" 
                                            opacity="0.7" 
                                            width="3.5" 
                                            height="2"
                                            position="0.65 0 0"
                                            scale="0.3 0.3 0.3"
                                            look-at="#rayCamera"
                                            >
                                            
                                            <a-gui-flex-container
                                                flex-direction="row" 
                                                justify-content="center" 
                                                align-items="normal" 
                                                component-padding="0" 
                                                opacity="0" 
                                                width="3.5" 
                                                height="1.5"
                                                position="0 0 0.04"
                                                >
                                                
                                                <a-gui-button
                                                    id="upChannel"
                                                    width="1" height="0.75"
                                                    value="+"
                                                    font-family="Arial"
                                                    font-size="150px"
                                                    margin="0 0 0.05 0">
                                                </a-gui-button>
                                                
                                                <a-gui-label
                                                    width="1" height="0.75"
                                                    margin="0 0 0.05 0"
                                                    value="26 C"
                                                    font-size="150px"
                                                >
                                                </a-gui-label>

                                                <a-gui-button
                                                    id="downChannel"
                                                    width="1" height="0.75"
                                                    value="-"
                                                    font-family="Arial"
                                                    font-size="150px"
                                                    margin="0 0 0.05 0">
                                                </a-gui-button>
                                            </a-gui-flex-container>
                                        </a-gui-flex-container>
                                    </Entity>

                                    <Entity
                                        id="aircon2"
                                        gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                                        scale="0.0025 0.0025 0.0025"
                                        position="0.234 2.5 -8.3"
                                        rotation="0 90 0"
                                    />
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

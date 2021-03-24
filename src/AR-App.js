import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";
import loadAR from "./loadAR";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");

require("./rotation-reader");

class ARApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            callibrated: false,
            preview: true,
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
                labModel.setAttribute('rotation-reader', {'enabled' : true});
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
                    <a-marker-camera 
                        preset="hiro"
                        raycaster="objects: .clickable"
                        emitevents="true"
                        cursor="fuse: false; rayOrigin: mouse;"
                        id="markerA">

                        {/* gesture-handler={{}} to Entity for gesture */}
                        <Entity id="labAll" position="0 0 0" rotation="0 0 0" class="clickable">
                            <Entity id="rotationWrapper" position="0 0 0" rotation-reader="enabled: false">
                                <Entity
                                    id="labWall"
                                    position="-2 -1.2 3"
                                    scale='1 1 1'
                                >
                                    <Entity
                                        visible={this.state.preview}
                                        id="previewModel"
                                        gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
                                        position="0 0 0"
                                        scale='1 1 1'
                                    />

                                    <Entity id="arUI" visible={!this.state.preview}>
                                        <Entity
                                            id="aircon"
                                            gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                                            scale="0.0025 0.0025 0.0025"
                                            position={{ x: 0.234, y: 2.5, z: -8.3 }}
                                            rotation={{ x: 0, y: 90, z: 0 }}
                                            />
                                        <Entity
                                            id="aircon"
                                            gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                                            scale="0.0025 0.0025 0.0025"
                                            position={{ x: 0.234, y: 2.5, z: -3.3 }}
                                            rotation={{ x: 0, y: 90, z: 0 }}
                                        />
                                    </Entity>

                                </Entity>
                                {/* <a-entity geometry="primitive: box" material="color: red; opacity: 0.3"></a-entity> */}
                            </Entity>
                        </Entity>
                    </a-marker-camera>
                    </Scene> 
                </div> : ''}
            </div>
        );
    }
}

export default ARApp;

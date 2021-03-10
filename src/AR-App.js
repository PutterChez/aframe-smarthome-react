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
        };
    }

    componentDidMount() {
        loadAR(() => {
            this.setState({loaded: true});
            var button = document.getElementById('callibrateButton');
            button.addEventListener("click", (e)=> {
                console.log('calibrating');
                var marker = document.getElementById('markerA');
                // marker.addEventListener("markerFound", (e)=>{
                //     document.getElementById('markerA').setAttribute();
                // }

                this.setState({callibrated: true});

                document.getElementById('rotationWrapper').setAttribute('rotation-reader','true');
                document.getElementById('labWall').setAttribute('rotation-reader','true');
                
                document.getElementById('rotationWrapper').setAttribute('position', '0 0 15');
              })

            var scaleButton = document.getElementById('scaleButton');
            scaleButton.addEventListener("click", (e)=> {
                var labModel = document.getElementById('rotationWrapper');
    
                // var scale = labModel.getAttribute('scale');
                // console.log(scale);
                // document.getElementById('rotationWrapper').setAttribute('scale', '' + (scale.x + 5) + ' ' + (scale.y + 5) + ' ' + (scale.z + 5) );
            })
        });
    }

    componentDidUpdate() {
        if(this.state.loaded && this.state.callibrated){
            var room = document.getElementById('rotationWrapper')
            
            console.log("update", this.props);
            room.setAttribute('rotation-reader', {      
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
                    <div style={{position: 'fixed', top: '10px', width:'100%', textAlign: 'center', zIndex: 1}}>
                        <button id='callibrateButton' style={{width: '80%'}}> Callibrate </button>
                        <button id='scaleButton' style={{width: '80%'}}> Scale </button>
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
                        <Entity id="labAll" position="0 -2.5 0" class="clickable" rotation="-90 0 -90" >
                            <Entity id="rotationWrapper" rotation="0 0 90">
                                <Entity
                                    id="labWall"
                                    gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
                                    position="-4 -2.5 -4"
                                />
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

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
        };
    }

    componentDidMount() {
        // loadAR(() => {
        //     this.setState({loaded: true});
        // });
    }

    componentDidUpdate() {
        console.log("update");
        var room = document.getElementById('room')
        
        room.setAttribute('rotation-reader', {
            x: this.props.x,
            y: this.props.y,
            z: this.props.z,
            w: this.props.w
        });
    }

    render() {
        return (
            <div>
                <h1>{this.props.x}</h1>
                <h1>{this.props.y}</h1>
                <h1>{this.props.z}</h1>
                <h1>{this.props.w}</h1>
                {/* {this.state.loaded ? <Scene arjs="sourceType: webcam; debugUIEnabled: false;" gesture-detector={{}}>
                <a-marker-camera 
                    preset="hiro"
                    raycaster="objects: .clickable"
                    emitevents="true"
                    cursor="fuse: false; rayOrigin: mouse;"
                    id="markerA">

                    <Entity id="labAll" scale="0.5 0.5 0.5" class="clickable" gesture-handler={{}}>
                        <Entity
                            id="labWall"
                            gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
                            position={{ x: -4, y: 0.05, z: 0 }}
                            rotation-reader={this.props.rotation[0], this.props.rotation[1], this.props.rotation[2], this.props.rotation[3]}
                        />
                    </Entity>
                    
                    <Entity 
                        rotation-reader={this.props.rotation[0], this.props.rotation[1], this.props.rotation[2], this.props.rotation[3]}
                    >
                        <a-box></a-box>
                    </Entity>

                </a-marker-camera>
                </Scene> : ''} */}

                <Scene>
                    <Entity camera={{ active: true }} look-controls={{ enabled: false }}></Entity>
                    <a-box id="room" color="red" position="0 0 -5" rotation="0 0 0" rotation-reader="">
                    </a-box>
                </Scene>
            </div>
        );
    }
}

export default ARApp;

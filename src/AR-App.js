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
                    <a-box color="red" position="0 0 -5" rotation="0 0 0" rotation-reader={this.props.x, this.props.y, this.props.z, this.props.w}>
                        {/* <a-text color="black"> {this.props.x} </a-text> */}
                    </a-box>
                </Scene>
            </div>
        );
    }
}

export default ARApp;

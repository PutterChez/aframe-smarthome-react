import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");

require("./rotation-reader");

class ARApp extends Component {

    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js";
        script.async = true;
    
        document.body.appendChild(script);
    }

    render() {
        return (
            <Scene vr-mode-ui="enabled: false" embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
                <a-marker preset="hiro">
                    <Entity
                    position="0 -1 0"
                    scale="0.05 0.05 0.05"
                    gltf-model="https://arjs-cors-proxy.herokuapp.com/https://raw.githack.com/AR-js-org/AR.js/master/aframe/examples/image-tracking/nft/trex/scene.gltf"
                    ></Entity>
                </a-marker>
                <Entity camera={{active: "true"}}></Entity>
            </Scene>
        );
    }
}

export default ARApp;

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
                <Entity 
                    text={{ value: "This content will always face you." }}
                    look-at="[gps-camera]"
                    scale="120 120 120"
                ></Entity>
                <Entity camera={{active: "true"}} gps-camera={{}} rotation-reader={{}}></Entity>
            </Scene>
        );
    }
}

export default ARApp;

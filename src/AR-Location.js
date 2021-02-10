import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");
require("./rotation-reader");

class ARLocation extends Component {

    componentDidMount () {
        const script = document.createElement("script");
    
        script.src = "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js";
        script.async = false;
    
        document.body.appendChild(script);
    }

    render() {
        return (
            <Scene vr-mode-ui="enabled: false" embedded arjs='sourceType: webcam; debugUIEnabled: false;'>
                <a-text 
                    value="This content will always face you."
                    look-at="[gps-camera]"
                    scale="120 120 120"
                    gps-entity-place="latitude: 13.7293; longitude: 100.7753366"
                ></a-text >
                <a-camera gps-camera="" rotation-reader=""></a-camera>
            </Scene>
        );
    }
}

export default ARLocation;

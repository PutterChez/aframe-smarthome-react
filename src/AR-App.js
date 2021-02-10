import { Entity, Scene } from "aframe-react";
import React, { useEffect, useState } from "react";
import loadAR from "./loadAR";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");

require("./rotation-reader");

const ARApp = (props) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      loadAR(() => {
        setLoaded(true);
      });
    });

    return (
        <div>
            {loaded ? <Scene arjs="sourceType: webcam; debugUIEnabled: false;">
            <a-marker-camera preset="hiro">
                <Entity
                position="0 -1 0"
                rotation="0 0 90"
                scale="0.5 0.5 0.5"
                gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/LabPlan.gltf"
                ></Entity>
            </a-marker-camera>
        </Scene> : ''}
        </div>
    );
}

export default ARApp;

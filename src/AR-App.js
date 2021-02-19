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
            {loaded ? <Scene arjs="sourceType: webcam; debugUIEnabled: false;" gesture-detector={{}}>
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
                        // rotation={{ x: 0, y: -90, z:90 }}
                    />

                    {/* <Entity
                        id="aircon"
                        gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                        scale="0.0025 0.0025 0.0025"
                        position={{ x: -3.77, y: 2.5, z: -8.3 }}
                        rotation={{ x: 0, y: 90, z: 0 }}
                    />
                    <Entity
                        id="aircon"
                        gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
                        scale="0.0025 0.0025 0.0025"
                        position={{ x: -3.77, y: 2.5, z: -3.3 }}
                        rotation={{ x: 0, y: 90, z: 0 }}
                    /> */}
                </Entity>

            </a-marker-camera>
        </Scene> : ''}
        </div>
    );
}

export default ARApp;

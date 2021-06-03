import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

import {appendScript} from './appendScript';

require("aframe");
// require('aframe-aterrain-component/dist/aframe-aterrain-component');

class GeoSpatial extends Component {
  constructor(props){
    super(props);
    this.state = {
        loaded: false,
    };
  }
  
  componentDidMount() {
    appendScript('https://anselm.github.io/aterrain/Build/CesiumUnminified/Cesium.js');
    appendScript('https://anselm.github.io/aterrain/dist/aframe-aterrain-component.js');
    appendScript('https://fernandojsg.github.io/aframe-camera-transform-controls-component/dist/aframe-camera-transform-controls-component.min.js', () => {
      console.log('add terrain');
      document.getElementById("terrainModel").setAttribute("a-terrain", "fovpad:1; latitude:37.7983222; longitude:-122.3972797; elevation:100; lod:14;")
    })
  }


  render() {
    return (
            // <Scene camera-transform-controls cursor="rayOrigin: mouse">
            //   <a-entity a-terrain="fovpad:1;
            //                 latitude:37.7983222;
            //                 longitude:-122.3972797;
            //                 elevation:1;
            //                 lod:15;
            //               ">
            //     <a-entity a-location="lat:37.79832222; lon:-122.3972797; mode:relative; elevation:0;">
            //         <a-entity position="33.32114 1.52537 1.37783" rotation="-90 180 0">
            //                 <a-gltf-model scale="5 5 5" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
            //         </a-entity>
            //     </a-entity>
            //   </a-entity>
            // </Scene>
            <Scene camera-transform-controls cursor="rayOrigin: mouse">

              <a-entity id="target"></a-entity>

              <a-entity id="terrainModel">
              </a-entity>

              <a-entity id="cameraRig" position="0 0 0" >
                <a-entity id="camera" camera="near:1;far:100000" wasd-controls="fly:true" look-controls></a-entity>
                <a-entity id="lefthand" camera-transform-controls-hand="hand:left" vive-controls="hand: left" oculus-touch-controls="hand: left" windows-motion-controls="hand: left"></a-entity>
                <a-entity id="righthand" camera-transform-controls-hand="hand:right" vive-controls="hand: right" oculus-touch-controls="hand: right" windows-motion-controls="hand: right"></a-entity>
              </a-entity>


              <a-light type="directional" color="#ffffff" intensity="1" position="-1 1 1"></a-light>
              <a-light type="ambient" color="#444444"></a-light>
              <a-light type="point" intensity="1" position="2 4 4"></a-light>

              </Scene>
    );
  }
}

export default GeoSpatial;
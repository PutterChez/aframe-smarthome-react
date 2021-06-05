import "aframe";

import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

import {appendScript} from './appendScript';
require('aframe');

class GeoSpatial extends Component {
  constructor(props){
    super(props);
    this.state = {
        loaded: false  ,
    };
  }
  
  componentDidMount() {
    appendScript('https://anselm.github.io/aterrain/Build/CesiumUnminified/Cesium.js');
    appendScript('https://anselm.github.io/aterrain/dist/aframe-aterrain-component.js', () => {
      console.log('add terrain');
      this.setState({loaded: true});
      // document.getElementById("world").setAttribute("a-terrain", "radius:1000; observer:camera");
    })
  }


  render() {
    return (
            // <Scene camera-transform-controls cursor="rayOrigin: mouse">

            //   <a-entity id="target"></a-entity>

            //   <a-entity id="terrainModel">
            //   </a-entity>

            //   <a-entity id="cameraRig" position="0 0 0" >
            //     <a-entity id="camera" camera="near:1;far:100000" wasd-controls="fly:true" look-controls></a-entity>
            //     <a-entity id="lefthand" camera-transform-controls-hand="hand:left" vive-controls="hand: left" oculus-touch-controls="hand: left" windows-motion-controls="hand: left"></a-entity>
            //     <a-entity id="righthand" camera-transform-controls-hand="hand:right" vive-controls="hand: right" oculus-touch-controls="hand: right" windows-motion-controls="hand: right"></a-entity>
            //   </a-entity>


            //   <a-light type="directional" color="#ffffff" intensity="1" position="-1 1 1"></a-light>
            //   <a-light type="ambient" color="#444444"></a-light>
            //   <a-light type="point" intensity="1" position="2 4 4"></a-light>

            //   </Scene>
            <div>
                {this.state.loaded ? <div>
              <Scene id="scene" cursor="rayOrigin: mouse">
              <a-assets>
                <img id="sky" src="https://anselm.github.io/aterrain/examples/assets/PIA12348_hires.jpg"/>
              </a-assets>

                {/* <a-entity id="world" position="0 0 0" visible="true" a-terrain="radius:1000; observer:camera">
                  <a-entity a-location="lat:37.79832222; lon:-122.3972797; mode:relative; elevation:0;">
                      <a-entity position="-20 1.5 -10" rotation="-90 180 0">
                              <a-gltf-model scale="5 5 5" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
                      </a-entity>
                  </a-entity>
                </a-entity> */}

              <a-entity a-terrain="fovpad:1;
                            latitude:37.7983222;
                            longitude:-122.3972797;
                            elevation:1;
                            lod:15;
                          ">
                <a-entity a-location="lat:37.79832222; lon:-122.3972797; mode:relative; elevation:0;">
                    <a-entity position="-20 1.5 -10" rotation="-90 180 0">
                            <a-gltf-model scale="5 5 5" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
                    </a-entity>
                </a-entity>
              </a-entity>

                <a-entity id="cameraRig">
                  <a-entity
                      id="camera"
                      camera="fov: 45; near:0.01; far:10000"
                      wasd-controls="fly:true" look-controls
                      position="0 1 5000"
                      orbit-controls="
                          autoRotate: false;
                          target: #world;
                          enableDamping: true;
                          dampingFactor: 0.125;
                          rotateSpeed:0.10;
                          minDistance:1000;
                          maxDistance:5000;
                          minPolarAngle:0.1;
                          maxPolarAngle:3.04159265359;
                          enableProportionalVelocity:true;
                      ">
                  </a-entity>
                </a-entity>

                <a-entity id="environment" environment="playArea:100; xground: none; preset: starry; fog: 0"></a-entity>

                <a-entity light="type: directional; color: #EED; intensity: 3" position="-1 1 1"></a-entity>

                <a-sky src="#sky" radius="4000" color="#6EBAA7" ></a-sky>
              
            </Scene>
            </div> : ''}
          </div>
    );
  }
}

export default GeoSpatial;
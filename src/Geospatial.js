import "aframe";

import { Entity, Scene } from "aframe-react";
import React, { Component } from "react";

import {appendScript} from './appendScript';
require('aframe');
require('aframe-gui');
require('aframe-event-set-component');
require("aframe-controller-cursor-component");

class GeoSpatial extends Component {
  constructor(props){
    super(props);
    this.state = {
        loaded: false  ,
    };
  }
  
  componentDidMount() {
    appendScript('https://fernandojsg.com/aframe-camera-transform-controls-component/dist/aframe-camera-transform-controls-component.min.js');
    appendScript('https://anselm.github.io/aterrain/examples/js/aframe-orbit-controls-component.js');
    appendScript('https://putterchez.github.io/aframe-smarthome-react/a-terrain/aframe-aterrain-component/Build/CesiumUnminified/Cesium.js');
    appendScript('https://putterchez.github.io/aframe-smarthome-react/a-terrain/aframe-aterrain-component/dist/aframe-aterrain-component.js', () => {
      console.log('add terrain');
      this.setState({loaded: true});
      // document.getElementById("world").setAttribute("a-terrain", "radius:1000; observer:camera");
    })
  }


  render() {
    return (
            <div>
                {this.state.loaded ? <div>
              <Scene id="scene" cursor="rayOrigin: mouse" style="position: relative; height: 100%; width: 100%;">
              <a-assets>
                <img id="sky" src="https://anselm.github.io/aterrain/examples/assets/PIA12348_hires.jpg"/>
              </a-assets>
                
              {/* <a-entity id="target"></a-entity>

              <a-entity a-terrain="fovpad:1;
                     latitude:37.7983222;
                     longitude:-122.3972797;
                     elevation:100;
                     lod:14;
                      ">
              </a-entity>

              <a-entity id="cameraRig" position="0 0 0" >
                <a-entity id="camera" camera="near:1;far:100000" wasd-controls="fly:true" look-controls></a-entity>
                <a-entity id="lefthand" camera-transform-controls-hand="hand:left" vive-controls="hand: left" oculus-touch-controls="hand: left" windows-motion-controls="hand: left"></a-entity>
                <a-entity id="righthand" camera-transform-controls-hand="hand:right" vive-controls="hand: right" oculus-touch-controls="hand: right" windows-motion-controls="hand: right"></a-entity>
              </a-entity>


              <a-light type="directional" color="#ffffff" intensity="1" position="-1 1 1"></a-light>
              <a-light type="ambient" color="#444444"></a-light>
              <a-light type="point" intensity="1" position="2 4 4"></a-light> */}

            <a-entity id="world" position="0 0 0" rotation="0 180 0" visible="true" a-terrain="radius:1000; observer:camera">
              <a-entity a-location="lat:45; lon:-122; radius:1010;">
                <a-entity rotation="-90 0 0" event-set__mouseenter="visible: true; _target: #smarthome1UI;">
                  <a-gltf-model scale="10 10 10" rotation="0 180 0" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
                </a-entity>

                <a-gui-flex-container
                  id="smarthome1UI"
                  visible="false"
                  flex-direction="column" 
                  justify-content="center" 
                  align-items="normal" 
                  component-padding="0" 
                  opacity="0.4" 
                  width="3.5" 
                  height="3"
                  position="142.36197 26.08398 -256.38834" 
                  scale="70 70 70"
                  rotation="0 180 0"
                  panel-color="#2effd5"
                  panel-rounded="0.3">

                <a-gui-button 
                    width="2.5" height="0.75"
                    value="San Francisco Lab"
                    align="center"
                    margin="0 0 0.05 0"
                    font-size="150px"
                    font-color="#2effd5"
                    active-color="#2a8d7a"
                    hover-color="#2a8d7a"
                    border-color="#2a8d7a"
                    background-color="#2a8d7a"
                >
                </a-gui-button>

                <a-gui-icon-label-button
                    width="2.5" height="0.75"
                    value="Location: 37.7359257, \n -122.5019327"
                    
                    icon="f3c5"
                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                    margin="0 0 0.05 0"
                    font-size="100px"
                    font-color="#2effd5"

                    active-color="#4f8278"
                    hover-color="#81dbca"
                    border-color="#2effd5"
                    background-color="#2a8d7a"
                >
                </a-gui-icon-label-button>
                <a-gui-icon-label-button
                    width="2.5" height="0.75"
                    value="Floors: 5"
                    
                    icon="f5fd"
                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                    margin="0 0 0.05 0"
                    font-size="150px"
                    font-color="#2effd5"
                    
                    active-color="#4f8278"
                    hover-color="#81dbca"
                    border-color="#2effd5"
                    background-color="#2a8d7a"
                >
                </a-gui-icon-label-button>
              </a-gui-flex-container>
              </a-entity>

              <a-entity a-location="lat:13; lon:100; radius:1010;">
                <a-entity rotation="-90 0 0" event-set__mouseenter="visible: true; _target: #smarthome2UI;">
                  <a-gltf-model scale="10 10 10" rotation="0 180 0" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
                </a-entity>

                <a-gui-flex-container
                  id="smarthome2UI"
                  visible="false"
                  flex-direction="column" 
                  justify-content="center" 
                  align-items="normal" 
                  component-padding="0" 
                  opacity="0.4" 
                  width="3.5" 
                  height="3"
                  position="142.36197 26.08398 -256.38834" 
                  scale="70 70 70"
                  rotation="0 180 0"
                  panel-color="#2effd5"
                  panel-rounded="0.3">

                <a-gui-button 
                    width="2.5" height="0.75"
                    value="ICT Lab KMITL"
                    align="center"
                    margin="0 0 0.05 0"
                    font-size="150px"
                    font-color="#2effd5"
                    active-color="#2a8d7a"
                    hover-color="#2a8d7a"
                    border-color="#2a8d7a"
                    background-color="#2a8d7a"
                >
                </a-gui-button>

                <a-gui-icon-label-button
                    width="2.5" height="0.75"
                    value="Location: 13.8671929, \n 100.6864996"
                    
                    icon="f3c5"
                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                    margin="0 0 0.05 0"
                    font-size="100px"
                    font-color="#2effd5"

                    active-color="#4f8278"
                    hover-color="#81dbca"
                    border-color="#2effd5"
                    background-color="#2a8d7a"
                >
                </a-gui-icon-label-button>
                <a-gui-icon-label-button
                    width="2.5" height="0.75"
                    value="Floors: 8"
                    
                    icon="f5fd"
                    icon-font="https://rdub80.github.io/aframe-gui/examples/assets/fonts/fa-solid-900.ttf"
                    margin="0 0 0.05 0"
                    font-size="150px"
                    font-color="#2effd5"
                    
                    active-color="#4f8278"
                    hover-color="#81dbca"
                    border-color="#2effd5"
                    background-color="#2a8d7a"
                >
                </a-gui-icon-label-button>
              </a-gui-flex-container>
                {/* <a-entity link="href: index.html; title: My Homepage; image: https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/src/lab_preview.png"></a-entity> */}
              </a-entity>
            </a-entity>

            <a-entity id="cameraRig">
              <a-entity
                  id="camera"
                  camera="fov: 45; near:0.8; far:10000"
                  wasd-controls="fly:true"
                  look-controls=""
                  position="0 1 5000"
                  orbit-controls="autoRotate: false;target:#world;enableDamping: true;dampingFactor: 0.125;rotateSpeed:0.10;minDistance:1000;maxDistance:5000;minPolarAngle:0.1;maxPolarAngle:3.04159265359;enableProportionalVelocity:true;">
              </a-entity>
              <a-entity id="lefthand" camera-transform-controls-hand="hand:left" oculus-touch-controls="hand: left" controller-cursor=""></a-entity>
              <a-entity id="righthand" camera-transform-controls-hand="hand:right" oculus-touch-controls="hand: right" controller-cursor=""></a-entity>
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
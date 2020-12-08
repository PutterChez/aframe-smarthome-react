import "aframe";

import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";
import Device from "./Device";

require("aframe-gui");
require("aframe-environment-component");
require("aframe-controller-cursor-component");

class App extends Component {

  render() {
    return (
      <Scene environment="preset: default" style="position: absolute; height: 100%; width: 100%;">
        <Entity
          look-controls={{ enabled: "true" }}
          wasd-controls={{ enabled: "true" }}
          position={{ x: 0, y: 1.65, z: 0 }}
        >

        <a-cursor></a-cursor>

          <Entity 
            id="rightHand" 
            static-body="shape: sphere; sphereRadius: 0.02;"
            sphere-collider="objects: .throwable"
            grab ={{}}
            oculus-touch-controls="hand: right">
          </Entity>

          <Entity 
            id="leftHand" 
            oculus-touch-controls="hand: left"
            controller-cursor={{}}
          ></Entity>

        </Entity>

        <a-assets>
          <a-asset-item
            id="tv"
            src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/TV_01.gltf"
          ></a-asset-item>
          <a-asset-item
            id="airconModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.3/Air%20conditioner%201.gltf"
          ></a-asset-item>
          <a-asset-item
            id="dysonModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/scene.gltf"
          ></a-asset-item>
          <a-asset-item 
            id="lightbulbModel" 
            src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome/Lightbulb.gltf"
          ></a-asset-item>

          <a-asset-item
            id="labModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/LabPlan.gltf"
          ></a-asset-item>
          <a-asset-item
            id="labWall"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
          ></a-asset-item>
        </a-assets>

        <a-light
          type="point"
          color="white"
          position="3.639 3.281 -11.717"
          intensity="0.5"
        ></a-light>

        <Entity id="labAll" position="0 0 3.75">
          <Entity
            id="lab"
            gltf-model="#labModel"
            position={{ x: -4, y: 0.11, z: 0 }}
          />
          <Entity
            id="labWall"
            gltf-model="#labWall"
            position={{ x: -4, y: 0.1, z: 0 }}
          />

          <Entity>
            <Entity 
              id="fan"
              gltf-model="#dysonModel"
              position={{ x: 0.9, y: 0, z: -4.3 }}
              rotation={{ x: 0, y: 0, z: 0 }}
              animation={{property: "rotation", to: "0 115 0", dir: "alternate", loop: "true", dur: "2000"}}
              />
            <a-gui-button
              id="fanButton"
              width="0.75" height="0.25" 
              position="0.9 1.1 -4.4"
              // onClick="turnOffFan"
              value="Toggle Fan"
              font-family="Arial"
              font-size="30px"
              margin="0 0 0.05 0">
            </a-gui-button>
          </Entity>
          
          <Device></Device>

          <Entity
            id="aircon"
            gltf-model="#airconModel"
            scale="0.0025 0.0025 0.0025"
            position={{ x: -3.77, y: 2.5, z: -8.3 }}
            rotation={{ x: 0, y: 90, z: 0 }}
          />
          <Entity
            id="aircon"
            gltf-model="#airconModel"
            scale="0.0025 0.0025 0.0025"
            position={{ x: -3.77, y: 2.5, z: -3.3 }}
            rotation={{ x: 0, y: 90, z: 0 }}
          />

        </Entity>
      </Scene>
    );
  }
}

export default App;

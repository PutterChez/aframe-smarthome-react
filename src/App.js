import "aframe";

import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";

require("aframe-gui");
require("aframe-environment-component");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightOn: false,
      url: 'http://fb82987a45f0.ngrok.io/'
    };
    this.toggle = this.toggle.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount() {
    // GET request using fetch with error handling
    fetch(this.state.url, {  mode: 'no-cors' })
        .then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response statusText
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            console.log(data);
            // this.setState({ lightOn: data.status })
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

  async toggle() {
    if(this.state.lightOn){
      console.log("turn off light");
      await fetch(this.state.url + 'light/off', {  mode: 'no-cors' });
      this.setState({lightOn: false});
    }

    else{
      console.log("turn on light");
      await fetch(this.state.url + 'light/on', {  mode: 'no-cors' });
      this.setState({lightOn: true});
    }
  }

  render() {
    return (
      <Scene environment="preset: default" style="position: absolute; height: 100%; width: 100%;">
        <Entity
          camera
          look-controls={{ enabled: "true" }}
          wasd-controls={{ enabled: "true" }}
          position={{ x: 0, y: 1.65, z: 0 }}
        >

        <a-cursor></a-cursor>

          <Entity id="rightHand" static-body="shape: sphere; sphereRadius: 0.02;"
            vive-controls="hand: right"
            sphere-collider="objects: .throwable"
            grab oculus-touch-controls="hand: right">    
          </Entity>
          <Entity id="leftHand" controller-cursor oculus-touch-controls="hand: left"></Entity>

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
            src="https://cdn.jsdelivr.net/gh/PutterChez/AFrame-SmartHome@v1.7/LabPlan.gltf"
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
          
          <Entity>
            <Entity
              id="lightbulb" 
              gltf-model="#lightbulbModel" 
              position={{ x: 2.04, y: 0.936, z: -3.043}} 
              scale={{ x: 0.001, y: 0.001 , z: 0.001}}
              rotation={{ x: 0, y: 90, z: 0 }}>
              
              <Entity
                id="lightbulbLight"
                visible={this.state.lightOn}>
                <a-sphere color="blue" radius="69.130" position="-0.176 141.959 0" material="blending:  multiply"></a-sphere>

                <a-light type="point" color="blue" intensity="0.6" light="castShadow: true" decay="1.2" distance="5.0"></a-light>
              </Entity>
            </Entity>

            <a-gui-button
                  id="toggleLightButton"
                  width="0.75" height="0.25" 
                  position="1.97 1.5 -3.027"
                  rotation="0 -90 0"
                  onClick={this.toggle}
                  value="Toggle Light"
                  font-family="Arial"
                  font-size="30px"
                  margin="0 0 0.05 0">
            </a-gui-button>
          </Entity>

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

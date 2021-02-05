import "aframe";

import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";

require("ar.js-modular")

class ARApp extends Component {

  render() {
    return (
      <Scene vr-mode-ui="enabled: false" embedded  arjs="sourceType: webcam; debugUIEnabled: false;" style="position: absolute; height: 100%; width: 100%;">
        <a-text
            value="This content will always face you."
            look-at="[gps-camera]"
            scale="120 120 120"
            gps-entity-place="latitude: 13.729268; longitude: 100.776023;"
        ></a-text>
        <a-camera gps-camera rotation-reader></a-camera>
      </Scene>
    );
  }
}

export default ARApp;

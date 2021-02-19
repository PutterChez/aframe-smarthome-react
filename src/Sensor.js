import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";
import loadAR from "./loadAR";
import { Gyroscope, RelativeOrientationSensor } from "motion-sensors-polyfill";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");

class Sensor extends Component {

    componentDidMount () {
        navigator.permissions.query({name:'gyroscope'}).then(function(result) {    console.log(result.state); });

        let status = document.getElementById('status');
        if ( 'Gyroscope' in window ) {
            let sensor = new RelativeOrientationSensor();
            sensor.addEventListener('reading', function(e) {
            document.getElementById('status').innerHTML = 'val: ' + sensor.quaternion;
            });
            sensor.start();
        }
        else status.innerHTML = 'Gyroscope not supported';
    }

    render() {
        return (
            <div id='status'></div>
        );
    }
}

export default Sensor;

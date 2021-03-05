import React, { Component } from "react";
import { Gyroscope, RelativeOrientationSensor } from "motion-sensors-polyfill";
import ARApp from "./AR-App";
import { THREE } from "aframe";

require("aframe");

require("aframe-environment-component");
require("aframe-look-at-component");

class Sensor extends Component {
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
        };
    }

    componentDidMount () {
        navigator.permissions.query({name:'gyroscope'}).then(function(result) {    console.log(result.state); });

        if ( 'Gyroscope' in window ) {
            let sensor = new RelativeOrientationSensor({frequency: 60});
            sensor.addEventListener('reading', (e)=> {
                console.log('val: ' + sensor.quaternion);

                this.setState({
                    x: sensor.quaternion[0].toFixed(3),
                    y: sensor.quaternion[1].toFixed(3),
                    z: sensor.quaternion[2].toFixed(3),
                    w: sensor.quaternion[3].toFixed(3)
                });
            });
            sensor.start();
        }
    }

    render() {
        return (
            <div>
                
                {/* <h1>{this.state.rotation}</h1> */}
                <ARApp x={this.state.x} y={this.state.y} z={this.state.z} w={this.state.w}></ARApp>
            </div>
        );
    }
}

export default Sensor;

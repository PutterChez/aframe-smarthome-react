import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class DynamicObject extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://ff4827428103.ngrok.io/',
            scale: "0.5 0.5 0.5",
        };
    }

    render() {
        return(
            <Entity
                ref={this.deviceRef}
                dynamic-body={{}}
                shadow={{cast: true}}
                id="book"
                class="throwable"
                gltf-model="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/CHAHIN_NOTEBOOK.gltf"
                position="-0.07672 1 -4.46525"
                scale={this.state.scale}
                event-set__1="_event: triggerup; scale: 1 1 1"
            >
            </Entity>
        )
    }

    componentDidMount() {
        document.getElementsByClassName("throwable")[0].addEventListener("triggerup", this.move);
    }

    move = (event) => {
        console.log("Object moved:", event);
        this.setState({scale: "1 1 1"});
    }
}

export default DynamicObject;
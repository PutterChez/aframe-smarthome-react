import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Entity } from "aframe-react";

class DynamicObject extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://ff4827428103.ngrok.io/',
        };
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this).addEventListener("triggerup", this.move);
    }

    move = (event) => {
        console.log("Object moved:", event);
      }

    render() {
        return(
            <Entity
                dynamic-body={{}}
                shadow={{cast: true}}
                id="book"
                class="throwable"
                gltf-model="#book"
                position="-0.07672 1 -4.46525"
                scale="0.5 0.5 0.5"
            >

            </Entity>
        )
    }
}

export default DynamicObject;
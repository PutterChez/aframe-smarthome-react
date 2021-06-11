import React, { PureComponent } from "react";
import { Entity } from "aframe-react";

class DynamicObject extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return(
            <Entity
              class="stickyMove"
              id={this.props.id}
              grabbable=""
              gltf-model={this.props.model}
              position={this.props.position}
              scale={this.props.scale}
              rotation={this.props.rotation}
          />
        )
    }
}

export default DynamicObject;
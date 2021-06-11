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
              geometry="primitive: box; width: 0.33; height: 0.33; depth: 0.33"
            //   dynamic-body=""
              gltf-model={this.props.model}
              position={this.props.position}
              scale={this.props.scale}
              rotation={this.props.rotation}
          />
        )
    }
}

export default DynamicObject;
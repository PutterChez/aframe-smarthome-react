import React, { Component } from "react";

class DeviceInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <a-gui-flex-container
                flex-direction="row" 
                justify-content="center" 
                align-items="normal" 
                component-padding="0"
                rounded="enabled: false">
                <a-gui-label
                    width="3" height="0.75"
                    value={this.props.name}
                    margin="0 0 0.05 0"
                    font-size="100px"
                    background-color="#2a8d7a"
                    font-color="#2effd5"
                >
                </a-gui-label>
            </a-gui-flex-container>
        )
    }
}

export default DeviceInfo;
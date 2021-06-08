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
                    width="2" height="0.75"
                    value={this.props.name}
                    margin="0 0 0.05 0"
                    font-size="100px"
                    background-color="#2a8d7a"
                    font-color="#2effd5"
                >
                </a-gui-label>
                <a-gui-button
                    width="1" height="0.75"
                    value="Status: On"
                    margin="0 0 0.05 0"
                    font-size="80px"
                    font-color="#2effd5"
                    active-color="#4f8278"
                    hover-color="#81dbca"
                    border-color="#2effd5"
                    background-color="#2c5e54"
                >
                </a-gui-button>
            </a-gui-flex-container>
        )
    }
}

export default DeviceInfo;
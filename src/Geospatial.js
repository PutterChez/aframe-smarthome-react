import React from "react";
import { Entity, Scene } from "aframe-react";

require('./loadGeospatial');
require('aframe-aterrain-component/dist/aframe-aterrain-component');

const GeoSpatial = () => {
  return (
    <Scene camera-transform-controls cursor="rayOrigin: mouse">
      <a-entity a-terrain="fovpad:1;
                     latitude:37.7983222;
                     longitude:-122.3972797;
                     elevation:1;
                     lod:15;
                  ">
        <a-entity a-location="lat:37.79832222; lon:-122.3972797; mode:relative; elevation:0;">
            <a-entity position="-20 1.5 -10" rotation="-90 180 0">
                    <a-gltf-model scale="5 5 5" src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"></a-gltf-model>
            </a-entity>
        </a-entity>
      </a-entity>
    </Scene>
  );
};

export default GeoSpatial;
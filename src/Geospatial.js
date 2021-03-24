import React from "react";
import { Viewer, Cesium3DTileset } from "resium";
import { IonResource } from "cesium";
import { Entity, Scene } from "aframe-react";

require('./a-building');

const GeoSpatial = () => {
  let viewer; // This will be raw Cesium's Viewer object.
  const handleReady = tileset => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };
  return (
    // <Viewer
    //   full
    //   ref={e => {
    //     viewer = e && e.cesiumElement;
    //   }}>
    //   <Cesium3DTileset url={IonResource.fromAssetId(96188)} onReady={handleReady} />
      
    // </Viewer>
    <Scene>
      <a-building lat="100.5434" long="13.74917"></a-building>
    </Scene>
  );
};

export default GeoSpatial;
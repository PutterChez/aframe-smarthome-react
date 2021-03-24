import React from "react";
import { Viewer, Cesium3DTileset } from "resium";
import { IonResource } from "cesium";
const GeoSpatial = () => {
  let viewer; // This will be raw Cesium's Viewer object.
  const handleReady = tileset => {
    if (viewer) {
      viewer.zoomTo(tileset);
    }
  };
  return (
    <Viewer
      full
      ref={e => {
        viewer = e && e.cesiumElement;
      }}>
      <Cesium3DTileset url={IonResource.fromAssetId(5714)} onReady={handleReady} />
    </Viewer>
  );
};

export default GeoSpatial;
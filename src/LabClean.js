import "aframe";

import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";

class LabClean extends Component {

  render() {
    return (
      <Scene>
        <Entity
          id="cameraRig"
          rotation={{ x: 0, y: 0, z: 0}}
        >
          <Entity
            id="head" 
            camera={{active: "true"}}
            wasd-controls={{ enabled: "true" }}
            look-controls={{ enabled: "true" }}
            position={{ x: 0, y: 1.65, z: 0 }}
            >
              <a-cursor></a-cursor>
          </Entity>
        </Entity>

        <a-assets>
          <a-asset-item
            id="tv"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/TV_01.gltf"
          ></a-asset-item>
          <a-asset-item
            id="airconModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Air%20conditioner%201.gltf"
          ></a-asset-item>
          <a-asset-item
            id="dysonModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/scene.gltf"
          ></a-asset-item>
          <a-asset-item 
            id="lightbulbModel" 
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/devices/Lightbulb.gltf"
          ></a-asset-item>

          <a-asset-item
            id="wallPartition"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/wallPartition.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskDrawerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskDrawer.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/desk.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskLectureModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/deskLecture.gltf"
          ></a-asset-item>
          
          <a-asset-item
            id="cabinetModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/cabinet_double.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelf.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfDoubleModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfDouble.gltf"
          ></a-asset-item>

          <a-asset-item
            id="shelfLowerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfLower.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfGlassModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/shelfGlass.gltf"
          ></a-asset-item>

          <a-asset-item
            id="lockerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/locker.gltf"
          ></a-asset-item>
          <a-asset-item
            id="tableModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/table.gltf"
          ></a-asset-item>
          <a-asset-item
            id="tableCurvedModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/tableCurved.gltf"
          ></a-asset-item>

          <a-asset-item
            id="labModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/LabPlan.gltf"
          ></a-asset-item>
          <a-asset-item
            id="labWall"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v1.0/assets/Lab.gltf"
          ></a-asset-item>

          <a-asset-item
            id="book"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react/assets/CHAHIN_NOTEBOOK.gltf"
          ></a-asset-item>
        </a-assets>

        <a-light
          type="point"
          position="0.214 2.615 -2.02969"
          intensity="0.4"
          distance="10"
          color="white"
          light="castShadow: true"
        ></a-light>

        <Entity id="labAll" position="-0.8 0 2.353">
          <Entity
            id="lab"
            gltf-model="#labModel"
            position={{ x: -4, y: 0.06, z: 0 }}
            visible="false"
          />
          <Entity
            id="labWall"
            gltf-model="#labWall"
            position={{ x: -4, y: 0.05, z: 0 }}
            shadow={{cast: true}}
          />

          <Entity id="furnitureList">
            <Entity
              id="wallPartition1"
              gltf-model="#wallPartition"
              position="-0.452 0.06 -4.73917"
            />
            <Entity
              id="wallPartition2"
              gltf-model="#wallPartition"
              position="-1.70 0.06 -4.73917"
            />
            <Entity
              id="wallPartition3"
              gltf-model="#wallPartition"
              position="-2.96 0.06 -4.73917"
            />

            <Entity
              id="wallPartition4"
              gltf-model="#wallPartition"
              rotation="0 90 0"
              position="0.85898 0.06 -4.57664"
            />

            <Entity
              id="wallPartition4_2"
              gltf-model="#wallPartition"
              rotation="0 90 0"
              position="-1.57857 0.06 -4.78077"
            />

            <Entity
              id="deskLecture1"
              gltf-model="#deskLectureModel"
              position="-0.562 0.06 -4.035"
            />
            <Entity
              id="deskLecture2"
              gltf-model="#deskLectureModel"
              position="-1.762 0.06 -4.035"
            />
            <Entity
              id="deskLecture3"
              gltf-model="#deskLectureModel"
              position="-2.96 0.06 -4.035"
            />
            <Entity
              id="deskLectureSec1"
              gltf-model="#deskLectureModel"
              position="-0.504 0.06 -2.204"
              rotation="0 180 0"
            />
            <Entity
              id="deskLectureSec2"
              gltf-model="#deskLectureModel"
              position="-1.700 0.06 -2.204"
              rotation="0 180 0"
            />
            <Entity
              id="deskLectureSec3"
              gltf-model="#deskLectureModel"
              position="-3.27678 0.06 -2.5328"
              rotation="0 90 0"
            />
            
            <Entity
              id="desk1"
              gltf-model="#deskModel"
              position="-3.96997 0.06 -3.89812"
            />

            <Entity
              id="shelfDouble"
              gltf-model="#shelfDoubleModel"
              position="0.69884 0.06 -2.26737"
              rotation="0 180 0"
            />
            <Entity
              id="shelfDouble2"
              gltf-model="#shelfDoubleModel"
              position="-0.50817 0.06 -1.47256"
              scale="1 0.767 1"
            />
            <Entity
              id="deskDrawer"
              gltf-model="#deskDrawerModel"
              position="2.87312 0.06 -1.55422"
              rotation="0 -90 0"
            />

            <Entity
              id="desk2"
              gltf-model="#deskModel"
              position="1.95878 0.06 -2.59495"
            />
            <Entity
              id="desk3"
              gltf-model="#deskModel"
              position="1.95878 0.06 -1.5982"
            />
            <Entity
              id="desk4"
              gltf-model="#deskModel"
              position="2.95459 0.06 -1.5982"
            />
            <Entity
              id="desk5"
              gltf-model="#deskModel"
              position="2.95459 0.06 -2.597"
            />


            <Entity
              id="wallPartition5"
              gltf-model="#wallPartition"
              position="-1.76589 0.06 -1.52473"
            />
            <Entity
              id="wallPartition6"
              gltf-model="#wallPartition"
              position="-3.026 0.06 -1.52473"
            />

            <Entity
              id="locker"
              gltf-model="#lockerModel"
              position="-3.033 0.06 -1.97029"
              rotation="0 180 0"
            />
            <Entity
              id="table1"
              gltf-model="#tableModel"
              position="-3.46181 0.06 -0.01224"
            />

            <Entity
              id="glassShelf1"
              gltf-model="#shelfGlassModel"
              position="2.52301 0.06 -0.39101"
              rotation="0 180 0"
            />
            <Entity
              id="glassShelf2"
              gltf-model="#shelfGlassModel"
              position="2.52301 0.93963 -0.39101"
              rotation="0 180 0"
            />

            <Entity
              id="shelf"
              gltf-model="#shelfModel"
              position="2.44045 0.0572 -4.73446"
              rotation="0 90 0"
            />

            <Entity
              id="deskLecture4"
              gltf-model="#deskLectureModel"
              position="2.85751 0.0572 -5.193"
              rotation="0 90 0"
            />
            <Entity
              id="deskLecture5"
              gltf-model="#deskLectureModel"
              position="2.85751 0.0572 -6.392"
              rotation="0 90 0"
            />
            <Entity
              id="shelfDouble2"
              gltf-model="#shelfDoubleModel"
              position="1.74477 0.0572 -6.73072"
              rotation="0 -90 0"
            />
            <Entity
              id="deskLecture6"
              gltf-model="#deskLectureModel"
              position="4.302 0.0572 -5.937"
              rotation="0 -90 0"
            />
            <Entity
              id="deskLecture7"
              gltf-model="#deskLectureModel"
              position="4.302 0.0572 -7.13709" 
              rotation="0 -90 0"
            />
            <Entity
              id="deskLecture8"
              gltf-model="#deskLectureModel"
              position="4.302 0.0572 -8.334" 
              rotation="0 -90 0"
            />

            <Entity
              id="deskLecture9"
              gltf-model="#deskLectureModel"
              position="-0.38489 0.06 -5.48266" 
              rotation="0 180 0"
            />
            <Entity
              id="deskLecture10"
              gltf-model="#deskLectureModel"
              position="0.816 0.06 -5.48266" 
              rotation="0 180 0"
            />
            <Entity
              id="desk6"
              gltf-model="#deskModel"
              position="-2.62015 0.06 -4.83058"
            />
            <Entity
              id="desk7"
              gltf-model="#deskModel"
              position="-3.62075 0.06 -4.89817"
            />

            <Entity
              id="table2"
              gltf-model="#tableModel"
              position="0.23287 0.06 -6.72517"
              rotation="0 90 0"
            />
            <Entity
              id="deskDrawer2"
              gltf-model="#deskDrawerModel"
              position="0.23287 0.06 -7.07459"
            />
            <Entity
              id="deskLecture11"
              gltf-model="#deskLectureModel"
              position="0.93335 0.06 -8.03954"
              rotation="0 90 0"
            />
            <Entity
              id="desk8"
              gltf-model="#deskModel"
              position="0.23876 0.06 -9.27313"
            />
            <Entity
              id="deskLecture12"
              gltf-model="#deskLectureModel"
              position="-0.4647 0.06 -9.42722"
              rotation="0 -90 0"
            />
            <Entity
              id="table3"
              gltf-model="#tableModel"
              position="0.24367 0.06 -10.22469"
              rotation="0 180 0"
            />
            <Entity
              id="tableCurved"
              gltf-model="#tableCurvedModel"
              position="-2.34255 0.06978 -9.15187"
              rotation="0 -90 0"
            />
            <Entity
              id="deskDrawer3"
              gltf-model="#deskDrawerModel"
              position="-2.76449 0.06978 -5.86523"
              rotation="0 90 0"
            />
            
            <Entity
              id="deskLecture13"
              gltf-model="#deskLectureModel"
              position="-3.03498 0.06978 -6.86704"
              rotation="0 90 0"
            />

            <Entity
              id="deskLecture14"
              gltf-model="#deskLectureModel"
              position="-3.03498 0.06978 -8.076"
              rotation="0 90 0"
            />
            <Entity
              id="cabinet1"
              gltf-model="#cabinetModel"
              position="2.1533 0.06978 -7.64441"
              rotation="0 180 0"
            />

            <Entity
              id="cabinet2"
              gltf-model="#cabinetModel"
              position="1.599 0.06978 -9.19161"
              rotation="0 -90 0"
            />
            <Entity
              id="locker2"
              gltf-model="#lockerModel"
              position="3.4194 0.06978 -9.19161"
              rotation="0 180 0"
            />
            <Entity
              id="wallPartition7"
              gltf-model="#wallPartition"
              position="3.42816 0.06978 -8.93613"
            />
            <Entity
              id="cabinet3"
              gltf-model="#cabinetModel"
              position="1.599 0.06978 -9.97823"
              rotation="0 -90 0"
            />
          </Entity>
          
          <Entity
            id="aircon"
            gltf-model="#airconModel"
            scale="0.0025 0.0025 0.0025"
            position={{ x: -3.77, y: 2.5, z: -8.3 }}
            rotation={{ x: 0, y: 90, z: 0 }}
          />
          <Entity
            id="aircon"
            gltf-model="#airconModel"
            scale="0.0025 0.0025 0.0025"
            position={{ x: -3.77, y: 2.5, z: -3.3 }}
            rotation={{ x: 0, y: 90, z: 0 }}
          />
        </Entity>
      </Scene>
    );
  }
}

export default LabClean;

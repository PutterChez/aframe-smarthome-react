import "aframe";

import { Entity, Scene } from "aframe-react";

import React, { Component } from "react";
import Device from "./Device";
import TV from "./TV";

import "aframe-physics-system/dist/aframe-physics-system"
import DynamicObject from "./DynamicObject";
import DeviceInfo from "./DeviceInfo";
import {appendScript} from './appendScript';

require("aframe-gui");
require("aframe-environment-component");
require("aframe-controller-cursor-component");
require('aframe-extras');
require('aframe-event-set-component');
require('aframe-teleport-controls');
require('super-hands');
require('./thumbstick');
require('./speechControl');
require('./callAssistant');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceList: [],
      deviceRef: [],
      readyState: false,
      retrieveObjects: true,
      loaded: false,
      // deviceList: [<Device key="Lightbulb1" id="Lightbulb1" position='2.04 0.936 -3.043' rotation='0 90 0' tags={[{tag:'ict.HueLight01.onoff', widget:'button'}, {tag:'ict.HueLight01.bright', widget:'brightness_slider'}, {tag:'ict.HueLight01.hue', widget:'rgb_slider'}]} type='lightbulb'></Device>],
    //   deviceList: [
    //     {name: 'lightbulb1', position: '2.04 0.936 -1.5', rotation: '0 90 0', tags: [{tag:'ict.HueLight01.onoff', widget:'button'}, {tag:'ict.HueLight01.bright', widget:'brightness_slider'}, {tag:'ict.HueLight01.hue', widget:'rgb_slider'}], type: 'lightbulb'},
    //   {name: 'lightbulb2', position: '2.04 0.936 -3.043', rotation: '0 90 0', tags: [{tag:'ict.HueLight02.onoff', widget:'button'}, {tag:'ict.HueLight02.bright', widget:'brightness_slider'}, {tag:'ict.HueLight02.hue', widget:'rgb_slider'}], type: 'lightbulb'}, 
    //   {name: 'tv1', position: '3.466 0.85 -1.25', rotation: '0 -140 0', tags:  [{tag:'ict.tv.channel', widget:'channel_button', value: '20'}], type: 'tv'}
    // ],
    };
    this.ws = React.createRef();
    this.recordStart = this.recordStart.bind(this);
    this.recordStop = this.recordStop.bind(this);
  }

  async componentDidMount() {
    appendScript('https://fernandojsg.com/aframe-camera-transform-controls-component/dist/aframe-camera-transform-controls-component.min.js');
    appendScript('https://anselm.github.io/aterrain/examples/js/aframe-orbit-controls-component.js');
    appendScript('https://putterchez.github.io/aframe-smarthome-react/a-terrain/aframe-aterrain-component/Build/CesiumUnminified/Cesium.js');
    appendScript('https://putterchez.github.io/aframe-smarthome-react/a-terrain/aframe-aterrain-component/dist/aframe-aterrain-component.js', () => {
      console.log('add terrain');
      this.setState({loaded: true});
    })

    if(this.state.retrieveObjects){
      this.ws.current = new WebSocket(
        "wss://c2c942b8fd23.ngrok.io/ws/chat/Test1/",
      );
  
      this.ws.current.onopen = () => {
        console.log("ws opened");
        this.setState({readyState: true});
      };
      this.ws.current.onclose = () => {
        console.log("ws closed");
        this.ws.current.close();
        this.setState({readyState: false});
      };
      
      // GET request using fetch with error handling
      fetch(this.props.url + 'mock/get/')
          .then(async response => {
              const data = await response.json();

              // check for error response
              if (!response.ok) {
                  // get error message from body or default to response statusText
                  const error = (data && data.message) || response.statusText;
                  return Promise.reject(error);
              }

              const zodbData = JSON.parse(data)
              console.log(zodbData);

              // console.log("Name: " + id + "\nLocation: " + zodbData[id].location + "\nRotation: " + zodbData[id].rotation + "\nTag: " +  zodbData[id].tag[0].tags)
              
              zodbData.ICTLab.devices.map((devices) => {
                this.addDevice(devices.name, devices.location, devices.rotation, devices.tags, devices.type);
              })
              

              // this.addDevice(id, zodbData[id].location, zodbData[id].rotation, zodbData[id].tag[0].tags);
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
    }
    window.recordPage = this;
  }

  async componentDidUpdate() {
    this.ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const message = JSON.parse(data["message"]);
      
      console.log(data);
      console.log(message);
      
      const tag = message.tag;
      const value = message.value;
    
      console.log(tag, value);


      console.log('get devicelist test before', this.state.deviceRef  )

      for (let device of this.state.deviceRef){
        for (let controlTag of device.current.props.tags){
          if(controlTag.tags === tag){
            device.current.updateDevice(tag, value);
          }
        }
      }

      // this.state.deviceRef[0].current.updateDevice(tag, value);
      
    }
  }

  playAudio() {
    console.log('playing audio')
    // var player = new talkify.TtsPlayer(); //or new talkify.Html5Player()
    // player.playText('Hello world');
  }

  addDevice(newName, newPosition, newRotation, newTags, newType) {
    var newRef = React.createRef();
    this.setState(prevState => ({
      deviceRef: [...prevState.deviceRef, newRef]
    }))

    if(newType === "lightbulb"){
      this.setState(prevState => ({
        deviceList: [...prevState.deviceList, <Device key={newName} url={this.props.url} ref={newRef}  id={newName} position={newPosition} rotation={newRotation} tags={newTags}/>]
      }))
    }
    else{
      this.setState(prevState => ({
        deviceList: [...prevState.deviceList, <TV key={newName} url={this.props.url} ref={newRef} id={newName} position={newPosition} rotation={newRotation} tags={newTags}/>]
      }))
    }
  }

  recordStart() {
    this.props.recordStart();
  }

  recordStop() {
    this.props.recordStop();
  }

  render() {
    return (
      <div>
        {this.state.loaded ? <div>
      <Scene id="scene" physics="gravity: -1.6" style="position: relative; height: 100%; width: 100%;">
        <a-assets>
          <a-asset-item
            id="tv"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/devices/TV_01.gltf"
          ></a-asset-item>
          <a-asset-item
            id="airconModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/devices/Air%20conditioner%201.gltf"
          ></a-asset-item>
          <a-asset-item
            id="dysonModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/devices/scene.gltf"
          ></a-asset-item>
          <a-asset-item 
            id="lightbulbModel" 
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/devices/Lightbulb.gltf"
          ></a-asset-item>

          <a-asset-item
            id="wallPartition"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/wallPartition.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskDrawerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/deskDrawer.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/desk.gltf"
          ></a-asset-item>
          <a-asset-item
            id="deskLectureModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/deskLecture.gltf"
          ></a-asset-item>
          
          <a-asset-item
            id="cabinetModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/cabinet_double.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/shelf.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfDoubleModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/shelfDouble.gltf"
          ></a-asset-item>

          <a-asset-item
            id="shelfLowerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/shelfLower.gltf"
          ></a-asset-item>
          <a-asset-item
            id="shelfGlassModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/shelfGlass.gltf"
          ></a-asset-item>

          <a-asset-item
            id="lockerModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/locker.gltf"
          ></a-asset-item>
          <a-asset-item
            id="tableModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/table.gltf"
          ></a-asset-item>
          <a-asset-item
            id="tableCurvedModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/tableCurved.gltf"
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
            id="bookModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/CHAHIN_NOTEBOOK.gltf"
          ></a-asset-item>

          <a-asset-item
            id="assistantModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/1332 Robot.gltf"
          ></a-asset-item>

          <a-asset-item
            id="headModel"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/head/model.gltf"
          ></a-asset-item>

          <a-asset-item
            id="leftHand"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/left_hand/model.gltf"
          ></a-asset-item>

          <a-asset-item
            id="rightHand"
            src="https://cdn.jsdelivr.net/gh/PutterChez/aframe-smarthome-react@v2.0/assets/right_hand/model.gltf"
          ></a-asset-item>
        </a-assets>

        <Entity id="target"></Entity>

        <Entity a-terrain="fovpad:1;latitude:37.7983222;longitude:-122.3972797;elevation:100;lod:14;">
        </Entity>
        <a-sky radius="4000" color="#6EBAA7"></a-sky>

        <Entity
          id="cameraRig"
          position="0 -100 0"
          rotation="0 0 0"
        >
          <Entity
            id="head" 
            camera="active: true;"
            // camera="near:1;far:100000"
            wasd-controls={{ enabled: "true" }}
            look-controls={{ enabled: "true" }}
            position={{ x: 0, y: 1.65, z: 0 }}
            >
              {/* <Entity gltf-model="#headModel" position="-0.13 -1.6 -3.1" scale="2 2 2" visible="true" rotation="0 180 0"></Entity> */}
              {/* Enable for PC testing */}
              {/* <Entity gltf-model="#head" position="-0.33 -2.8 -1.6" rotation="0 180 0" scale="2 2 2" visible="false"></Entity> */}
              <a-cursor></a-cursor>
          </Entity>

          <Entity 
            id="rightHand" 
            oculus-touch-controls="hand: right"
            teleport-controls="cameraRig: #cameraRig; teleportOrigin: #head; button: trigger;"
            thumbstick-rotate
            call-assistant
            
            sphere-collider="objects: .stickyMove;"
            super-hands={{}}
            >
          </Entity>

          <Entity 
            id="leftHand" 
            oculus-touch-controls="hand: left"
            controller-cursor={{}}
            speech-control
            
            sphere-collider="objects: .stickyMove;"
            super-hands={{}}
          ></Entity>

        </Entity>
        
        <a-light type="directional" color="#ffffff" intensity="0.1" position="-1 1 1"></a-light>
        <a-light type="ambient" intensity="0.1" color="#444444"></a-light>
        <a-light type="point" intensity="0.1" position="2 4 4"></a-light>

        {/* <a-light
          type="point"
          position="0.214 2.615 -2.02969"
          intensity="0.4"
          distance="10"
          color="white"
          light="castShadow: true"
        ></a-light> */}

        <Entity id="labAll" position="-0.8 -100 2.353">
          <Entity
            static-body={{}}
            id="labWall"
            gltf-model="#labWall"
            position={{ x: -4, y: 0.05, z: 0 }}
            shadow={{cast: true}}
            visible="true"
          />

          <Entity geometry-merger="preserveOriginal: false" id="furnitureList">
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
              static-body={{}}
              id="deskLecture1"
              gltf-model="#deskLectureModel"
              position="-0.562 0.06 -4.035"
            />
            <Entity
              static-body={{}}
              id="deskLecture2"
              gltf-model="#deskLectureModel"
              position="-1.762 0.06 -4.035"
            />
            <Entity
              static-body={{}}
              id="deskLecture3"
              gltf-model="#deskLectureModel"
              position="-2.96 0.06 -4.035"
            />
            <Entity
              static-body={{}}
              id="deskLectureSec1"
              gltf-model="#deskLectureModel"
              position="-0.504 0.06 -2.204"
              rotation="0 180 0"
            />
            <Entity
              static-body={{}}
              id="deskLectureSec2"
              gltf-model="#deskLectureModel"
              position="-1.700 0.06 -2.204"
              rotation="0 180 0"
            />
            <Entity
              static-body={{}}
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


          {/* <a-gui-button
              id="recordStartButton"
              width="0.75" height="0.25" 
              position="0.9 1.65 -4.4"
              onClick={this.recordStart}
              value="Speech Start"
              font-family="Arial"
              font-size="30px"
              margin="0 0 0.05 0">
          </a-gui-button>

          <a-gui-button
              id="recordStopButton"
              width="0.75" height="0.25" 
              position="0.9 1.33 -4.4"
              onClick={this.recordStop}
              value="Speech Stop"
              font-family="Arial"
              font-size="30px"
              margin="0 0 0.05 0">
          </a-gui-button> */}

          {/* <Entity>
            <Entity 
              id="fan"
              gltf-model="#dysonModel"
              position={{ x: 0.9, y: 0.06, z: -4.3 }}
              scale={{x: 1.0, y: 1.2, z: 1}}
              rotation={{ x: 0, y: 0, z: 0 }}
              animation={{property: "rotation", to: "0 115 0", dir: "alternate", loop: "true", dur: "5000"}}
              />
            <a-gui-button
              id="fanButton"
              width="0.75" height="0.25" 
              position="0.9 1.33 -4.4"
              // onClick="  "
              value="Toggle Fan"
              font-family="Arial"
              font-size="30px"
              margin="0 0 0.05 0">
            </a-gui-button>
          </Entity> */}
        
          <Entity
              class="stickyMove"
              id="book1"
              grabbable=""
              gltf-model="#bookModel"
              position="-0.15 0.9 -4.3"
              scale="0.5 0.5 0.5"
              rotation="0 0 0"
          />

          {/* <Device></Device> */}
          <Entity id="deviceListRender">
            {
              this.state.deviceList.map((item) => {
                return item
                } 
              )
            }

          </Entity>
          
          <Entity id="assistantWrapper" position="0 1.4 -3.4" rotation="0 -180 0" >
            <Entity
              id="assistant"
              visible="true"
              rotation="0 0 0"
              look-at="#head"

              // Real pos
              // position="0 -5 0"
              
              // Testing pos
              position="0 0.2 0"
              // animation={{property: "position", to: "0.08 1.5 -4", dir: "alternate", loop: "true", dur: "2000"}}
              event-set__mouseenter="visible: true; _target: #querylistUI;"
            >
              <Entity 
                id="asisstantInner"
                gltf-model="#assistantModel"
                scale="0.006 0.006 0.006"
                rotation="0 -90 45">

              </Entity>
            </Entity>
          </Entity>

          <a-gui-flex-container
              id="querylistUI"
              visible="false"
              flex-direction="column" 
              justify-content="center" 
              align-items="normal" 
              component-padding="0" 
              opacity="0.4" 
              width="3.5" 
              height="4.5"
              position="-0.5 1.8 -3.4"
              scale="0.3 0.3 0.3"
              panel-color="#2effd5"
              panel-rounded="0.3"
              look-at="#head">

              <a-gui-button
                id="queryButton"
                width="3" height="0.75"
                position="-0.2 1.8 -3.4"
                value="Query Result"
                onClick={this.playAudio}
                font-family="Arial"
                font-size="100px"
                margin="0 0 0.05 0"
                font-color="#2effd5"
                active-color="#4f8278"
                hover-color="#81dbca"
                border-color="#2effd5"
                background-color="#2a8d7a">
              </a-gui-button>
              
              {
                this.state.deviceList.map((item) => {
                  return <DeviceInfo name={item.props.id}></DeviceInfo>
                }) 
              }
          </a-gui-flex-container>

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
      </div> : ''}
      </div>
    );
  }
}

export default App;

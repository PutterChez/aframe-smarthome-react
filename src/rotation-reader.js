import { THREE } from "aframe";

var qte = require('quaternion-to-euler');

const AFRAME = window.AFRAME;
// const THREE = AFRAME.THREE;

AFRAME.registerComponent('rotation-reader', {

    schema: {
      x: {type: 'number', default: 0},
      y: {type: 'number', default: 0},
      z: {type: 'number', default: 0},
      w: {type: 'number', default: 0},
    },

    init: function () {
      console.log(this.data.yourData);
    },

    tick: function (time, timedelta) {
      var data = this.data;

      console.log("x:" + data.x); 
      console.log("y:" + data.y); 
      console.log("z:" + data.z); 
      console.log("w:" + data.w); 
      var quaternion = [data.z, data.y, data.x, data.w];
      
      var euler = qte(quaternion);

      console.log(euler);
      
      var euler = new THREE.Euler().fromArray(euler);
      this.el.object3D.setRotationFromEuler(euler);

      // var euler = new THREE.Euler().setFromQuaternion(quaternion, 'ZYX');
      // var vector = new THREE.Vector3(1, 0, 0);
      // vector.applyQuaternion(quaternion);

      // this.el.object3D.rotation.set(
      //   THREE.Math.degToRad(euler.x),
      //   THREE.Math.degToRad(euler.y),
      //   THREE.Math.degToRad(euler.z)
      // );

      // this.el.object3D.quaternion.fromArray(quaternion);
      // this.el.object3D.setRotationFromEuler(euler);

      // this.el.object3D.rotation.x += 0.01;

      // console.log(quaternion.x.toFixed(3), quaternion.y.toFixed(3), quaternion.z.toFixed(3), quaternion.w.toFixed(3));
    }
  });
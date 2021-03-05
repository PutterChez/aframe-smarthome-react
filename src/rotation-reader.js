import { THREE } from "aframe";

var qte = require('quaternion-to-euler');

const AFRAME = window.AFRAME;
// const THREE = AFRAME.THREE;

AFRAME.registerComponent('rotation-reader', {
    /**
     * We use IIFE (immediately-invoked function expression) to only allocate one
     * vector or euler and not re-create on every tick to save memory.
     */
    update: (function (x, y, z, w) {
      console.log("x:" + x); 
      console.log("y:" + y); 
      console.log("z:" + z); 
      console.log("w:" + w); 
      var quaternion = [z, y, x, w
      ];
      
      // var euler = new THREE.Euler().setFromQuaternion(quaternion, 'ZYX');
      
      var euler = qte(quaternion);

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

      console.log(euler);
      // console.log(quaternion.x.toFixed(3), quaternion.y.toFixed(3), quaternion.z.toFixed(3), quaternion.w.toFixed(3));
    })
  });
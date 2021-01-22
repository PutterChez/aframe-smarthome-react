const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('abuttondown', this.rotateRight);
        this.el.addEventListener('bbuttondown', this.rotateLeft);
    },
    rotateRight: function (evt) {
        this.el.components['look-controls'].yawObject.rotation.y -= 1;
    },
    rotateLeft: function (evt) {
        this.el.components['look-controls'].yawObject.rotation.y += 1;
    }
  });
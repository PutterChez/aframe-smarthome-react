const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
      this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function (evt) {
      if (evt.detail.x < -0.95) { this.el.components['look-controls'].yawObject.rotation.y -= 1; }
      if (evt.detail.x > 0.95) { this.el.components['look-controls'].yawObject.rotation.y += 1 }
    }
  });
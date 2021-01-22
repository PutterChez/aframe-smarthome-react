const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.logThumbstick);
    },
    logThumbstick: function (evt) {
        var head = document.getElementById('head');

        if (evt.detail.x < -0.95) { head['look-controls'].yawObject.rotation.y -= 1; }
        if (evt.detail.x > 0.95) { head['look-controls'].yawObject.rotation.y += 1 }
    }
  });
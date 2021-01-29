const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickdown', this.rotate);
    },
    rotate: function (evt) {
        var camera = document.getElementById("cameraRig");
        var head = document.getElementById("head");
        var newRotation = '0 ' + camera.getAttribute("rotation") -90 + ' 0';

        head.setAttribute('look-controls', {enabled: false})
        camera.setAttribute('rotation', newRotation);
        head.setAttribute('look-controls', {enabled: true})
        // if (evt.detail.x < -0.95) { camera.setAttribute('rotation', '0 -90 0'); }
        // if (evt.detail.x > 0.95) { camera.setAttribute('rotation', '0 90 0'); }
      }
  });
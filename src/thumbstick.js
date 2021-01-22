const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.rotate);
    },
    rotate: function (evt) {
        var camera = document.getElementById("cameraRig");
        var head = document.getElementById("head");

        head.setAttribute('look-controls', {enabled: false})
        camera.setAttribute('rotation', '0 -90 0');
        head.setAttribute('look-controls', {enabled: true})
        // if (evt.detail.x < -0.95) { camera.setAttribute('rotation', '0 -90 0'); }
        // if (evt.detail.x > 0.95) { camera.setAttribute('rotation', '0 90 0'); }
      }
  });
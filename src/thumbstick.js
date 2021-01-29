const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickdown', this.rotate);
    },
    rotate: function (evt) {
        var camera = document.getElementById("cameraRig");
        var head = document.getElementById("head");
        
        var prevX = camera.getAttribute("rotation").x;
        var prevZ = camera.getAttribute("rotation").z;
        var newY = camera.getAttribute("rotation").y -90;

        // head.setAttribute('look-controls', {enabled: false})
        camera.setAttribute('rotation', {x: prevX, y: newY, z: prevZ });
        // head.setAttribute('look-controls', {enabled: true})
        // if (evt.detail.x < -0.95) { camera.setAttribute('rotation', '0 -90 0'); }
        // if (evt.detail.x > 0.95) { camera.setAttribute('rotation', '0 90 0'); }
      }
  });
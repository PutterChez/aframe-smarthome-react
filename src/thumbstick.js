const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.rotate);
    },
    rotate: function (evt) {
        var camera = document.getElementById("cameraRig");
        
        var prevX = camera.getAttribute("rotation").x;
        var prevZ = camera.getAttribute("rotation").z;
        var newY;

        if (evt.detail.x < -0.95) { 
            newY = camera.getAttribute("rotation").y + 10; 
            camera.setAttribute('rotation', {x: prevX, y: newY, z: prevZ });
        }
        if (evt.detail.x > 0.95) { 
            newY = camera.getAttribute("rotation").y - 10; 
            camera.setAttribute('rotation', {x: prevX, y: newY, z: prevZ });
        }

        // var head = document.getElementById("head");
        // head.setAttribute('look-controls', {enabled: false})
        // head.setAttribute('look-controls', {enabled: true})
        // if (evt.detail.x < -0.95) { camera.setAttribute('rotation', '0 -90 0'); }
        // if (evt.detail.x > 0.95) { camera.setAttribute('rotation', '0 90 0'); }
      }
  });
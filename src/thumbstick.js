const AFRAME = window.AFRAME;

AFRAME.registerComponent('thumbstick-rotate',{
    init: function () {
        this.el.addEventListener('thumbstickup', this.rotateRight);
        this.el.addEventListener('thumbstickdown', this.rotateLeft);
    },
    rotateRight: function (evt) {
        var head = document.getElementById('head');
        head.setAttribute('look-controls', {enabled: false})
        head.setAttribute("rotation", "0, 180, 0");
        head.setAttribute('look-controls', {enabled: true})
    },
    rotateLeft: function (evt) {
        var head = document.getElementById('head');
        head.setAttribute("rotation", "0, 180, 0");
    }
  });
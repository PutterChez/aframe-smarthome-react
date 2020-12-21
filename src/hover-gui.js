const AFRAME = window.AFRAME;

AFRAME.registerComponent('hover-gui', {
    schema: {
    },
  
    init: function() {
      this.el.addEventListener('mouseenter', function(evt) {
        this.el.setAttribute('visible', 'false');
      });
    }
  });
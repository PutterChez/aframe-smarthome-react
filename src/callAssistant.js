const AFRAME = window.AFRAME;

AFRAME.registerComponent('call-assistant',{
    init: function () {
        this.el.addEventListener('bbuttondown', this.callAssistant);
    },
    callAssistant: function () {
        var userPos = document.getElementById("cameraRig").getAttribute("position");
        var assistant = document.getElementById("assistant");
        var isVisible = assistant.getAttribute('visible');

        var newX = userPos.x + 0.08;
        var newZ = userPos.z -4

        if(isVisible === 'false')
            assistant.setAttribute('visible', 'true');

        assistant.setAttribute('position', {x: newX, y: userPos.y + 0.95, z: newZ});
        assistant.setAttribute('animation', {property: "position", to: newX + " " + userPos.y + 1.5 + " " + newZ, dir: "alternate", loop: "true", dur: "2000"})
      }
  });
const AFRAME = window.AFRAME;

AFRAME.registerComponent('call-assistant',{
    init: function () {
        this.el.addEventListener('bbuttondown', this.callAssistant);
        this.el.addEventListener('abuttondown', this.createObject);
    },
    callAssistant: function () {
        var userPos = document.getElementById("cameraRig").getAttribute("position");
        var assistant = document.getElementById("assistant");
        var assistantWrapper = document.getElementById("assistantWrapper");

        var newPosZ = userPos.z -3.4;
        var newPosY = userPos.y + 0.8;

        // var isVisible = assistant.getAttribute('visible');

        // if(isVisible === 'false')
        //     assistant.setAttribute('visible', 'true');

        assistantWrapper.setAttribute('position', {x: userPos.x, y: newPosY, z: newPosZ});
        assistantWrapper.setAttribute('animation', {property: "position", to: userPos.x + " " + newPosY + 0.5 + " " + newPosZ, dir: "alternate", loop: "true", dur: "2000"})
    },
    createObject: function() {
        var createUI = document.getElementById("createUI");

        createUI.setAttribute('visible', 'true');
    }
  });
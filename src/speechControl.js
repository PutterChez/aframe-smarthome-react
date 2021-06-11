const AFRAME = window.AFRAME;

AFRAME.registerComponent('speech-control',{
    init: function () {
        this.el.addEventListener('ybuttondown', this.recordStart);
        this.el.addEventListener('xbuttondown', this.recordStop);
    },
    recordStart: function () {
        var recordPage = window['recordPage'];
        var recordUI = document.getElementById("speechUI");

        recordUI.setAttribute('visible',"true");
        recordPage.recordStart();
    },
    recordStop: function () {
        var recordPage = window['recordPage'];
        var recordUI = document.getElementById("speechUI");

        recordUI.setAttribute('visible',"false");
        recordPage.recordStop();
    }
  });
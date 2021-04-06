import { THREE } from "aframe";

const AFRAME = window.AFRAME;

AFRAME.registerComponent('on-hover', {

    init: function () {
      var ui = document.querySelector('#deviceUI');

      this.el.addEventListener("mouseenter", function (evt) {
            ui.setAttribute('visible','true');
        });
    },
  });
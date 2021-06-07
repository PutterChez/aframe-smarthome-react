import { THREE } from "aframe";

const AFRAME = window.AFRAME;

AFRAME.registerComponent('on-hover', {
  schema: {
    clickActionFunctionName: {type: 'string'}
  },

  init: function () {
    var actionFunction = this.data.clickActionFunctionName;
    
    this.el.addEventListener("mouseenter", () => {
      actionFunction();
   });
  }
});
const loadGeospatial = (callback) => {
    const existingScript = document.getElementById('cameracontrols');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://fernandojsg.github.io/aframe-camera-transform-controls-component/dist/aframe-camera-transform-controls-component.min.js';
      script.id = 'cameracontrols';
      document.body.appendChild(script);

      script.onload = () => { 
        if (callback) callback();
      };
    }
    if (existingScript && callback) callback();
  };
  export default loadGeospatial;
const loadAR = (callback) => {
  const existingScript = document.getElementById('arjs');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script.id = 'arjs';
    document.body.appendChild(script);

    const gesturescript = document.createElement('script');
    gesturescript.src = 'https://raw.githack.com/fcor/arjs-gestures/master/dist/gestures.js';
    gesturescript.id = 'arjs-gestures';
    document.body.appendChild(gesturescript);

    script.onload = () => { 
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadAR;
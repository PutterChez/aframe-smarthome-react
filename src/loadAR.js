const loadAR = (callback) => {
  const existingScript = document.getElementById('arjs');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    script.id = 'arjs';
    document.body.appendChild(script);
    script.onload = () => { 
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadAR;
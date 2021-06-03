const loadGeospatial = (url, callback) => {
  const existingScript = document.getElementById('arjs');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/webpack-cesium/1.37.0/webpack.cesium.js';
    script.id = 'cesiumScript';
    document.body.appendChild(script);

    aterrainScript.onload = () => { 
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadGeospatial;
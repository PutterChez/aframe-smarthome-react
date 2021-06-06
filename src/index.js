import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import ARApp from './AR-App';
import CesiumVR from './CesiumVR';
import Sensor from './Sensor';
import RecordPage from './RecordPage';
import GeoSpatial from './Geospatial';
import LabClean from './LabClean';

import AppTest from './WebSockettest';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Sensor></Sensor> */}

    {/* Finished pages: AR, VR, Cesium */}

    {/* <ARApp></ARApp> */}
    <RecordPage></RecordPage>
    {/* <GeoSpatial></GeoSpatial> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

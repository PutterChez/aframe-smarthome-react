import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ARApp from './AR-App';
import ARLocation from './Sensor';

import './index.css';

import * as serviceWorker from './serviceWorker';
import Sensor from './Sensor';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Sensor></Sensor>
    {/* <ARApp></ARApp> */}
    {/* <ARLocation></ARLocation> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

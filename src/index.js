import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './style.scss';
import * as serviceWorker from './serviceWorker';


// Render ReactApp
ReactDOM.render(<App />, document.getElementById('root'));

// Register ServiceWorker
serviceWorker.register();

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './style.scss';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';


// Render ReactApp
ReactDOM.render(<App />, document.getElementById('root'));

// Register ServiceWorker
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';

import * as firebase from "firebase/app";
import "firebase/performance";
import "firebase/analytics";

import App from './App';
import './style.scss';
import * as serviceWorker from './serviceWorker';


// Init Firebase
firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});
// Init performance monitoring
firebase.performance();
// Init analytics monitoring
firebase.analytics();

// Render ReactApp
ReactDOM.render(<App />, document.getElementById('root'));

// Register ServiceWorker
serviceWorker.register();

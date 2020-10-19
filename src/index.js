import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style.scss';

import * as serviceWorker from './serviceWorker';

import * as firebase from "firebase/app";
import "firebase/performance";
import "firebase/analytics";

// Init Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDjyqf2udEWXrqq315403hjHN4DFiSVsEg",
    authDomain: "bergflix.firebaseapp.com",
    databaseURL: "https://bergflix.firebaseio.com",
    projectId: "bergflix",
    storageBucket: "bergflix.appspot.com",
    messagingSenderId: "916166332578",
    appId: "1:916166332578:web:c19c17ba0472d5963707fb",
    measurementId: "G-9VRVMYV8CW"
});
// Init performance monitoring
firebase.performance();
// Init analytics monitoring
firebase.analytics();

// Render ReactApp
ReactDOM.render(<App />, document.getElementById('root'));

// Register ServiceWorker
serviceWorker.register();

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDNeYe5zFeVyhEoqm6FPgbh-vaFMqpt_cs",
    authDomain: "chatapp-ca425.firebaseapp.com",
    // databaseURL: 'https://your-database-name.firebaseio.com',
    projectId: "chatapp-ca425",
    storageBucket: "chatapp-ca425.appspot.com",
    messagingSenderId: "274893594735",
    appId: "1:274893594735:web:4ea13f3ababba8c32eed9a",
    measurementId: "G-WSG15R54QH"
};

let app;

if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const firestore = firebase.firestore;
const auth = firebase.auth();

export { auth, db , firestore};
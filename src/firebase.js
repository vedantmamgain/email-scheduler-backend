import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyBCNBvDc6XaWM-LnsaVmyBAIEB8tLh9fdE",
    authDomain: "flippr-ai.firebaseapp.com",
    projectId: "flippr-ai",
    storageBucket: "flippr-ai.appspot.com",
    messagingSenderId: "369876571012",
    appId: "1:369876571012:web:7a3d3827e85c48bb1203d1",
    measurementId: "G-5H31FT49ER",

    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default app;

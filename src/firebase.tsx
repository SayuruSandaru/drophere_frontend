// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHwyAQxq2I3Vcfch3qzNtfSYYLiXqTYsI",
    authDomain: "drophere-iit-10.firebaseapp.com",
    databaseURL: "https://drophere-iit-10-default-rtdb.firebaseio.com",
    projectId: "drophere-iit-10",
    storageBucket: "drophere-iit-10.appspot.com",
    messagingSenderId: "644537436261",
    appId: "1:644537436261:web:45c95fb9d74abe93225e8c",
    measurementId: "G-FJ02YCQJLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, database };
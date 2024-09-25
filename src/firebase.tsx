// firebase.js (or firebaseConfig.js)
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your Firebase configuration
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 
const database = getDatabase(app);
const auth = getAuth(app); 
console.log("Auth initialized:", auth);
export { app, database, auth };

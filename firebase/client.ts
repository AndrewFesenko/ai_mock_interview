import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDxMLOz_dQVhGhdo7Y8uE6lZbcZnOBrpos",
    authDomain: "echohire-67f58.firebaseapp.com",
    projectId: "echohire-67f58",
    storageBucket: "echohire-67f58.firebasestorage.app",
    messagingSenderId: "430685970007",
    appId: "1:430685970007:web:2613b8de36942e05d20d12",
    measurementId: "G-DVYHLC8LZF"
};


const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
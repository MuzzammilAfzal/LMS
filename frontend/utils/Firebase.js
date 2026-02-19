import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "e-learning-platform-c5b69.firebaseapp.com",
  projectId: "e-learning-platform-c5b69",
  storageBucket: "e-learning-platform-c5b69.firebasestorage.app",
  messagingSenderId: "466296705783",
  appId: "1:466296705783:web:4359b7a12978e787e979f2",
  measurementId: "G-065JNHYBJ3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}

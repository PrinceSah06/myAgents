

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-chat-96cbe.firebaseapp.com",
  projectId: "ai-chat-96cbe",
  storageBucket: "ai-chat-96cbe.firebasestorage.app",
  messagingSenderId: "450055622737",
  appId: "1:450055622737:web:6a3b4039780bb962972870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider=new GoogleAuthProvider()






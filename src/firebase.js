// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔥 Bu kısmı kendi projenin verileriyle doldur!
const firebaseConfig = {
   apiKey: "AIzaSyACHMmoglUKUC8AnI6KvJAXecoj4l7RXJM",
  authDomain: "becerico.firebaseapp.com",
  projectId: "becerico",
  storageBucket: "becerico.firebasestorage.app",
  messagingSenderId: "226383529503",
  appId: "1:226383529503:web:32687f6aec171edf89b72a",
  measurementId: "G-R58R3XWWKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 Bu bilgileri kendi Firebase projenin config ekranından aldığını varsayıyorum
const firebaseConfig = {
 apiKey: "AIzaSyACHMmoglUKUC8AnI6KvJAXecoj4l7RXJM",
  authDomain: "becerico.firebaseapp.com",
  projectId: "becerico",
  storageBucket: "becerico.firebasestorage.app",
  messagingSenderId: "226383529503",
  appId: "1:226383529503:web:32687f6aec171edf89b72a",
  measurementId: "G-R58R3XWWKR"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth, Google ve Firestore bağlantıları
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Bunları dışarı aktarıyoruz ki diğer dosyalarda kullanabilelim
export { auth, provider, db };

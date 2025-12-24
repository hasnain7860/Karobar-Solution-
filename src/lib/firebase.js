import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Yeh PUBLIC config hai (Browser ke liye safe hai)
// Isme Service Account mat daalna, API Key daalna
const firebaseConfig = {
   apiKey: "AIzaSyBf2R7Up3zLEMw2QwgpvfyREfaUgnT-n1o",
  authDomain: "business-bacho.firebaseapp.com",
  projectId: "business-bacho",
  storageBucket: "business-bacho.firebasestorage.app",
  messagingSenderId: "978491846505",
  appId: "1:978491846505:web:da3fabf75626799e1757f8",
  measurementId: "G-SLX0QJ0VLB"
};

// Singleton Pattern
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };



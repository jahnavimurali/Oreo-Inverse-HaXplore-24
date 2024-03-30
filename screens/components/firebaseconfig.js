// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzGom4adGVXad8cnnv6pSQgJ4Q8-y0Y1c",
  authDomain: "oreoinverse-1c6b6.firebaseapp.com",
  projectId: "oreoinverse-1c6b6",
  storageBucket: "oreoinverse-1c6b6.appspot.com",
  messagingSenderId: "807421362104",
  appId: "1:807421362104:web:191f1922f984ca040b194d",
  measurementId: "G-XWTKQ3BRKT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const firebase_auth = getAuth(app);

// export default db;

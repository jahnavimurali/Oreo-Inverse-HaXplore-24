// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;

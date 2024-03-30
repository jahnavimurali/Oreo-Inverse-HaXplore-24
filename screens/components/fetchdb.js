import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseconfig"; // Adjust the path as necessary

const fetchTemples = async () => {
  const querySnapshot = await getDocs(collection(db, "Temples"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};

// Call fetchTemples inside useEffect in your App component or wherever appropriate
useEffect(() => {
  fetchTemples().catch(console.error);
}, []);

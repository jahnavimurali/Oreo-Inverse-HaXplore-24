import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./firebaseconfig";

const fetchTemples = async () => {
  const querySnapshot = await getDocs(collection(db, "Temples"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};

useEffect(() => {
  fetchTemples().catch(console.error);
}, []);

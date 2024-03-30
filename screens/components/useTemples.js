import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import db from "./firebaseconfig";

const useTemples = () => {
  const [temples, setTemples] = useState([]);

  useEffect(() => {
    const fetchTemples = async () => {
      const querySnapshot = await getDocs(collection(db, "Temples"));
      const templesArray = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const storage = getStorage();
          const imageRef = ref(storage, data.templeImage);
          const imageUrl = await getDownloadURL(imageRef).catch(() => "");
          return {
            id: doc.id,
            ...data,
            templeImage: imageUrl, // Replace with HTTPS URL
          };
        })
      );
      setTemples(templesArray);
    };

    fetchTemples().catch(console.error);
  }, []);

  return temples;
};

export default useTemples;

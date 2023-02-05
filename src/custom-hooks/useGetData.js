import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase.config";

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const getData = async () => {
      //firebase firestore realtime data update..........
      await onSnapshot(collectionRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      });
    };
    getData();
  });

  return { data, isLoading };
};

export default useGetData;

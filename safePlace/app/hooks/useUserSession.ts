import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../../firebaseConfig/firebaseConfig";
import { useAppDispatch } from "../redux/hooks";
import { setAccountType, setUserID } from "../redux/accountSlice";
import { doc, getDoc } from "firebase/firestore";

export const useUserSession = () => {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const getAccountType = async (user: User) => {
    const userDoc = await getDoc(doc(FIREBASE_DB, "Users", user.uid));
    const shelterDoc = await getDoc(doc(FIREBASE_DB, "Shelters", user.uid));

    const accountType = userDoc.exists()
      ? "User"
      : shelterDoc.exists()
      ? "Shelter"
      : "NoData";

    return accountType;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      const userID = user ? user.uid : "";
      dispatch(setUserID(userID));
      if (user) {
        const accountType = await getAccountType(user);
        dispatch(setAccountType(accountType));
      }
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

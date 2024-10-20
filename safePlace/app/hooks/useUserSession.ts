import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig/firebaseConfig";
import { useAppDispatch } from "../redux/hooks";
import { setUserID } from "../redux/profileSlice";

export const useUserSession = () => {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      const userID = user ? user.uid : "";
      const authenticated = user ? true : false;
      dispatch(setUserID(userID));
      setIsAuthenticated(authenticated);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

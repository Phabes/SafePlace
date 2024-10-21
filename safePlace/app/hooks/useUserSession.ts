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
      user ? dispatch(setUserID(user.uid)) : dispatch(setUserID(""));
      user ? setIsAuthenticated(true) : setIsAuthenticated(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};

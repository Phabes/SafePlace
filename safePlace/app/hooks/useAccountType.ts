import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { AccountTypes } from "../types";
import { selectUserID } from "../redux/accountSlice";
import { getShelterData, getUserData } from "../services";

export const useAccountType = () => {
  const userID = useAppSelector(selectUserID);
  const [type, setType] = useState<AccountTypes>("User");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!userID) {
      return;
    }
    setLoading(true);
    setError(false);

    (async () => {
      const userDoc = await getUserData(userID);
      const shelterDoc = await getShelterData(userID);

      if (!userDoc.exists() && !shelterDoc.exists()) {
        setError(true);
      } else {
        const accountType = userDoc.exists() ? "User" : "Shelter";
        setType(accountType);
      }
      setLoading(false);
    })();
  }, [userID]);

  return { type, loading, error };
};

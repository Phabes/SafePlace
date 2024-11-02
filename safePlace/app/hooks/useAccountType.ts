import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectUserID } from "../redux/accountSlice";
import { getShelterData, getUserData } from "../services";
import { setActiveTab } from "../redux/appNavigationSlice";
import { getInitialTab } from "../utils";
import { AccountType } from "../types";

export const useAccountType = () => {
  const dispatch = useAppDispatch();
  const userID = useAppSelector(selectUserID);
  const [type, setType] = useState<AccountType>("User");
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
        const initialTab = getInitialTab(accountType);
        dispatch(setActiveTab(initialTab));
        setType(accountType);
      }
      setLoading(false);
    })();
  }, [userID]);

  return { type, loading, error };
};

import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import { AccountTypes } from "../types";
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig/firebaseConfig";
import { selectUserID } from "../redux/accountSlice";

export const useAccountType = () => {
  const userID = useAppSelector(selectUserID);
  const [type, setType] = useState<AccountTypes | "NoData" | undefined>();

  useEffect(() => {
    if (!userID) {
      return;
    }

    (async () => {
      const userDoc = await getDoc(doc(FIREBASE_DB, "Users", userID));
      const shelterDoc = await getDoc(doc(FIREBASE_DB, "Shelters", userID));

      const accountType = userDoc.exists()
        ? "User"
        : shelterDoc.exists()
        ? "Shelter"
        : "NoData";

      setType(accountType);
    })();
  }, [userID]);

  return type;
};

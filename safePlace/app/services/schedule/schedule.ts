import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { setPetitionStatus } from "../petitions";

export const savePickUp = async (petitionID: string, pickUpDate: Date) => {
  await setPetitionStatus(petitionID, "In-Progress");

  await setDoc(doc(FIREBASE_DB, "Schedule", petitionID), {
    pickUpDate,
    createdAt: new Date(),
  });
};

export const getPickUp = async (petitionID: string) => {
  const scheduleRef = doc(FIREBASE_DB, "Schedule", petitionID);
  const scheduleSnapshot = await getDoc(scheduleRef);

  if (scheduleSnapshot.exists()) {
    return new Date(scheduleSnapshot.get("pickUpDate").seconds * 1000);
  }
  return undefined;
};

import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { PetitionField } from "../../types";

export const savePetition = async (
  fields: Array<PetitionField>,
  userID: string
) => {
  await setDoc(doc(FIREBASE_DB, "Petitions", userID), {
    fields,
    createdAt: new Date(),
  });
};

export const getPetition = async (userID: string) => {
  const petitionRef = doc(FIREBASE_DB, "Petitions", userID);
  const petitionSnapshot = await getDoc(petitionRef);

  if (petitionSnapshot.exists()) {
    return petitionSnapshot.get("fields") as Array<PetitionField>;
  } else {
    return [];
  }
};
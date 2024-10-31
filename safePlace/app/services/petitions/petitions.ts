import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { Field } from "../../types";

export const savePetition = async (data: any, userID: string) => {
  await setDoc(doc(FIREBASE_DB, "Petitions", userID), {
    fields: data,
    createdAt: new Date(),
  });
};

export const getPetition = async (userID: string) => {
  try {
    const petitionRef = doc(FIREBASE_DB, "Petitions", userID);
    const petitionSnapshot = await getDoc(petitionRef);

    if (petitionSnapshot.exists()) {
      return petitionSnapshot.get("fields") as Field[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching petition:", error);
    return [];
  }
};

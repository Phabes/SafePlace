import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";

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
      return petitionSnapshot.get("fields") as Array<any>;
    } else {
      console.log("No petition found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching petition:", error);
    throw error;
  }
};

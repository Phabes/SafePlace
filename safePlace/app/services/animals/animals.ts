import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { Animal } from "../../types";

export const saveAnimal = async (fields: Array<Animal>, userID: string) => {
  await setDoc(doc(FIREBASE_DB, "Animals", userID), {
    fields,
    createdAt: new Date(),
  });
};

export const getShelterAnimals = async (userID: string) => {
  const animalsRef = doc(FIREBASE_DB, "Animals", userID);
  const animalsSnapshot = await getDoc(animalsRef);

  if (animalsSnapshot.exists()) {
    return animalsSnapshot.get("animals") as Array<Animal>;
  } else {
    return [];
  }
};

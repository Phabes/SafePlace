import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
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

export const fillPetition = async (
  animalID: string,
  shelterID: string,
  userID: string,
  answers: Array<{
    text: string;
    answer: string;
  }>
) => {
  const animalRef = doc(FIREBASE_DB, "Animals", animalID);
  const shelterRef = doc(FIREBASE_DB, "Shelters", shelterID);
  const userRef = doc(FIREBASE_DB, "Users", userID);

  await addDoc(collection(FIREBASE_DB, "FilledPetitions"), {
    answers,
    animalID: animalRef,
    shelterID: shelterRef,
    userID: userRef,
    createdAt: new Date(),
  });
};

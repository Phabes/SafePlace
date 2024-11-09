import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { Animal, AnimalDB } from "../../types";

export const saveAnimalDB = async (animal: Animal, shelterID: string) => {
  const shelterRef = doc(FIREBASE_DB, "Shelters", shelterID);

  return await addDoc(collection(FIREBASE_DB, "Animals"), {
    data: animal,
    shelterID: shelterRef,
    createdAt: new Date(),
  });
};

export const editAnimalDB = async (animal: AnimalDB) => {
  const { id, ...animalData } = animal;

  const animalRef = doc(FIREBASE_DB, "Animals", id);

  await updateDoc(animalRef, { data: { ...animalData } });
};

export const getShelterAnimals = async (shelterID: string) => {
  const animalsRef = collection(FIREBASE_DB, "Animals");
  const shelterRef = doc(FIREBASE_DB, "Shelters", shelterID);

  const q = query(animalsRef, where("shelterID", "==", shelterRef));

  const querySnapshot = await getDocs(q);

  const animals: Array<AnimalDB> = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...(doc.data().data as Animal),
      } as AnimalDB)
  );

  return animals;
};

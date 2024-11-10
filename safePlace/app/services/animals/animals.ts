import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import { Animal, AnimalDB } from "../../types";

export const getShelterAnimals = async (shelterID: string) => {
  const animalsRef = collection(FIREBASE_DB, "Animals");
  const shelterRef = doc(FIREBASE_DB, "Shelters", shelterID);

  const q = query(
    animalsRef,
    where("shelterID", "==", shelterRef),
    orderBy("createdAt", "desc")
  );

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

export const deleteAnimalDB = async (animalID: string) => {
  const animalDocRef = doc(FIREBASE_DB, "Animals", animalID);
  await deleteDoc(animalDocRef);
};

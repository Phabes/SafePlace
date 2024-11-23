import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
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
    where("available", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  const animals: Array<AnimalDB> = querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        shelterID: shelterRef.id,
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
    available: true,
  });
};

export const editAnimalDB = async (animal: AnimalDB) => {
  const { id, shelterID, ...animalData } = animal;

  const animalRef = doc(FIREBASE_DB, "Animals", id);

  await updateDoc(animalRef, { data: { ...animalData } });
};

export const deleteAnimalDB = async (animalID: string) => {
  const animalDocRef = doc(FIREBASE_DB, "Animals", animalID);
  await deleteDoc(animalDocRef);
};

export const getSearchAnimals = async () => {
  const animalsRef = collection(FIREBASE_DB, "Animals");

  const q = query(
    animalsRef,
    where("available", "==", true),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);

  const animals: Array<AnimalDB> = querySnapshot.docs.map((doc) => {
    const animalData = doc.data();

    return {
      id: doc.id,
      shelterID: (animalData.shelterID as DocumentReference).id,
      ...(animalData.data as Animal),
    } as AnimalDB;
  });

  return animals;
};

export const addAnimalToFavourites = async (
  userID: string,
  favourite: Array<DocumentReference>,
  animalID: string
) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const animalRef = doc(FIREBASE_DB, "Animals", animalID);

  const updatedFavourites = [...favourite, animalRef];

  await updateDoc(userRef, { favouriteAnimals: updatedFavourites });
  return updatedFavourites;
};

export const deleteAnimalFromFavourites = async (
  userID: string,
  favourite: Array<DocumentReference>,
  animalID: string
) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const animalRef = doc(FIREBASE_DB, "Animals", animalID);

  const updatedFavourites = favourite.filter(
    (animal) => animal.id !== animalRef.id
  );

  await updateDoc(userRef, { favouriteAnimals: updatedFavourites });
  return updatedFavourites;
};

export const getUserFavouriteAnimals = async (userID: string) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    return userSnapshot.get("favouriteAnimals") as Array<DocumentReference>;
  } else {
    return [];
  }
};

export const getUserFilledPetitionAnimals = async (userID: string) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const userPetitionsQuery = query(
    filledPetitionsRef,
    where("userID", "==", userRef)
  );

  const querySnapshot = await getDocs(userPetitionsQuery);

  const filledPetitions = querySnapshot.docs.map((doc) => {
    return (doc.data().animalID as DocumentReference).id;
  });

  console.log(filledPetitions);
  return filledPetitions;
};

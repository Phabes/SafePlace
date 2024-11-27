import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import {
  PetitionField,
  PetitionStatus,
  SignedPetitionsShelterFormat,
  SignedPetitionsUserFormat,
} from "../../types";

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

export const signPetition = async (
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
    status: "Pending",
    createdAt: new Date(),
  });
};

export const getUserNotDeclinedFilledPetitionAnimals = async (
  userID: string
) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const userPetitionsQuery = query(
    filledPetitionsRef,
    where("userID", "==", userRef),
    where("status", "!=", "Declined")
  );

  const querySnapshot = await getDocs(userPetitionsQuery);

  const filledPetitions = querySnapshot.docs.map((doc) => {
    return (doc.data().animalID as DocumentReference).id;
  });

  return filledPetitions;
};

export const getUserFilledPetitions = async (
  userID: string
): Promise<Array<SignedPetitionsUserFormat>> => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const userPetitionsQuery = query(
    filledPetitionsRef,
    where("userID", "==", userRef)
  );

  const querySnapshot = await getDocs(userPetitionsQuery);

  const petitionData = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      filledPetitionID: doc.id,
      animalRef: data.animalID as DocumentReference,
      status: data.status as string,
    };
  });

  const animalPromises = petitionData.map((data) => getDoc(data.animalRef));
  const animalDocs = await Promise.all(animalPromises);

  const result = animalDocs
    .filter((animalDoc) => animalDoc.exists())
    .map((animalDoc, index) => {
      const data = petitionData[index];

      return {
        filledPetitionID: data.filledPetitionID,
        animalsName: animalDoc.data().data.name as string,
        status: data.status as PetitionStatus,
      };
    });

  return result;
};

export const getShelterFilledPetitions = async (
  userID: string
): Promise<Array<SignedPetitionsShelterFormat>> => {
  const shelterRef = doc(FIREBASE_DB, "Shelters", userID);

  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const shelterPetitionsQuery = query(
    filledPetitionsRef,
    where("shelterID", "==", shelterRef)
  );

  const querySnapshot = await getDocs(shelterPetitionsQuery);

  const petitionData = querySnapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      filledPetitionID: doc.id,
      animalRef: data.animalID as DocumentReference,
      userRef: data.userID as DocumentReference,
      status: data.status as string,
    };
  });

  const animalRefs = petitionData.map((data) => data.animalRef);
  const userRefs = petitionData.map((data) => data.userRef);

  const allRefs = [...animalRefs, ...userRefs];
  const allDocs = await Promise.all(allRefs.map((ref) => getDoc(ref)));

  const animalDocs = allDocs.slice(0, animalRefs.length);
  const userDocs = allDocs.slice(animalRefs.length);

  const result = petitionData
    .filter((_, index) => {
      return animalDocs[index].exists() && userDocs[index].exists();
    })
    .map((petition, index) => {
      return {
        filledPetitionID: petition.filledPetitionID,
        animalsName: animalDocs[index].data()!.data.name as string,
        userName: userDocs[index].data()!.name as string,
        status: petition.status as PetitionStatus,
      };
    });

  return result;
};

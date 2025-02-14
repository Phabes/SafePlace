import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig/firebaseConfig";
import {
  PetitionAnswer,
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
  }
  return [];
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

export const getUserValidStatusFilledPetitionAnimals = async (
  userID: string
) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);

  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const userPetitionsQuery = query(
    filledPetitionsRef,
    where("userID", "==", userRef),
    where("status", "not-in", ["Declined", "Closed"])
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
      shelterRef: data.shelterID as DocumentReference,
      status: data.status as string,
    };
  });

  const animalRefs = petitionData.map((data) => data.animalRef);
  const shelterRefs = petitionData.map((data) => data.shelterRef);

  const allRefs = [...animalRefs, ...shelterRefs];
  const allDocs = await Promise.all(allRefs.map((ref) => getDoc(ref)));

  const animalDocs = allDocs.slice(0, animalRefs.length);
  const shelterDocs = allDocs.slice(animalRefs.length);

  const result = petitionData
    .filter((_, index) => {
      return animalDocs[index].exists() && shelterDocs[index].exists();
    })
    .map((petition, index) => {
      return {
        filledPetitionID: petition.filledPetitionID,
        animalName: animalDocs[index].get("data.name") as string,
        shelterName: shelterDocs[index].get("shelterName") as string,
        status: petition.status as PetitionStatus,
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
        animalName: animalDocs[index].get("data.name") as string,
        userName: userDocs[index].get("name") as string,
        status: petition.status as PetitionStatus,
      };
    });

  return result;
};

export const getPetitionAnswers = async (filledPetitionID: string) => {
  const petitionRef = doc(FIREBASE_DB, "FilledPetitions", filledPetitionID);
  const petitionSnapshot = await getDoc(petitionRef);

  if (petitionSnapshot.exists()) {
    return petitionSnapshot.get("answers") as Array<PetitionAnswer>;
  }
  return [];
};

export const setPetitionStatus = async (
  filledPetitionID: string,
  status: PetitionStatus
) => {
  const petitionRef = doc(FIREBASE_DB, "FilledPetitions", filledPetitionID);

  await updateDoc(petitionRef, { status });
};

export const getPetitionCoreData = async (filledPetitionID: string) => {
  const petitionRef = doc(FIREBASE_DB, "FilledPetitions", filledPetitionID);
  const petitionSnapshot = await getDoc(petitionRef);

  if (!petitionSnapshot.exists()) {
    throw new Error("Petition not found");
  }

  const animalID = (petitionSnapshot.get("animalID") as DocumentReference).id;
  const shelterID = (petitionSnapshot.get("shelterID") as DocumentReference).id;
  const userID = (petitionSnapshot.get("userID") as DocumentReference).id;

  const [animalDoc, shelterDoc, userDoc] = await Promise.all([
    getDoc(doc(FIREBASE_DB, "Animals", animalID)),
    getDoc(doc(FIREBASE_DB, "Shelters", shelterID)),
    getDoc(doc(FIREBASE_DB, "Users", userID)),
  ]);

  if (!animalDoc.exists() || !shelterDoc.exists() || !userDoc.exists()) {
    throw new Error("One or more related documents not found");
  }

  return {
    animalName: animalDoc.get("data.name") as string,
    shelterName: shelterDoc.get("shelterName") as string,
    userName: userDoc.get("name") as string,
  };
};

export const getPetitionAnimal = async (petitionID: string) => {
  const petitionRef = doc(FIREBASE_DB, "FilledPetitions", petitionID);

  const petitionSnapshot = await getDoc(petitionRef);

  if (!petitionSnapshot.exists()) {
    throw new Error("No animal found");
  }

  return petitionSnapshot.get("animalID") as DocumentReference;
};

export const getAllPetitionsWithAnimal = async (
  animalRef: DocumentReference
) => {
  const filledPetitionsRef = collection(FIREBASE_DB, "FilledPetitions");

  const animalPetitionsQuery = query(
    filledPetitionsRef,
    where("animalID", "==", animalRef)
  );

  const querySnapshot = await getDocs(animalPetitionsQuery);
  const petitions = querySnapshot.docs.map((doc) => doc.id);

  return petitions;
};

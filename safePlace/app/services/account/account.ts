import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../../../firebaseConfig/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AdditionalUserData, DatabaseShelter, DatabaseUser } from "../../types";
import { EMPTY_USER_DETAILS } from "../../constants/userProfilTypes";

export const createAccount = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
};

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
};

export const logout = async () => {
  await FIREBASE_AUTH.signOut();
};

export const saveUser = async (signUpData: any, userID: string) => {
  const user: DatabaseUser = {
    email: signUpData.email,
    name: signUpData.name,
    surname: signUpData.surname,
    details: EMPTY_USER_DETAILS
  };

  await setDoc(doc(FIREBASE_DB, "Users", userID), {
    ...user,
    favouriteAnimals: [],
    createdAt: new Date(),
  });
};

export const saveShelter = async (signUpData: any, userID: string) => {
  const shelter: DatabaseShelter = {
    email: signUpData.email,
    shelterName: signUpData.shelterName,
  };

  await setDoc(doc(FIREBASE_DB, "Shelters", userID), {
    ...shelter,
    createdAt: new Date(),
  });
};

export const getUserData = async (userID: string) => {
  return await getDoc(doc(FIREBASE_DB, "Users", userID));
};

export const getShelterData = async (userID: string) => {
  return await getDoc(doc(FIREBASE_DB, "Shelters", userID));
};

export const saveUserProfileImage = async(userID:string, imageUri: string, userDetails: AdditionalUserData) =>{
  const userRef = doc(FIREBASE_DB, "Users", userID);
  await updateDoc(userRef, { details: { ...userDetails, profilePhoto:imageUri }});
}

export const saveUserBackgroundImage = async (userID: string, imageUri: string, userDetails: AdditionalUserData) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);
  await updateDoc(userRef, { details: { ...userDetails, backgroundPhoto: imageUri } });
};

export const updateUserDetails = async (userID: string, userDetails:AdditionalUserData) => {
  const userRef = doc(FIREBASE_DB, "Users", userID);
  await updateDoc(userRef, { details: { ...userDetails } });
}
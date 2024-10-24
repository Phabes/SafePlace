import { doc, setDoc } from "firebase/firestore";
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
} from "../../../firebaseConfig/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export type DatabaseUser = {
  email: string;
  name: string;
  surname: string;
};

export type DatabaseShelter = {
  email: string;
  shelterName: string;
};

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
  };

  await setDoc(doc(FIREBASE_DB, "Users", userID), {
    ...user,
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
